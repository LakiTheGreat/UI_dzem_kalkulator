import { api } from '.';
import { Cup } from '../types/cups';

const cupCostsUrl = '/cupCosts';

const cupCostsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCupCosts: build.query<Cup[], void>({
      query: () => ({
        url: `${cupCostsUrl}`,
      }),
      providesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupCostsQuery } = cupCostsApiEndpoints;
