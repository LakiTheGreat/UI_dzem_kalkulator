import { api } from '.';
import { Constant } from '../types/constants';

const constantApiUrl = '/constants';

const constantApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getOtherExpansesMargin: build.query<Constant, void>({
      query: () => ({
        url: `${constantApiUrl}/1`,
      }),
      providesTags: ['Cups'],
    }),
    getProfitMargin: build.query<Constant, void>({
      query: () => ({
        url: `${constantApiUrl}/2`,
      }),
      providesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetOtherExpansesMarginQuery, useGetProfitMarginQuery } =
  constantApiEndpoints;
