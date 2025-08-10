import { api } from '.';
import { Transaction } from '../types/transactions';

const transactionsApiUrl = '/transactions';

const transactionsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], void>({
      query: () => ({
        url: `${transactionsApiUrl}`,
      }),
      providesTags: ['Inventory', 'Transactions'],
    }),

    // postInventory: build.mutation<InventoryPostRequest, InventoryPostRequest>({
    //   query: (body) => ({
    //     url: `${inventoryApiUrl}/input`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Inventory'],
    // }),
  }),

  overrideExisting: false,
});

export const { useGetTransactionsQuery } = transactionsApiEndpoints;
