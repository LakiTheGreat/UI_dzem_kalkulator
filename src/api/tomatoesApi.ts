import { api } from '.';
import {
  TomatoCup,
  TomatoOrder,
  TomatoTotal,
  UnsavedTomatoOrder,
} from '../types/tomatos';

const tomatoApiUrl = '/tomatoes';

const tomatoesApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTomatoOrder: build.query<TomatoOrder[], void>({
      query: () => {
        // const params = new URLSearchParams();

        // if (orderTypeId && orderTypeId > 0) {
        //   params.set('orderTypeId', String(orderTypeId));
        // }

        // if (transactionStatus && transactionStatus !== 'ALL') {
        //   params.set('transactionStatus', String(transactionStatus));
        // }
        return {
          // url: `${bouquetsApiUrl}`,
          url: `${tomatoApiUrl}`,
        };
      },

      providesTags: ['TomatoOrder'],
    }),

    getTomatoOrderById: build.query<TomatoOrder, number>({
      query: (id) => ({
        url: `${tomatoApiUrl}/${id}`,
      }),
      providesTags: ['TomatoOrder'],
    }),

    getTomatoCups: build.query<TomatoCup[], void>({
      query: () => {
        return {
          url: `${tomatoApiUrl}/cups`,
        };
      },

      providesTags: ['TomatoCups'],
    }),

    getTomatoTotals: build.query<TomatoTotal[], void>({
      query: () => {
        return {
          url: `${tomatoApiUrl}/totals`,
        };
      },

      providesTags: ['TomatoOrder'],
    }),
    createTomatoOrder: build.mutation<TomatoOrder, UnsavedTomatoOrder>({
      query: (body) => ({
        url: `${tomatoApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TomatoOrder'],
    }),
    updateTomatoOrder: build.mutation<TomatoOrder, TomatoOrder>({
      query: (body) => ({
        url: `${tomatoApiUrl}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TomatoOrder'],
    }),
    deleteTomatoOrder: build.mutation<TomatoOrder, Partial<TomatoOrder>>({
      query: (body) => ({
        url: `${tomatoApiUrl}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['TomatoOrder'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTomatoTotalsQuery,
  useDeleteTomatoOrderMutation,
  useGetTomatoOrderByIdQuery,
  useGetTomatoCupsQuery,
  useCreateTomatoOrderMutation,
  useGetAllTomatoOrderQuery,
  useUpdateTomatoOrderMutation,
} = tomatoesApiEndpoints;
