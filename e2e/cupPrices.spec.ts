import { expect, test, type Page } from '@playwright/test';

import {
  SAVE_BUTTON,
  api,
  apiGet,
  apiHeaders,
  loginAsTestUser,
} from './helpers';

type CupPrice = { id: number; label: string; value: number };

const resources = [
  {
    name: 'cupCosts',
    heading: 'Nabavna cena teglica',
    dialogTitle: 'Izmeni nabavnu cenu',
    input: 'Nabavna cena',
  },
  {
    name: 'cupValues',
    heading: 'Prodajna cena džema po teglici',
    dialogTitle: 'Izmeni prodajnu cenu',
    input: 'Prodajna cena',
  },
] as const;

for (const r of resources) {
  test.describe(r.name, () => {
    let original: CupPrice;

    test.beforeAll(async ({ request }) => {
      // The settings screen preselects the first item of the list.
      original = (await apiGet<CupPrice[]>(request, `/v2/${r.name}`))[0];
    });

    test.beforeEach(async ({ page }) => {
      await loginAsTestUser(page);
      await page.goto('/settings');
    });

    test.afterEach(async ({ request }) => {
      await request.put(api(`/v2/${r.name}/${original.id}`), {
        headers: apiHeaders,
        data: { label: original.label, value: original.value },
      });
    });

    const section = (page: Page) =>
      page.getByRole('heading', { name: r.heading }).locator('xpath=../..');

    test('edits the price', async ({ page, request }) => {
      const newValue = original.value + 1;

      await section(page).getByTestId('EditIcon').click();
      await expect(page.getByText(r.dialogTitle)).toBeVisible();
      await page.getByRole('spinbutton', { name: r.input }).fill(String(newValue));
      await page.getByRole('button', { name: SAVE_BUTTON }).click();

      await expect(page.getByText('Cena je uspešno izmenjena')).toBeVisible();

      const list = await apiGet<CupPrice[]>(request, `/v2/${r.name}`);
      expect(list.find((c) => c.id === original.id)?.value).toBe(newValue);
    });

    test('rejects price 0 and keeps the old value', async ({
      page,
      request,
    }) => {
      await section(page).getByTestId('EditIcon').click();
      await page.getByRole('spinbutton', { name: r.input }).fill('0');
      await page.getByRole('button', { name: SAVE_BUTTON }).click();

      await expect(page.getByText('Nešto ne valja')).toBeVisible();

      const list = await apiGet<CupPrice[]>(request, `/v2/${r.name}`);
      expect(list.find((c) => c.id === original.id)?.value).toBe(
        original.value
      );
    });
  });
}
