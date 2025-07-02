import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

import { MenuItemType } from '../components/RHFSelectInput';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://be-dzem-kalkulator.onrender.com/api',
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

export const realApi = createApi({
  reducerPath: 'realApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Test'],
  endpoints: (build) => ({
    getTest: build.query<MenuItemType[], void>({
      query: () => ({
        url: `/order-types`,
      }),
      providesTags: ['Test'],
    }),
  }),
});

export const { useGetTestQuery } = realApi;
