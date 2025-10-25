import { api } from '.';
import {
  TomatoCup,
  TomatoOrder,
  TomatoParams,
  TomatoTotal,
  TomatoTransaction,
  UnsavedTomatoOrder,
  UnsavedTomatoTransaction,
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

    getAllTomatoTransaction: build.query<TomatoTransaction[], TomatoParams>({
      query: ({ transactionStatus }) => {
        const params = new URLSearchParams();

        // if (orderTypeId && orderTypeId > 0) {
        //   params.set('orderTypeId', String(orderTypeId));
        // }

        if (transactionStatus && transactionStatus !== 'ALL') {
          params.set('transactionStatus', String(transactionStatus));
        }

        const query = params?.toString();

        return {
          url: `${tomatoApiUrl}/transactions${query ? `?${query}` : ''}`,
        };
      },

      providesTags: ['TomatoOrder'],
    }),
    createTomatoTransaction: build.mutation<
      UnsavedTomatoTransaction,
      TomatoTransaction
    >({
      query: (body) => ({
        url: `${tomatoApiUrl}/transactions`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TomatoInventory'],
    }),

    getTomatoTotals: build.query<TomatoTotal[], void>({
      query: () => {
        return {
          url: `${tomatoApiUrl}/totals`,
        };
      },

      providesTags: ['TomatoInventory'],
    }),
    createTomatoOrder: build.mutation<TomatoOrder, UnsavedTomatoOrder>({
      query: (body) => ({
        url: `${tomatoApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TomatoOrder', 'TomatoInventory'],
    }),
    updateTomatoOrder: build.mutation<TomatoOrder, TomatoOrder>({
      query: (body) => ({
        url: `${tomatoApiUrl}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TomatoOrder', 'TomatoInventory'],
    }),
    deleteTomatoOrder: build.mutation<TomatoOrder, Partial<TomatoOrder>>({
      query: (body) => ({
        url: `${tomatoApiUrl}/${body.id}`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['TomatoOrder', 'TomatoInventory'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllTomatoTransactionQuery,
  useGetTomatoTotalsQuery,
  useDeleteTomatoOrderMutation,
  useGetTomatoOrderByIdQuery,
  useGetTomatoCupsQuery,
  useCreateTomatoOrderMutation,
  useGetAllTomatoOrderQuery,
  useUpdateTomatoOrderMutation,
} = tomatoesApiEndpoints;
