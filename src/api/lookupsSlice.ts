import { api } from '.';
import { MenuItemType } from '../components/RHFSelectInput';

const lookupsUrl = '/lookup';

const lookupsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getFruits: build.query<MenuItemType[], void>({
      query: () => ({
        url: `${lookupsUrl}/fruits`,
      }),
      providesTags: ['Test'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetFruitsQuery } = lookupsApiEndpoints;
