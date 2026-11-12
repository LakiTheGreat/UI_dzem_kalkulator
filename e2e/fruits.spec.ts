import { expect, test, type Page } from '@playwright/test';

import {
  SAVE_BUTTON,
  apiDelete,
  apiGet,
  loginAsTestUser,
  uniqueLabel,
} from './helpers';

type Fruit = { id: number; label: string };

const fruitsSection = (page: Page) =>
  page.getByRole('heading', { name: 'Voće', exact: true }).locator('xpath=../..');

const fruitSelect = (page: Page) =>
  fruitsSection(page).getByRole('combobox');

test.beforeEach(async ({ page }) => {
  await loginAsTestUser(page);
  await page.goto('/settings');
});

// Soft deletes every fruit created by these tests (also after a failed run).
test.afterEach(async ({ request }) => {
  const fruits = await apiGet<Fruit[]>(request, '/v2/fruits');
  for (const fruit of fruits.filter((f) => f.label.startsWith('zz_test_'))) {
    await apiDelete(request, `/v2/fruits/${fruit.id}`);
  }
});

test('creates, selects, renames and deletes a fruit', async ({ page }) => {
  const label = uniqueLabel('fruit');
  const renamed = `${label}_x`;
  const section = fruitsSection(page);

  await section.getByRole('button').first().click();
  await page.getByRole('textbox', { name: 'Naziv' }).fill(label);
  await page.getByRole('button', { name: SAVE_BUTTON }).click();
  await expect(page.getByText('Voćka uspešno kreirana')).toBeVisible();

  // Selecting a fruit must stick (regression: the selection used to jump back).
  await fruitSelect(page).click();
  await page.getByRole('option', { name: label }).click();
  await expect(fruitSelect(page)).toHaveText(label);

  await section.getByTestId('EditIcon').click();
  await page.getByRole('textbox', { name: 'Naziv' }).fill(renamed);
  await page.getByRole('textbox', { name: 'Lozinka' }).fill('1234');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();
  await expect(page.getByText('Voćka je uspešno izmenjena')).toBeVisible();
  await expect(fruitSelect(page)).toHaveText(renamed);

  await section.getByTestId('DeleteOutlineIcon').click();
  await page.getByRole('button', { name: 'Da', exact: true }).click();
  await expect(page.getByText('Voćka uspešno obrisana')).toBeVisible();

  const fruits = await apiGet<Fruit[]>(page.request, '/v2/fruits');
  expect(fruits.some((f) => f.label === renamed)).toBe(false);
});

test('shows an error toast when the fruit name is too short', async ({
  page,
}) => {
  await fruitsSection(page).getByRole('button').first().click();
  await page.getByRole('textbox', { name: 'Naziv' }).fill('ab');
  await page.getByRole('button', { name: SAVE_BUTTON }).click();

  await expect(page.getByText('Nešto ne valja')).toBeVisible();
});
