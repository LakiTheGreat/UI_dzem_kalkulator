import { api } from '.';
import { Transaction, UnsavedTransaction } from '../types/transactions';

const transactionsApiUrl = '/transactions';

const transactionsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], void>({
      query: () => ({
        url: `${transactionsApiUrl}`,
      }),
      providesTags: ['Inventory', 'Transactions'],
    }),

    createTransaction: build.mutation<UnsavedTransaction, UnsavedTransaction>({
      query: (body) => ({
        url: `${transactionsApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetTransactionsQuery, useCreateTransactionMutation } =
  transactionsApiEndpoints;
