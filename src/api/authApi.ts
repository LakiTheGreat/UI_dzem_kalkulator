import { api } from '.';

const authUrl = '/auth';

const authApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ userId: number }, { password: string }>({
      query: (body) => ({
        url: `${authUrl}/login`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cups'],
    }),
  }),

  overrideExisting: false,
});

export const { useLoginMutation } = authApiEndpoints;
