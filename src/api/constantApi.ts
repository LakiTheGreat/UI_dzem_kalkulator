import { api } from '.';
import { Constant } from '../types/constants';

const constantApiUrl = '/constants';

const constantApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getOtherExpansesMargin: build.query<Constant, number>({
      query: (userId) => ({
        url: `${constantApiUrl}/${userId === 1 ? 3 : 1}`,
      }),
      providesTags: ['Constant'],
    }),
    getProfitMargin: build.query<Constant, number>({
      query: (userId) => ({
        url: `${constantApiUrl}/${userId === 1 ? 4 : 2} `,
      }),
      providesTags: ['Constant'],
    }),
    getTomatoPrice: build.query<Constant, number>({
      query: (userId) => ({
        url: `${constantApiUrl}/${userId === 1 ? 6 : 5} `,
      }),
      providesTags: ['Constant'],
    }),

    patchConstant: build.mutation<
      Constant,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: `${constantApiUrl}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Constant'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTomatoPriceQuery,
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
  usePatchConstantMutation,
} = constantApiEndpoints;
