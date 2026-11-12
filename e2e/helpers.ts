import type { APIRequestContext, Page } from '@playwright/test';

import { API_URL, TEST_USER_ID } from '../playwright.config';

export const apiHeaders = { 'x-user-id': String(TEST_USER_ID) };

export const api = (path: string) => `${API_URL}${path}`;

// Skips the login screen: redux-persist keeps only the auth slice in localStorage.
export async function loginAsTestUser(page: Page) {
  await page.addInitScript((userId) => {
    window.localStorage.setItem(
      'persist:root',
      JSON.stringify({
        auth: JSON.stringify({ userId }),
        _persist: JSON.stringify({ version: 1, rehydrated: true }),
      })
    );
  }, TEST_USER_ID);
}

export type ConstantRow = { id: number; value: number; label: string };

export async function getConstant(request: APIRequestContext, id: number) {
  const res = await request.get(api(`/v2/constants/${id}`), {
    headers: apiHeaders,
  });
  if (!res.ok()) {
    throw new Error(`Test user constant ${id} not found (${res.status()})`);
  }
  return (await res.json()) as ConstantRow;
}

export async function restoreConstant(
  request: APIRequestContext,
  original: ConstantRow
) {
  await request.patch(api(`/v2/constants/${original.id}`), {
    headers: apiHeaders,
    data: { value: original.value, label: original.label },
  });
}
