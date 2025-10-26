import { Container, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import TomatoesOrderForm, { FormData } from '.';
import {
  useCreateTomatoOrderMutation,
  useGetTomatoCupsQuery,
} from '../../../../api/tomatoesApi';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { UnsavedTomatoOrder } from '../../../../types/tomatos';
import { mapTomatoCupsToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import { useGetTomatoOneCupExpenseQuery } from '../../../../api/constantApi';
import { useAppSelector } from '../../../../hooks/reduxStoreHooks';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function CreateTomatoOrder({ setOpen }: Props) {
  const userId = useAppSelector((state) => state.auth.userId);

  const [toastId, setToastId] = useState<Id>('');

  const { data: tomatoCups, isLoading: tomatoCupsIsLoading } =
    useGetTomatoCupsQuery();

  const [createTomatoOrder, { data, error, isLoading: createIsLoading }] =
    useCreateTomatoOrderMutation();

  const { data: tomatoCupExpense, isLoading: tomatoCupExpenseLoading } =
    useGetTomatoOneCupExpenseQuery(userId || 0);

  const mappedTomatoCups = mapTomatoCupsToMenuItems(tomatoCups);

  const isLoading = tomatoCupsIsLoading || tomatoCupExpenseLoading;

  const handleSubmit = (data: FormData) => {
    const req: UnsavedTomatoOrder = {
      ...data,
    };

    createTomatoOrder(req);
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
        <TomatoesOrderForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          mappedTomatoCups={mappedTomatoCups}
          submitIsLoading={createIsLoading}
          tomatoCupExpense={tomatoCupExpense}
        />
      </Stack>
    </Container>
  );
}
