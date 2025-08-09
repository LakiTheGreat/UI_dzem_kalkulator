import { api } from '.';
import {
  Inventory,
  InventoryItem,
  InventoryPostRequest,
} from '../types/inventory';

const inventoryApiUrl = '/inventory';

const inventoryApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getInventory: build.query<Inventory[], void>({
      query: () => ({
        url: `${inventoryApiUrl}`,
      }),
      providesTags: ['Inventory', 'Order'],
    }),

    getTotalInventory: build.query<InventoryItem[], void>({
      query: () => ({
        url: `${inventoryApiUrl}/overview`,
      }),
      providesTags: ['Inventory', 'Order'],
    }),

    postInventory: build.mutation<InventoryPostRequest, InventoryPostRequest>({
      query: (body) => ({
        url: `${inventoryApiUrl}/input`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetInventoryQuery,
  useGetTotalInventoryQuery,
  usePostInventoryMutation,
} = inventoryApiEndpoints;
