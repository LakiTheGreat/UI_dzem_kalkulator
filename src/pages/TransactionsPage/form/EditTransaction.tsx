import { Container, Skeleton } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Id } from 'react-toastify';

import TransactionsForm, { TransactionFormData } from '.';
import { useGetAllCupsQuery } from '../../../api/cups';
import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import {
  useCreateTransactionMutation,
  useGetTransactionByIdQuery,
} from '../../../api/transactionsApi';
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

export default function EditTransaction() {
  const { id } = useParams();

  const [toastId, setToastId] = useState<Id>('');

  const { data: transaction } = useGetTransactionByIdQuery(id ?? skipToken);

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
    console.log(transformed);
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
            name: 'Pregled',
            href: `/${routes.transactions}`,
          },
          {
            name: 'Izmeni transakciju',
            href: `${routes.transactions}/${id}`,
          },
        ]}
      />
      {isLoading && <Skeleton height={'70vh'} variant='rounded' />}
      {!isLoading && transaction && (
        <TransactionsForm
          values={{
            orderTypeId: String(transaction.orderTypeId),
            status: transaction.status,
            cupData: transaction.cups.map((cup) => ({
              cupId: cup.cupId,
              quantity: Math.abs(cup.quantity),
            })),
          }}
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
