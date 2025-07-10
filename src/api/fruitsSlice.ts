import { api } from '.';

import { Fruit } from '../types/fruits';

const fruitsUrl = '/fruits';

const fruitsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getFruits: build.query<Fruit[], void>({
      query: () => ({
        url: `${fruitsUrl}`,
      }),
      providesTags: ['Fruit'],
    }),
    createFruit: build.mutation<Fruit, { label: string }>({
      query: (body) => ({
        url: `${fruitsUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Fruit'],
    }),
    patchFruit: build.mutation<Fruit, { id: number; label: string }>({
      query: ({ id, ...body }) => ({
        url: `${fruitsUrl}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Fruit'],
    }),
    deleteFruit: build.mutation<Fruit, { id: string }>({
      query: ({ id }) => ({
        url: `${fruitsUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Fruit'],
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
