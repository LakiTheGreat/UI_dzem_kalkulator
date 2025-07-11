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
    putCupCost: build.mutation<
      Cup,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: `${cupCostsUrl}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupCostsQuery, usePutCupCostMutation } =
  cupCostsApiEndpoints;
