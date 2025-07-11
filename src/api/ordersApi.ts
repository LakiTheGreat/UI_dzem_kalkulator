import { api } from '.';

import { NewOrder, Order } from '../types/orders';

const ordersApiUrl = '/orders';

const orderApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    // getProfitMargin: build.query<Constant, void>({
    //   query: () => ({
    //     url: `${constantApiUrl}/2`,
    //   }),
    //   providesTags: ['Constant'],
    // }),

    createNewOrder: build.mutation<Order, NewOrder>({
      query: (body) => ({
        url: `${ordersApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Constant'],
    }),
  }),

  overrideExisting: false,
});

export const { useCreateNewOrderMutation } = orderApiEndpoints;
