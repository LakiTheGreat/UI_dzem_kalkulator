import { Container, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Id } from 'react-toastify';

import OrderForm, { FormData } from '.';
import { useGetOtherExpansesMarginQuery } from '../../../api/constantApi';
import { useGetAllCupsQuery } from '../../../api/cups';
import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import { useCreateNewOrderMutation } from '../../../api/ordersApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import { NewOrder } from '../../../types/orders';
import { mapFruitToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';

export default function CreateOrder() {
  const [toastId, setToastId] = useState<Id>('');
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: fruitData, isLoading: fruitLoading } = useGetFruitsQuery();
  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery(userId || 0);

  const { data: cupsWithData, isLoading: cupsWithDataIsLoading } =
    useGetAllCupsQuery();

  const [createNewOrder, { data, error, isLoading: createIsLoading }] =
    useCreateNewOrderMutation();

  const mappedFruits = mapFruitToMenuItems(fruitData);

  const isLoading =
    cupsWithDataIsLoading || fruitLoading || otherExpansesMarginLoading;

  const handleSubmit = (data: FormData) => {
    const req: NewOrder = {
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

    createNewOrder(req);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useApiSuccessNotification({
    data,
    message: 'Serija uspešno kreirana',
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
            name: 'Nova serija',
            href: `${routes.orders}/${routes.new}`,
          },
        ]}
      />
      {isLoading && <Skeleton height={'70vh'} variant='rounded' />}
      {!isLoading && (
        <OrderForm
          isLoading={createIsLoading}
          onSubmit={handleSubmit}
          data={data}
          cupsWithData={cupsWithData}
          mappedFruits={mappedFruits}
          otherExpansesMargin={otherExpansesMargin}
        />
      )}
    </Container>
  );
}
