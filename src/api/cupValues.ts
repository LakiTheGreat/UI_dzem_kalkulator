import { api } from '.';
import { Cup } from '../types/cups';

const cupValuesUrl = '/cupValues';

const cupValuesApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCupValues: build.query<Cup[], void>({
      query: () => ({
        url: `${cupValuesUrl}`,
      }),
      providesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupValuesQuery } = cupValuesApiEndpoints;
