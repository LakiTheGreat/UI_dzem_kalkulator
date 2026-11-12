import { expect, test, type Page } from '@playwright/test';

import {
  SAVE_BUTTON,
  api,
  apiGet,
  apiHeaders,
  apiPost,
  loginAsTestUser,
  uniqueLabel,
} from './helpers';

type Bouquet = {
  id: number;
  note: string;
  status: string;
  totalExpense: number;
  income: number;
  profit: number;
  profitMargin: number;
};

const EXPENSE_INPUT = /Ukupni tro.{1,2}kovi/;
const CREATED_TOAST = /Transakcija uspe.{1,2}no kreirana/;
const UPDATED_TOAST = /Transakcija uspe.{1,2}no izmenjena/;
const DELETED_TOAST = /Transakcija uspe.{1,2}no obrisana/;

const listBouquets = (page: Page) =>
  apiGet<Bouquet[]>(page.request, '/v2/bouquets');

const seed = (page: Page, overrides: Partial<Bouquet> = {}) =>
  apiPost<Bouquet>(page.request, '/v2/bouquets', {
    note: uniqueLabel('bouquet'),
    status: 'SOLD',
    totalExpense: 2000,
    income: 3500,
    profit: 1500,
    profitMargin: 75,
    ...overrides,
  });

const card = (page: Page, note: string) =>
  page.locator('.MuiCard-root', { hasText: note });

test.beforeEach(async ({ page }) => {
  await loginAsTestUser(page);
});

// Soft deletes every bouquet transaction created by these tests (also after a failed run).
test.afterEach(async ({ request }) => {
  const rows = await apiGet<Bouquet[]>(request, '/v2/bouquets');
  for (const row of rows.filter((b) => b.note.startsWith('zz_test_'))) {
    await request.put(api(`/v2/bouquets/${row.id}`), {
      headers: apiHeaders,
      data: { ...row, isDeleted: true },
    });
  }
});

test('creates a transaction and calculates profit and margin', async ({
  page,
}) => {
  const note = uniqueLabel('bouquet');
  await page.goto('/bouquets/new');

  await page.getByRole('textbox', { name: 'Napomena' }).fill(note);
  await page.getByRole('spinbutton', { name: EXPENSE_INPUT }).fill('2000');
  await page.getByRole('spinbutton', { name: 'Cena buketa' }).fill('3500');
  await expect(page.getByText('75%')).toBeVisible();
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(CREATED_TOAST)).toBeVisible();

  const created = (await listBouquets(page)).find((b) => b.note === note);
  expect(created).toMatchObject({
    status: 'SOLD',
    totalExpense: 2000,
    income: 3500,
    profit: 1500,
    profitMargin: 75,
  });
});

test('saves a gift with price 0 as a loss', async ({ page }) => {
  const note = uniqueLabel('gift');
  await page.goto('/bouquets/new');

  await page.getByRole('textbox', { name: 'Napomena' }).fill(note);
  await page.getByRole('spinbutton', { name: EXPENSE_INPUT }).fill('1000');
  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Poklon' }).click();
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(CREATED_TOAST)).toBeVisible();

  const created = (await listBouquets(page)).find((b) => b.note === note);
  expect(created).toMatchObject({
    status: 'GIVEN_AWAY',
    income: 0,
    profit: -1000,
    profitMargin: -100,
  });
});

test('disables saving while expenses are 0', async ({ page }) => {
  await page.goto('/bouquets/new');
  await expect(page.getByRole('button', { name: SAVE_BUTTON })).toBeDisabled();
});

test('edits a transaction', async ({ page }) => {
  const row = await seed(page);
  await page.goto(`/bouquets/${row.id}`);

  await page.getByRole('spinbutton', { name: 'Cena buketa' }).fill('4000');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText(UPDATED_TOAST)).toBeVisible();

  const updated = (await listBouquets(page)).find((b) => b.id === row.id);
  expect(updated).toMatchObject({ income: 4000, profit: 2000, profitMargin: 100 });
});

test('deletes a transaction from the list', async ({ page }) => {
  const row = await seed(page);
  await page.goto('/bouquets');

  await card(page, row.note).getByTestId('DeleteOutlineIcon').click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();
  await expect(page.getByText(DELETED_TOAST)).toBeVisible();

  expect((await listBouquets(page)).some((b) => b.id === row.id)).toBe(false);
  await expect(card(page, row.note)).toHaveCount(0);
});

test('filters the list by transaction type', async ({ page }) => {
  const sold = await seed(page);
  const gift = await seed(page, { status: 'GIVEN_AWAY', income: 0, profit: -2000, profitMargin: -100 });
  await page.goto('/bouquets');

  await expect(card(page, sold.note)).toBeVisible();
  await expect(card(page, gift.note)).toBeVisible();

  await page.getByRole('combobox').click();
  await page.getByRole('option', { name: 'Poklon' }).click();

  await expect(card(page, gift.note)).toBeVisible();
  await expect(card(page, sold.note)).toHaveCount(0);
});
