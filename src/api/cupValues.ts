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
    putCupValue: build.mutation<
      Cup,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: `${cupValuesUrl}/${id}`,
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
