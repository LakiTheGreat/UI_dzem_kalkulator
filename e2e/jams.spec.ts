import { expect, test, type Page } from '@playwright/test';

import {
  SAVE_BUTTON,
  api,
  apiDelete,
  apiGet,
  apiHeaders,
  apiPost,
  loginAsTestUser,
  uniqueLabel,
} from './helpers';

type Fruit = { id: number; label: string };
type CupStock = { cupId: number; label: string; numberOf: number };
type FruitStock = { orderTypeId: number; cups: CupStock[] };
type OrderRow = { id: number; orderName: string; cups: { label: string; numberOf: number }[] };
type TransactionRow = { id: number; note: string };

const ORDER_CREATED = /Serija uspe.{1,2}no kreirana/;
const ORDER_UPDATED = /Serija uspe.{1,2}no izmenjena/;
const TX_CREATED = /Transakcija uspe.{1,2}no kreirana/;
const TX_UPDATED = /Transakcija uspe.{1,2}no izmenjena/;
const TX_DELETED = /Transakcija uspe.{1,2}no obrisana/;
const NOT_ENOUGH = /Nema dovoljno tegli na stanju/;

let fruitA: Fruit;
let fruitB: Fruit;
let cups: { id: number; label: string }[];

const stock = async (page: Page, fruitId: number) => {
  const rows = await apiGet<FruitStock[]>(page.request, '/v2/inventory');
  const fruit = rows.find((f) => f.orderTypeId === fruitId);
  return Object.fromEntries(
    cups.map((c) => [
      c.label,
      fruit?.cups.find((x) => x.cupId === c.id)?.numberOf ?? 0,
    ])
  );
};

const seedOrder = (page: Page, fruit: Fruit, numberOf: number[]) =>
  apiPost<{ id: number }>(page.request, '/v2/orders', {
    orderName: uniqueLabel('order'),
    orderTypeId: fruit.id,
    baseFruitIsFree: false,
    otherExpensesMargin: 25,
    cups: cups.map((c, i) => ({
      id: c.id,
      label: c.label,
      numberOf: numberOf[i],
      cost: 10,
      sellingPrice: 100,
      total: numberOf[i] * 10,
    })).filter((c) => c.numberOf > 0),
    fruits: [{ fruitId: fruit.id, grams: '1000', price: '200', total: '200' }],
  });

const seedTransaction = (page: Page, fruit: Fruit, quantity: number[]) =>
  apiPost<{ id: number }>(page.request, '/v2/transactions', {
    orderTypeId: fruit.id,
    status: 'SOLD',
    note: uniqueLabel('tx'),
    cupData: cups
      .map((c, i) => ({ cupId: c.id, quantity: quantity[i] }))
      .filter((c) => c.quantity > 0),
  });

// RHFSelectInput does not label its combobox, so the select is found by its visible label.
const pick = async (page: Page, label: RegExp, option: string) => {
  await page
    .locator('.MuiFormControl-root', { hasText: label })
    .getByRole('combobox')
    .first()
    .click();
  await page.getByRole('option', { name: option, exact: true }).click();
};

const FRUIT_SELECT = /Vo.{1,2}e/;
const JAM_TYPE_SELECT = /Vrsta d.{1,2}ema/;

const qtyInputs = (page: Page) =>
  page.getByRole('spinbutton', { name: 'Broj teglica' });

test.beforeEach(async ({ page }) => {
  await loginAsTestUser(page);
  const a = await apiPost<Fruit>(page.request, '/v2/fruits', {
    label: uniqueLabel('fruitA'),
  });
  const b = await apiPost<Fruit>(page.request, '/v2/fruits', {
    label: uniqueLabel('fruitB'),
  });
  fruitA = a;
  fruitB = b;
  cups = await apiGet<{ id: number; label: string }[]>(page.request, '/v2/cups');
});

// Transactions go first, otherwise deleting an order would push the stock below 0.
test.afterEach(async ({ request }) => {
  for (const fruit of [fruitA, fruitB]) {
    const txs = await apiGet<TransactionRow[]>(
      request,
      `/v2/transactions?orderTypeId=${fruit.id}`
    );
    for (const tx of txs) await apiDelete(request, `/v2/transactions/${tx.id}`);

    const { orders } = await apiGet<{ orders: OrderRow[] }>(
      request,
      `/v2/orders?orderTypeId=${fruit.id}`
    );
    for (const order of orders) await apiDelete(request, `/v2/orders/${order.id}`);

    await request.delete(api(`/v2/fruits/${fruit.id}`), { headers: apiHeaders });
  }
});

