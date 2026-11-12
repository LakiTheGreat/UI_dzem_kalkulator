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

export const SAVE_BUTTON = /Sa.{1,2}uvaj/; // the UI string uses a decomposed "č"

export const uniqueLabel = (name: string) => `zz_test_${Date.now()}_${name}`;

export async function apiGet<T>(request: APIRequestContext, path: string) {
  const res = await request.get(api(path), { headers: apiHeaders });
  if (!res.ok()) throw new Error(`GET ${path} -> ${res.status()}`);
  return (await res.json()) as T;
}

export async function apiPost<T>(
  request: APIRequestContext,
  path: string,
  data: object
) {
  const res = await request.post(api(path), { headers: apiHeaders, data });
  if (!res.ok()) throw new Error(`POST ${path} -> ${res.status()}`);
  return (await res.json()) as T;
}

export async function apiDelete(request: APIRequestContext, path: string) {
  await request.delete(api(path), { headers: apiHeaders });
}
