import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
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
        url: withApiVersion(API_VERSIONS.inventory.list, inventoryApiUrl),
      }),
      providesTags: ['Inventory', 'Order'],
    }),

    getTotalInventory: build.query<InventoryItem[], void>({
      query: () => ({
        url: withApiVersion(
          API_VERSIONS.inventory.overview,
          `${inventoryApiUrl}/overview`
        ),
      }),
      providesTags: ['Inventory', 'Order'],
    }),

    postInventory: build.mutation<InventoryPostRequest, InventoryPostRequest>({
      query: (body) => ({
        url: withApiVersion(
          API_VERSIONS.inventory.input,
          `${inventoryApiUrl}/input`
        ),
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
