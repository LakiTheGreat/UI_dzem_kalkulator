import {
  expect,
  test,
  type APIRequestContext,
  type Page,
} from '@playwright/test';

import {
  SAVE_BUTTON,
  apiDelete,
  apiGet,
  apiPost,
  loginAsTestUser,
  uniqueLabel,
} from './helpers';

type TomatoCup = { id: number };
type TomatoOrder = { id: number; numOfCups: number };
type TomatoTransaction = { id: number; note: string; numOfCups: number };

// Unusual cup counts so the rows created here are easy to recognise.
const ORDER_CUPS = 13;
const SEEDED_ORDER_CUPS = 17;
const STOCK_CUPS = 40;

const createdOrderIds: number[] = [];
const createdTransactionIds: number[] = [];

const firstCupId = async (request: APIRequestContext) =>
  (await apiGet<TomatoCup[]>(request, '/v2/tomatoes/cups'))[0].id;

const seedOrder = async (request: APIRequestContext, numOfCups: number) => {
  const order = await apiPost<TomatoOrder>(request, '/v2/tomatoes', {
    cupTypeId: await firstCupId(request),
    totalExpenses: 10,
    numOfCups,
  });
  createdOrderIds.push(order.id);
  return order;
};

// Nearest ancestor of the text that also holds a delete button, i.e. its card.
const cardWith = (page: Page, text: string) =>
  page
    .getByText(text, { exact: true })
    .locator("xpath=ancestor::*[.//*[@data-testid='DeleteOutlineIcon']][1]");

const addButton = (page: Page) => page.getByTestId('AddCircleOutlineIcon');

test.beforeEach(async ({ page }) => {
  await loginAsTestUser(page);
});

test.afterEach(async ({ request }) => {
  // Transactions first: they consume the stock of the orders.
  const transactions = await apiGet<TomatoTransaction[]>(
    request,
    '/v2/tomatoes/transactions'
  );
  for (const t of transactions.filter((t) => t.note.startsWith('zz_test_'))) {
    createdTransactionIds.push(t.id);
  }
  const orders = await apiGet<TomatoOrder[]>(request, '/v2/tomatoes');
  for (const o of orders.filter((o) => o.numOfCups === ORDER_CUPS)) {
    createdOrderIds.push(o.id);
  }

  for (const id of createdTransactionIds.splice(0)) {
    await apiDelete(request, `/v2/tomatoes/transactions/${id}`);
  }
  for (const id of createdOrderIds.splice(0)) {
    await apiDelete(request, `/v2/tomatoes/${id}`);
  }
});

test('creates a production order', async ({ page, request }) => {
  await page.goto('/tomatoes/orders');

  await addButton(page).click();
  await page.getByRole('spinbutton', { name: 'Broj teglica' }).fill(String(ORDER_CUPS));
  await page.getByRole('spinbutton', { name: 'Troškovi po teglici' }).fill('10');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText('Serija uspešno kreirana')).toBeVisible();

  const orders = await apiGet<TomatoOrder[]>(request, '/v2/tomatoes');
  expect(orders.some((o) => o.numOfCups === ORDER_CUPS)).toBe(true);
});

test('deletes a production order', async ({ page, request }) => {
  const order = await seedOrder(request, SEEDED_ORDER_CUPS);
  await page.goto('/tomatoes/orders');

  const card = cardWith(page, String(SEEDED_ORDER_CUPS));
  await card.getByTestId('DeleteOutlineIcon').click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();

  await expect(page.getByText('Serija uspešno obrisana')).toBeVisible();

  await expect
    .poll(async () =>
      (await apiGet<TomatoOrder[]>(request, '/v2/tomatoes')).some(
        (o) => o.id === order.id
      )
    )
    .toBe(false);
});

test('creates and deletes a transaction', async ({ page, request }) => {
  await seedOrder(request, STOCK_CUPS);
  const note = uniqueLabel('transaction');

  await page.goto('/tomatoes/transactions');
  await addButton(page).click();
  await page.getByRole('textbox', { name: 'Napomena' }).fill(note);
  await page.getByRole('spinbutton', { name: 'Broj teglica' }).fill('3');
  await page
    .getByRole('spinbutton', { name: 'Prodajna cena po teglici' })
    .fill('100');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText('Serija uspešno kreirana')).toBeVisible();

  const transactions = await apiGet<TomatoTransaction[]>(
    request,
    '/v2/tomatoes/transactions'
  );
  const created = transactions.find((t) => t.note === note);
  expect(created).toBeTruthy();
  createdTransactionIds.push(created!.id);

  const card = cardWith(page, note);
  await card.getByTestId('DeleteOutlineIcon').click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();

  await expect
    .poll(async () =>
      (
        await apiGet<TomatoTransaction[]>(request, '/v2/tomatoes/transactions')
      ).some((t) => t.id === created!.id)
    )
    .toBe(false);
});
