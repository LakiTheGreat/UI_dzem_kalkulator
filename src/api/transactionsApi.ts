import { api } from '.';
import {
  Transaction,
  TransactionParams,
  UnsavedTransaction,
  UpdateTransactionReq,
} from '../types/transactions';

const transactionsApiUrl = '/transactions';

const transactionsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], TransactionParams>({
      query: ({ orderTypeId, transactionStatus, year, month }) => {
        const params = new URLSearchParams();

        if (orderTypeId && orderTypeId > 0) {
          params.set('orderTypeId', String(orderTypeId));
        }

        if (transactionStatus && transactionStatus !== 'ALL') {
          params.set('transactionStatus', String(transactionStatus));
        }

        if (year && year > 0) {
          params.set('year', String(year));
        }

        if (month && month > 0) {
          params.set('month', String(month));
        }

        const query = params?.toString();

        return {
          url: `${transactionsApiUrl}${query ? `?${query}` : ''}`,
        };
      },

      providesTags: ['Inventory', 'Transactions'],
    }),
    getTransactionById: build.query<Transaction, string>({
      query: (id) => ({
        url: `${transactionsApiUrl}/${id}`,
      }),
      providesTags: ['Inventory', 'Transactions'],
    }),
    createTransaction: build.mutation<UnsavedTransaction, UnsavedTransaction>({
      query: (body) => ({
        url: `${transactionsApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inventory', 'Transactions'],
    }),
    updateTransaction: build.mutation<UnsavedTransaction, UpdateTransactionReq>(
      {
        query: (body) => ({
          url: `${transactionsApiUrl}/${body.id}`,
          method: 'PUT',
          body,
        }),
        invalidatesTags: ['Inventory', 'Transactions'],
      }
    ),
    deleteTransaction: build.mutation<UnsavedTransaction, number>({
      query: (id) => ({
        url: `${transactionsApiUrl}/${id}`,
        method: 'DELETE',
        body: { isDeleted: true },
      }),
      invalidatesTags: ['Inventory', 'Transactions'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApiEndpoints;
