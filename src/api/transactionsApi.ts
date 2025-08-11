import { api } from '.';
import {
  Transaction,
  UnsavedTransaction,
  UpdateTransactionReq,
} from '../types/transactions';

const transactionsApiUrl = '/transactions';

const transactionsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], void>({
      query: () => ({
        url: `${transactionsApiUrl}`,
      }),
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
  }),

  overrideExisting: false,
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
  useUpdateTransactionMutation,
} = transactionsApiEndpoints;
