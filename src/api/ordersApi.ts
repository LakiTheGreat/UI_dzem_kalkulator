import { api } from '.';

import { NewOrder, Order, OrderParams, OrderResponse } from '../types/orders';

const ordersApiUrl = '/orders';

const orderApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query<OrderResponse, OrderParams>({
      query: ({ orderTypeId }) => {
        const params = new URLSearchParams();
        if (orderTypeId && orderTypeId > 0) {
          params.set('orderTypeId', String(orderTypeId));
        }
        return {
          url: `${ordersApiUrl}?${params.toString()}`,
        };
      },
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
