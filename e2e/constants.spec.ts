import { expect, test, type Page } from '@playwright/test';

import {
  ConstantRow,
  getConstant,
  loginAsTestUser,
  restoreConstant,
} from './helpers';

// Profit margin of the test user (constantApi.ts: userId === 1 ? 4 : 2).
const PROFIT_MARGIN_ID = 4;

let original: ConstantRow;

test.beforeAll(async ({ request }) => {
  original = await getConstant(request, PROFIT_MARGIN_ID);
});

test.beforeEach(async ({ page }) => {
  await loginAsTestUser(page);
  await page.goto('/settings');
});

test.afterEach(async ({ request }) => {
  await restoreConstant(request, original);
});

const profitMarginRow = (page: Page) =>
  page.getByText('Profitna marža:').locator('xpath=../..');

const valueInput = (page: Page) =>
  page.getByRole('textbox', { name: 'Vrednost' });

const openEditDialog = async (page: Page) => {
  await profitMarginRow(page).getByRole('button').click();
  await expect(page.getByText('Izmeni vrednost konstante')).toBeVisible();
};

test('edits a constant and shows the new value', async ({ page, request }) => {
  const newValue = original.value === 37 ? 38 : 37;

  await expect(profitMarginRow(page)).toContainText(original.label);

  await openEditDialog(page);
  await valueInput(page).fill(String(newValue));
  await page.getByRole('button', { name: 'Sačuvaj' }).click();

  await expect(page.getByText('Konstanta je uspešno izmenjena')).toBeVisible();
  await expect(profitMarginRow(page)).toContainText(`${newValue}%`);

  const saved = await getConstant(request, PROFIT_MARGIN_ID);
  expect(saved).toMatchObject({ value: newValue, label: `${newValue}%` });
});

test('rejects value 0 and keeps the old value', async ({ page, request }) => {
  await openEditDialog(page);
  await valueInput(page).fill('0');
  await page.getByRole('button', { name: 'Sačuvaj' }).click();

  await expect(page.getByText('Nešto ne valja')).toBeVisible();

  const saved = await getConstant(request, PROFIT_MARGIN_ID);
  expect(saved.value).toBe(original.value);
});
