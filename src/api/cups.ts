import { api } from '.';
import { CupWithPriceData } from '../types/cups';

const cupsUrl = '/cups';

const cupsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCups: build.query<CupWithPriceData[], void>({
      query: () => ({
        url: `${cupsUrl}`,
      }),
      providesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupsQuery } = cupsApiEndpoints;
