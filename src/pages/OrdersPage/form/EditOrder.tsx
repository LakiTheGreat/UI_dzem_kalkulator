import { Container, Skeleton } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Id } from 'react-toastify';

import OrderForm, { FormData } from '.';
import { useGetOtherExpansesMarginQuery } from '../../../api/constantApi';
import { useGetAllCupsQuery } from '../../../api/cups';
import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import {
  useGetOrderByIdQuery,
  usePatchOrderMutation,
} from '../../../api/ordersApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import { OrderPatchRequest } from '../../../types/orders';
import { mapFruitToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';

export default function EditOrder() {
  const [toastId, setToastId] = useState<Id>('');
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery(userId || 0);

  const { data: fruitData, isLoading: fruitLoading } = useGetFruitsQuery();
  const { data: singleOrder, isLoading: isLoadingSingleOrder } =
    useGetOrderByIdQuery(id ?? skipToken);

  const { data: cupsWithData, isLoading: cupsWithDataIsLoading } =
    useGetAllCupsQuery();

  const mappedFruits = mapFruitToMenuItems(fruitData);

  const isLoading =
    cupsWithDataIsLoading ||
    isLoadingSingleOrder ||
    fruitLoading ||
    otherExpansesMarginLoading;

  const [patchOrder, { data, error, isLoading: putIsLoading }] =
    usePatchOrderMutation();

  const handleSubmit = (data: FormData) => {
    const req: OrderPatchRequest = {
      id: Number(id),
      orderTypeId: Number(data.orderTypeId),
      orderName: data.orderName,
      fruits: data.fruits.map((fruit) => ({
        grams: fruit.grams.toString(),
        price: fruit.price.toString(),
        total: fruit.total.toString(),
        fruitId: fruit.fruitId,
      })),
      cups: data.cups
        .filter((cup) => cup.numberOf > 0)
        .map((cup) => ({
          cost: cup.cost,
          label: cup.label,
          numberOf: cup.numberOf,
          sellingPrice: cup.sellingPrice,
          total: cup.total,
        })),
      otherExpensesMargin: otherExpansesMargin?.value || 1,
      baseFruitIsFree: data.baseFruitIsFree,
    };

    patchOrder(req);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useEffect(() => {
    if (data) {
      navigate(`/${routes.orders}`);
    }
  }, [data, navigate]);

  useApiSuccessNotification({
    data,
    message: 'Serija uspešno izmenjena',
    toastId,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Pregled',
            href: `/${routes.orders}`,
          },
          {
            name: 'Izmeni seriju',
            href: `${routes.orders}/${routes.new}`,
          },
        ]}
      />
      {isLoading && <Skeleton height={'70vh'} variant='rounded' />}
      {!isLoading && singleOrder && (
        <OrderForm
          onSubmit={handleSubmit}
          data={undefined}
          cupsWithData={cupsWithData}
          mappedFruits={mappedFruits}
          otherExpansesMargin={otherExpansesMargin}
          isLoading={putIsLoading}
          values={{
            orderName: singleOrder.orderName,
            orderTypeId: String(singleOrder.orderTypeId),
            baseFruitIsFree: singleOrder.baseFruitIsFree,
            fruits: singleOrder.fruits,
            cups: singleOrder.cups,
          }}
        />
      )}
    </Container>
  );
}
