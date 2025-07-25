import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://be-dzem-kalkulator.onrender.com/api',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.userId;

    if (userId) {
      headers.set('x-user-id', userId.toString());
    }

    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'realApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Fruit', 'Cups', 'Constant', 'Order'],
  endpoints: (build) => ({}),
});
