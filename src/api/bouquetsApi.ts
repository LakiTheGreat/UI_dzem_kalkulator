import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
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
        if (transactionStatus && transactionStatus !== 'ALL') {
          params.set('transactionStatus', String(transactionStatus));
        }
        return {
          url: withApiVersion(
            API_VERSIONS.bouquets.list,
            `${bouquetsApiUrl}?${params.toString()}`
          ),
        };
      },

      providesTags: ['Bouquet'],
    }),
    getBouquetTransactionById: build.query<BouquetTransaction, string>({
      query: (id) => ({
        url: withApiVersion(API_VERSIONS.bouquets.byId, `${bouquetsApiUrl}/${id}`),
      }),
      providesTags: ['Bouquet'],
    }),
    createBouquetTransaction: build.mutation<
      BouquetTransaction,
      BouquetFormData
    >({
      query: (body) => ({
        url: withApiVersion(API_VERSIONS.bouquets.create, bouquetsApiUrl),
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
        url: withApiVersion(
          API_VERSIONS.bouquets.update,
          `${bouquetsApiUrl}/${body.id}`
        ),
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
