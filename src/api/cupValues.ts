import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
import { Cup } from '../types/cups';

const cupValuesUrl = '/cupValues';

const cupValuesApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCupValues: build.query<Cup[], void>({
      query: () => ({
        url: withApiVersion(API_VERSIONS.cupValues.list, cupValuesUrl),
      }),
      providesTags: ['Cups'],
    }),
    putCupValue: build.mutation<
      Cup,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: withApiVersion(
          API_VERSIONS.cupValues.put,
          `${cupValuesUrl}/${id}`
        ),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupValuesQuery, usePutCupValueMutation } =
  cupValuesApiEndpoints;
