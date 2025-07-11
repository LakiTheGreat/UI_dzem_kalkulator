import { api } from '.';
import { Constant } from '../types/constants';

const constantApiUrl = '/constants';

const constantApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getOtherExpansesMargin: build.query<Constant, void>({
      query: () => ({
        url: `${constantApiUrl}/1`,
      }),
      providesTags: ['Constant'],
    }),
    getProfitMargin: build.query<Constant, void>({
      query: () => ({
        url: `${constantApiUrl}/2`,
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
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
  usePatchConstantMutation,
} = constantApiEndpoints;