test('creates an order and sends only cups with a quantity', async ({ page }) => {
  const name = uniqueLabel('order');
  await page.goto('/jams/orders/new');

  await page.getByRole('textbox', { name: 'Napomena' }).fill(name);
  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await pick(page, FRUIT_SELECT, fruitA.label);
  await page.getByRole('spinbutton', { name: /Grama.{1,2}a/ }).fill('1000');
  await qtyInputs(page).first().fill('5');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(ORDER_CREATED)).toBeVisible();

  const { orders } = await apiGet<{ orders: OrderRow[] }>(
    page.request,
    `/v2/orders?orderTypeId=${fruitA.id}`
  );
  expect(orders).toHaveLength(1);
  expect(orders[0].cups.filter((c) => c.numberOf > 0)).toEqual([
    expect.objectContaining({ label: cups[0].label, numberOf: 5 }),
  ]);
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 5, [cups[1].label]: 0 });
});

test('editing an order changes the stock by the difference', async ({ page }) => {
  const order = await seedOrder(page, fruitA, [5, 0]);
  await page.goto(`/jams/orders/${order.id}`);

  await qtyInputs(page).first().fill('8');
  await qtyInputs(page).nth(1).fill('2');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(ORDER_UPDATED)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 8, [cups[1].label]: 2 });
});

test('creates a transaction and decreases the stock', async ({ page }) => {
  await seedOrder(page, fruitA, [5, 5]);
  await page.goto('/jams/transactions/new');

  await pick(page, FRUIT_SELECT, fruitA.label);
  await qtyInputs(page).first().fill('2');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(TX_CREATED)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 3, [cups[1].label]: 5 });
});

test('rejects a transaction larger than the stock', async ({ page }) => {
  await seedOrder(page, fruitA, [1, 0]);
  await page.goto('/jams/transactions/new');

  await pick(page, FRUIT_SELECT, fruitA.label);
  await qtyInputs(page).first().fill('2');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(NOT_ENOUGH)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 1 });
});

test('changing the fruit of a transaction returns the stock to the old fruit', async ({
  page,
}) => {
  await seedOrder(page, fruitA, [5, 0]);
  await seedOrder(page, fruitB, [5, 0]);
  const tx = await seedTransaction(page, fruitA, [2, 0]);
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 3 });

  await page.goto(`/jams/transactions/${tx.id}`);
  await pick(page, FRUIT_SELECT, fruitB.label);
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(TX_UPDATED)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 5 });
  expect(await stock(page, fruitB.id)).toMatchObject({ [cups[0].label]: 3 });
});

test('deleting a transaction returns the stock', async ({ page }) => {
  await seedOrder(page, fruitA, [5, 0]);
  const tx = await seedTransaction(page, fruitA, [2, 0]);
  const note = (await apiGet<{ note: string }>(page.request, `/v2/transactions/${tx.id}`)).note;
  await page.goto('/jams/transactions');

  await page
    .locator('.MuiCard-root', { hasText: note })
    .getByTestId('DeleteOutlineIcon')
    .click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();

  await expect(page.getByText(TX_DELETED)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 5 });
});

test('inventory page shows the stock per fruit and in total', async ({ page }) => {
  await seedOrder(page, fruitA, [4, 2]);
  const before = await apiGet<{ label: string; numberOf: number }[]>(
    page.request,
    '/v2/inventory/overview'
  );
  await page.goto('/jams/inventory');

  const row = page
    .getByText(fruitA.label, { exact: true })
    .locator('xpath=..');
  await expect(row).toContainText(`${cups[0].label}:4`);
  await expect(row).toContainText(`${cups[1].label}:2`);
  await expect(page.getByText('Ukupno stanje:')).toBeVisible();
  expect(before.map((c) => c.label)).toEqual(cups.map((c) => c.label));
});

test('manual inventory correction adds jars and never goes below zero', async ({
  page,
}) => {
  const openConfig = () =>
    page
      .getByText('Ukupno stanje:')
      .locator('xpath=..')
      .getByTestId('SettingsIcon')
      .click();

  await seedOrder(page, fruitA, [4, 0]);
  await page.goto('/jams/inventory');
  await openConfig();

  const dialog = page.getByRole('dialog');
  const submit = async (amount: string) => {
    await dialog.getByRole('spinbutton', { name: 'Broj teglica' }).fill(amount);
    await dialog.locator('input[type="password"]').fill('12397');
    await dialog.getByRole('button', { name: SAVE_BUTTON }).click();
  };

  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await submit('3');
  await expect(page.getByText(/Uspe.{1,2}no izmenjeno stanje inventara/)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 7 });
  await expect(dialog).toBeHidden();

  await openConfig();
  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await submit('-100');
  await expect(page.getByText(NOT_ENOUGH)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 7 });
});

