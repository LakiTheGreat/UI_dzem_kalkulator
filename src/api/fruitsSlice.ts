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
  }),

  overrideExisting: false,
});

export const { useGetFruitsQuery } = fruitsApiEndpoints;
