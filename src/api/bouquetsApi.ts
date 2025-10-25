import { api } from '.';
import { BouquetFormData } from '../pages/Bouquets/BouquetPage/form';

import { BouquetParams, BouquetTransaction } from '../types/bouguets';

const bouquetsApiUrl = '/bouquets';

const bouquetsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllBouquetsTransactions: build.query<
      BouquetTransaction[],
      BouquetParams
    >({
      query: ({ transactionStatus }) => {
        const params = new URLSearchParams();

        // if (orderTypeId && orderTypeId > 0) {
        //   params.set('orderTypeId', String(orderTypeId));
        // }

        if (transactionStatus && transactionStatus !== 'ALL') {
          params.set('transactionStatus', String(transactionStatus));
        }
        return {
          // url: `${bouquetsApiUrl}`,
          url: `${bouquetsApiUrl}?${params.toString()}`,
        };
      },

      providesTags: ['Bouquet'],
    }),
    getBouquetTransactionById: build.query<BouquetTransaction, string>({
      query: (id) => ({
        url: `${bouquetsApiUrl}/${id}`,
      }),
      providesTags: ['Bouquet'],
    }),
    createBouquetTransaction: build.mutation<
      BouquetTransaction,
      BouquetFormData
    >({
      query: (body) => ({
        url: `${bouquetsApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bouquet'],
    }),
    updateBouquetTransaction: build.mutation<
      BouquetTransaction,
      BouquetTransaction
    >({
      query: (body) => ({
        url: `${bouquetsApiUrl}/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Bouquet'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAllBouquetsTransactionsQuery,
  useGetBouquetTransactionByIdQuery,
  useCreateBouquetTransactionMutation,
  useUpdateBouquetTransactionMutation,
} = bouquetsApiEndpoints;
