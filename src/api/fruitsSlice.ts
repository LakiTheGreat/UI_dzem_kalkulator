import { api } from '.';

import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
import { Fruit } from '../types/fruits';

const fruitsUrl = '/fruits';
const fruitsListUrl = withApiVersion(API_VERSIONS.fruits.list, fruitsUrl);

const fruitsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getFruits: build.query<Fruit[], void>({
      query: () => ({
        url: fruitsListUrl,
      }),
      providesTags: ['Fruit'],
    }),
    createFruit: build.mutation<Fruit, { label: string }>({
      query: (body) => ({
        url: withApiVersion(API_VERSIONS.fruits.create, fruitsUrl),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Fruit'],
    }),
    patchFruit: build.mutation<Fruit, { id: number; label: string }>({
      query: ({ id, ...body }) => ({
        url: withApiVersion(API_VERSIONS.fruits.patch, `${fruitsUrl}/${id}`),
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Fruit', 'Order'],
    }),
    deleteFruit: build.mutation<Fruit, { id: string }>({
      query: ({ id }) => ({
        url: withApiVersion(API_VERSIONS.fruits.delete, `${fruitsUrl}/${id}`),
        method: 'DELETE',
      }),
      invalidatesTags: ['Fruit', 'Order'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetFruitsQuery,
  usePatchFruitMutation,
  useCreateFruitMutation,
  useDeleteFruitMutation,
} = fruitsApiEndpoints;
