import { Container, Skeleton } from '@mui/material';
import { useState } from 'react';
import { Id } from 'react-toastify';

import TransactionsForm, { TransactionFormData } from '.';
import { useGetAllCupsQuery } from '../../../api/cups';
import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import { useCreateTransactionMutation } from '../../../api/transactionsApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import {
  mapAllTransactionStatusesToMenuItems,
  mapCupsWithDataToMenuItems,
  mapFruitToMenuItems,
} from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';

export default function CreateTransaction() {
  const [toastId, setToastId] = useState<Id>('');

  const { data: fruitData, isLoading: fruitLoading } = useGetFruitsQuery();
  const { data: cupsWithData, isLoading: cupsWithDataIsLoading } =
    useGetAllCupsQuery();

  const [createTransaction, { data, error, isLoading: createIsLoading }] =
    useCreateTransactionMutation();

  const mappedFruits = mapFruitToMenuItems(fruitData);
  const mappedCups = mapCupsWithDataToMenuItems(cupsWithData);
  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const isLoading = cupsWithDataIsLoading || fruitLoading;

  const handleSubmit = (data: TransactionFormData) => {
    const transformed = {
      ...data,
      orderTypeId: Number(data.orderTypeId),
      cupData: data.cupData.map((cup) => ({
        ...cup,
        quantity: -Math.abs(Number(cup.quantity)), // ensure quantity is negative
      })),
    };

    createTransaction(transformed);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useApiSuccessNotification({
    data,
    message: 'Transakcija uspešno kreirana',
    toastId,
    navigateToAfter: `/${routes.transactions}`,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Džemovi',
            href: `/${routes.transactions}`,
          },
          {
            name: 'Nova transakcija',
            href: `${routes.transactions}/${routes.new}`,
          },
        ]}
      />
      {isLoading && <Skeleton height={380} variant='rounded' />}
      {!isLoading && (
        <TransactionsForm
          isLoading={createIsLoading}
          onSubmit={handleSubmit}
          mappedCups={mappedCups}
          mappedFruits={mappedFruits}
          mappedStatus={mappedStatus}
        />
      )}
    </Container>
  );
}
