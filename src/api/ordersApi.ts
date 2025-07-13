import { api } from '.';

import { NewOrder, Order, OrderParams, OrderResponse } from '../types/orders';

const ordersApiUrl = '/orders';

const orderApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query<OrderResponse, OrderParams>({
      query: ({ orderTypeId, priceStatus }) => {
        const params = new URLSearchParams();
        if (orderTypeId && orderTypeId > 0) {
          params.set('orderTypeId', String(orderTypeId));
        }

        if (priceStatus && priceStatus > 0) {
          params.set('priceStatus', String(priceStatus));
        }
        return {
          url: `${ordersApiUrl}?${params.toString()}`,
        };
      },
      providesTags: ['Order'],
    }),

    getOrderById: build.query<Order, number>({
      query: (id) => ({
        url: `${ordersApiUrl}/${id}`,
        method: 'GET',
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

    deleteOrder: build.mutation<Order, number>({
      query: (id) => ({
        url: `${ordersApiUrl}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Order'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreateNewOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,
} = orderApiEndpoints;
