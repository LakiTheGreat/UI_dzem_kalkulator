import { api } from '.';

import { NewOrder, Order } from '../types/orders';

const ordersApiUrl = '/orders';

const orderApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query<Order[], void>({
      query: () => ({
        url: `${ordersApiUrl}/`,
      }),
      providesTags: ['Order'],
    }),

    createNewOrder: build.mutation<Order, NewOrder>({
      query: (body) => ({
        url: `${ordersApiUrl}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),
  }),

  overrideExisting: false,
});

export const { useCreateNewOrderMutation, useGetAllOrdersQuery } =
  orderApiEndpoints;
