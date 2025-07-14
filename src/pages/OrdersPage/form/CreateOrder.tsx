import { Container } from '@mui/material';
import { useState } from 'react';
import { Id } from 'react-toastify';

import OrderForm, { FormData } from '.';
import { useGetOtherExpansesMarginQuery } from '../../../api/constantApi';
import { useCreateNewOrderMutation } from '../../../api/ordersApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import { NewOrder } from '../../../types/orders';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';

export default function CreateOrder() {
  const [toastId, setToastId] = useState<Id>('');

  const { data: otherExpensesMargin } = useGetOtherExpansesMarginQuery();
  const [createNewOrder, { data, error }] = useCreateNewOrderMutation();

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
      cups: data.cups.map((cup) => ({
        cost: cup.cost,
        label: cup.label,
        numberOf: cup.numberOf,
        sellingPrice: cup.sellingPrice,
        total: cup.total,
      })),
      otherExpensesMargin: otherExpensesMargin?.value || 1,
      baseFruitIsFree: data.baseFruitIsFree,
    };

    createNewOrder(req);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useApiSuccessNotification({
    data,
    message: 'Narudžbina uspešno kreirana',
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
      <OrderForm onSubmit={handleSubmit} data={data} />
    </Container>
  );
}
