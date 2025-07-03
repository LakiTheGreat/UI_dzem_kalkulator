import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://be-dzem-kalkulator.onrender.com/api',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const api = createApi({
  reducerPath: 'realApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Test'],
  endpoints: (build) => ({}),
});
