import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
import { Cup } from '../types/cups';

const cupCostsUrl = '/cupCosts';

const cupCostsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCupCosts: build.query<Cup[], void>({
      query: () => ({
        url: withApiVersion(API_VERSIONS.cupCosts.list, cupCostsUrl),
      }),
      providesTags: ['Cups'],
    }),
    putCupCost: build.mutation<
      Cup,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: withApiVersion(API_VERSIONS.cupCosts.put, `${cupCostsUrl}/${id}`),
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
