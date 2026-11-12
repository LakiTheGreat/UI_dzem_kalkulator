import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
import { Constant } from '../types/constants';

const constantApiUrl = '/constants';

const constantApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getOtherExpansesMargin: build.query<Constant, number>({
      query: (userId) => ({
        url: withApiVersion(
          API_VERSIONS.constants.byId,
          `${constantApiUrl}/${userId === 1 ? 3 : 1}`
        ),
      }),
      providesTags: ['Constant'],
    }),
    getProfitMargin: build.query<Constant, number>({
      query: (userId) => ({
        url: withApiVersion(
          API_VERSIONS.constants.byId,
          `${constantApiUrl}/${userId === 1 ? 4 : 2}`
        ),
      }),
      providesTags: ['Constant'],
    }),
    getTomatoPrice: build.query<Constant, number>({
      query: (userId) => ({
        url: withApiVersion(
          API_VERSIONS.constants.byId,
          `${constantApiUrl}/${userId === 1 ? 6 : 5}`
        ),
      }),
      providesTags: ['Constant'],
    }),
    getTomatoOneCupExpense: build.query<Constant, number>({
      query: (userId) => ({
        url: withApiVersion(
          API_VERSIONS.constants.byId,
          `${constantApiUrl}/${userId === 1 ? 8 : 7}`
        ),
      }),
      providesTags: ['Constant'],
    }),

    patchConstant: build.mutation<
      Constant,
      { id: number; value: number; label: string }
    >({
      query: ({ id, ...body }) => ({
        url: withApiVersion(
          API_VERSIONS.constants.patch,
          `${constantApiUrl}/${id}`
        ),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Constant'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTomatoOneCupExpenseQuery,
  useGetTomatoPriceQuery,
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
  usePatchConstantMutation,
} = constantApiEndpoints;