test('edits the quantity of a transaction', async ({ page }) => {
  await seedOrder(page, fruitA, [5, 5]);
  const tx = await seedTransaction(page, fruitA, [2, 0]);
  await page.goto(`/jams/transactions/${tx.id}`);

  await qtyInputs(page).first().fill('4');
  await qtyInputs(page).nth(1).fill('1');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(TX_UPDATED)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({
    [cups[0].label]: 1,
    [cups[1].label]: 4,
  });
});

test('deletes an order from the list', async ({ page }) => {
  const order = await seedOrder(page, fruitA, [3, 0]);
  const { orderName } = await apiGet<{ orderName: string }>(
    page.request,
    `/v2/orders/${order.id}`
  );
  await page.goto('/jams/orders');

  await page
    .locator('.MuiCard-root', { hasText: orderName })
    .getByTestId('DeleteOutlineIcon')
    .click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();

  await expect(page.getByText(/Porud.{1,2}bina uspe.{1,2}no obrisana/)).toBeVisible();
  expect(await stock(page, fruitA.id)).toMatchObject({ [cups[0].label]: 0 });
});

test('saves an order with an empty fruit price as 0', async ({ page }) => {
  await page.goto('/jams/orders/new');

  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await pick(page, FRUIT_SELECT, fruitA.label);
  await page.getByRole('spinbutton', { name: /Grama.{1,2}a/ }).fill('500');
  await qtyInputs(page).first().fill('2');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(ORDER_CREATED)).toBeVisible();
  const { orders } = await apiGet<{ orders: { fruits: { price: number }[] }[] }>(
    page.request,
    `/v2/orders?orderTypeId=${fruitA.id}`
  );
  expect(orders[0].fruits[0].price).toBe(0);
});

test('order cannot be saved until a fruit is selected', async ({ page }) => {
  await page.goto('/jams/orders/new');

  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await page.getByRole('spinbutton', { name: /Grama.{1,2}a/ }).fill('500');
  await qtyInputs(page).first().fill('2');
  await expect(page.getByRole('button', { name: SAVE_BUTTON })).toBeDisabled();

  await pick(page, FRUIT_SELECT, fruitA.label);
  await expect(page.getByRole('button', { name: SAVE_BUTTON })).toBeEnabled();
});

test('orders list filters by jam type', async ({ page }) => {
  const a = await seedOrder(page, fruitA, [3, 0]);
  const b = await seedOrder(page, fruitB, [3, 0]);
  const nameOf = async (id: number) =>
    (await apiGet<{ orderName: string }>(page.request, `/v2/orders/${id}`)).orderName;
  const [nameA, nameB] = [await nameOf(a.id), await nameOf(b.id)];
  const card = (name: string) => page.locator('.MuiCard-root', { hasText: name });
  await page.goto('/jams/orders');

  await expect(card(nameA)).toBeVisible();
  await expect(card(nameB)).toBeVisible();

  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await expect(card(nameA)).toBeVisible();
  await expect(card(nameB)).toHaveCount(0);
});

test('transactions list filters by jam type', async ({ page }) => {
  await seedOrder(page, fruitA, [5, 0]);
  await seedOrder(page, fruitB, [5, 0]);
  const a = await seedTransaction(page, fruitA, [1, 0]);
  const b = await seedTransaction(page, fruitB, [1, 0]);
  const noteOf = async (id: number) =>
    (await apiGet<{ note: string }>(page.request, `/v2/transactions/${id}`)).note;
  const [noteA, noteB] = [await noteOf(a.id), await noteOf(b.id)];
  const card = (note: string) => page.locator('.MuiCard-root', { hasText: note });
  await page.goto('/jams/transactions');

  await expect(card(noteA)).toBeVisible();
  await expect(card(noteB)).toBeVisible();

  await pick(page, JAM_TYPE_SELECT, fruitA.label);
  await expect(card(noteA)).toBeVisible();
  await expect(card(noteB)).toHaveCount(0);
});
