import { Container, Skeleton, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import TomatoesOrderForm, { FormData } from '.';
import {
  useCreateTomatoOrderMutation,
  useGetTomatoCupsQuery,
  useGetTomatoOrderByIdQuery,
} from '../../../../api/tomatoesApi';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { TomatoOrder } from '../../../../types/tomatos';
import { mapTomatoCupsToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import { skipToken } from '@reduxjs/toolkit/query';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  orderId: number | null;
};

export default function EditTomatoOrder({ setOpen, orderId }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const { data: order, isLoading: orderIsLoading } = useGetTomatoOrderByIdQuery(
    orderId ?? skipToken
  );

  const { data: tomatoCups, isLoading: tomatoCupsIsLoading } =
    useGetTomatoCupsQuery();

  const [updateTomatoOrder, { data, error, isLoading: updateOrderIsLoading }] =
    useCreateTomatoOrderMutation();

  const mappedTomatoCups = mapTomatoCupsToMenuItems(tomatoCups);

  const isLoading = tomatoCupsIsLoading;

  const handleSubmit = (data: FormData) => {
    const req: TomatoOrder = {
      id: orderId || 0,
      ...data,
    };

    updateTomatoOrder(req);
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

  useEffect(() => {
    if (data) {
      setOpen(false);
    }
  }, [data, setOpen]);

  return (
    <Container maxWidth='sm'>
      <Stack sx={{ py: 2 }}>
        {orderIsLoading && <Skeleton variant='rounded' height={294} />}
        {order && (
          <TomatoesOrderForm
            values={{
              cupTypeId: order.cupTypeId,
              totalExpenses: order.totalExpenses,
              numOfCups: order.numOfCups,
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mappedTomatoCups={mappedTomatoCups}
            submitIsLoading={updateOrderIsLoading}
          />
        )}
      </Stack>
    </Container>
  );
}
