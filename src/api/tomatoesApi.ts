import { api } from '.';
import {
  TomatoCup,
  TomatoOrder,
  TomatoOrderParams,
  TomatoTotal,
  TomatoTransaction,
  TomatoTransactionParams,
  UnsavedTomatoOrder,
  UnsavedTomatoTransaction,
} from '../types/tomatos';
import { TransactionStatusStrings } from '../types/transactions';

const tomatoApiUrl = '/tomatoes';

const tomatoesApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTomatoOrder: build.query<TomatoOrder[], TomatoOrderParams>({
      query: ({ year, month }) => {
        const params = new URLSearchParams();

        if (year && year > 0) {
          params.set('year', String(year));
        }

        if (month && month > 0) {
          params.set('month', String(month));
        }

        const query = params?.toString();

        return {
          url: `${tomatoApiUrl}${query ? `?${query}` : ''}`,
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

    getAllTomatoTransaction: build.query<
      TomatoTransaction[],
      TomatoTransactionParams
    >({
      query: ({ transactionStatus }) => {
        const params = new URLSearchParams();

        // if (orderTypeId && orderTypeId > 0) {
        //   params.set('orderTypeId', String(orderTypeId));
        // }

        if (
          transactionStatus &&
          transactionStatus !== TransactionStatusStrings.ALL
        ) {
          params.set('transactionStatus', String(transactionStatus));
        }

        const query = params?.toString();

        return {
          url: `${tomatoApiUrl}/transactions${query ? `?${query}` : ''}`,
        };
      },

      providesTags: ['TomatoTransaction'],
    }),

    createTomatoTransaction: build.mutation<
      TomatoTransaction,
      UnsavedTomatoTransaction
    >({
      query: (body) => ({
        url: `${tomatoApiUrl}/transactions`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TomatoInventory', 'TomatoTransaction'],
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
  useCreateTomatoTransactionMutation,
  useGetAllTomatoTransactionQuery,
  useGetTomatoTotalsQuery,
  useDeleteTomatoOrderMutation,
  useGetTomatoOrderByIdQuery,
  useGetTomatoCupsQuery,
  useCreateTomatoOrderMutation,
  useGetAllTomatoOrderQuery,
  useUpdateTomatoOrderMutation,
} = tomatoesApiEndpoints;
