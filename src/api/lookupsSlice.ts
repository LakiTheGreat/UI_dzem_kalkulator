import { api } from '.';
import { MenuItemType } from '../components/RHFSelectInput';

const fruitsUrl = '/fruits';

const lookupsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getFruits: build.query<MenuItemType[], void>({
      query: () => ({
        url: `${fruitsUrl}`,
      }),
      providesTags: ['Fruit'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetFruitsQuery } = lookupsApiEndpoints;
