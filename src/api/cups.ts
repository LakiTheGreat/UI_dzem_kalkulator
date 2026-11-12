import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
import { CupWithPriceData } from '../types/cups';

const cupsUrl = '/cups';

const cupsApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllCups: build.query<CupWithPriceData[], void>({
      query: () => ({
        url: withApiVersion(API_VERSIONS.cups.list, cupsUrl),
      }),
      providesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useGetAllCupsQuery } = cupsApiEndpoints;
