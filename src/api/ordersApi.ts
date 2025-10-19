import { api } from '.';
import {
  NewOrder,
  Order,
  OrderParams,
  OrderPatchRequest,
  OrderResponse,
} from '../types/orders';

const ordersApiUrl = '/orders';

const orderApiEndpoints = api.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query<OrderResponse, OrderParams>({
      query: ({ orderTypeId, priceStatus, year, month }) => {
        const params = new URLSearchParams();
        if (orderTypeId && orderTypeId > 0) {
          params.set('orderTypeId', String(orderTypeId));
        }

        if (priceStatus && priceStatus > 0) {
          params.set('priceStatus', String(priceStatus));
        }

        if (year && year > 0) {
          params.set('year', String(year));
        }

        if (month && month > 0) {
          params.set('month', String(month));
        }

        const query = params?.toString();

        return {
          url: `${ordersApiUrl}${query ? `?${query}` : ''}`,
        };
      },
      providesTags: ['Order'],
    }),

    getOrderById: build.query<Order, string | number>({
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

    patchOrder: build.mutation<Order, OrderPatchRequest>({
      query: (body) => ({
        url: `${ordersApiUrl}/${body.id}`,
        method: 'PUT',
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
  usePatchOrderMutation,
} = orderApiEndpoints;
