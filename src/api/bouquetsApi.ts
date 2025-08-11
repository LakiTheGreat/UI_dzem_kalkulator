import { api } from '.';
import { BouquetTransaction } from '../types/bouguets';

const bouquetsApiUrl = '/bouquets';

const bouquetsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBouquetsTransactions: build.query<BouquetTransaction[], void>({
      query: () => {
        // const params = new URLSearchParams();

        // if (orderTypeId && orderTypeId > 0) {
        //   params.set('orderTypeId', String(orderTypeId));
        // }

        // if (transactionStatus && transactionStatus !== 'ALL') {
        //   params.set('transactionStatus', String(transactionStatus));
        // }
        return {
          url: `${bouquetsApiUrl}`,
          // url: `${bouquetsApiUrl}?${params.toString()}`,
        };
      },

      providesTags: ['Bouquet'],
    }),
    // getTransactionById: build.query<Transaction, string>({
    //   query: (id) => ({
    //     url: `${transactionsApiUrl}/${id}`,
    //   }),
    //   providesTags: ['Inventory', 'Transactions'],
    // }),
    // createTransaction: build.mutation<UnsavedTransaction, UnsavedTransaction>({
    //   query: (body) => ({
    //     url: `${transactionsApiUrl}`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Inventory', 'Transactions'],
    // }),
    // updateTransaction: build.mutation<UnsavedTransaction, UpdateTransactionReq>(
    //   {
    //     query: (body) => ({
    //       url: `${transactionsApiUrl}/${body.id}`,
    //       method: 'PUT',
    //       body,
    //     }),
    //     invalidatesTags: ['Inventory', 'Transactions'],
    //   }
    // ),
    // deleteTransaction: build.mutation<UnsavedTransaction, number>({
    //   query: (id) => ({
    //     url: `${transactionsApiUrl}/${id}`,
    //     method: 'DELETE',
    //     body: { isDeleted: true },
    //   }),
    //   invalidatesTags: ['Inventory', 'Transactions'],
    // }),
  }),

  overrideExisting: false,
});

export const { useGetAllBouquetsTransactionsQuery } = bouquetsApiEndpoints;
