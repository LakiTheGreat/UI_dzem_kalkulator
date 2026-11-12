import { api } from '.';
import { API_VERSIONS, withApiVersion } from '../constants/apiVersions';
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
          url: withApiVersion(
            API_VERSIONS.orders.list,
            `${ordersApiUrl}${query ? `?${query}` : ''}`
          ),
        };
      },
      providesTags: ['Order'],
    }),

    getOrderById: build.query<Order, string | number>({
      query: (id) => ({
        url: withApiVersion(API_VERSIONS.orders.byId, `${ordersApiUrl}/${id}`),
        method: 'GET',
      }),
      providesTags: ['Order'],
    }),

    createNewOrder: build.mutation<Order, NewOrder>({
      query: (body) => ({
        url: withApiVersion(API_VERSIONS.orders.create, ordersApiUrl),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    patchOrder: build.mutation<Order, OrderPatchRequest>({
      query: (body) => ({
        url: withApiVersion(
          API_VERSIONS.orders.update,
          `${ordersApiUrl}/${body.id}`
        ),
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Order'],
    }),

    deleteOrder: build.mutation<Order, number>({
      query: (id) => ({
        url: withApiVersion(API_VERSIONS.orders.delete, `${ordersApiUrl}/${id}`),
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
