import { api } from '.';
import { InventoryItem } from '../types/inventory';

const inventoryApiUrl = '/inventory';

const inventoryApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getTotalInventory: build.query<InventoryItem[], void>({
      query: () => ({
        url: `${inventoryApiUrl}/overview`,
      }),
      providesTags: ['Inventory'],
    }),
    //   getProfitMargin: build.query<Constant, number>({
    //     query: (userId) => ({
    //       url: `${constantApiUrl}/${userId === 1 ? 4 : 2} `,
    //     }),
    //     providesTags: ['Constant'],
    //   }),

    //   patchConstant: build.mutation<
    //     Constant,
    //     { id: number; value: number; label: string }
    //   >({
    //     query: ({ id, ...body }) => ({
    //       url: `${constantApiUrl}/${id}`,
    //       method: 'PATCH',
    //       body,
    //     }),
    //     invalidatesTags: ['Constant'],
    //   }),
  }),

  overrideExisting: false,
});

export const { useGetTotalInventoryQuery } = inventoryApiEndpoints;
