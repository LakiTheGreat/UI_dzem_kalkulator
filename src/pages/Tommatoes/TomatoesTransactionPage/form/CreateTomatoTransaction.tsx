import { Container, Stack } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import { FormData } from '.';
import {
  useCreateTomatoTransactionMutation,
  useGetTomatoCupsQuery,
} from '../../../../api/tomatoesApi';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { UnsavedTomatoTransaction } from '../../../../types/tomatos';
import { mapTomatoCupsToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import TomatoesTransactionForm from '.';
import { MenuItemType } from '../../../../components/RHFSelectInput';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  mappedStatuses: MenuItemType[];
};

export default function CreateTomatoTransaction({
  setOpen,
  mappedStatuses,
}: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const { data: tomatoCups, isLoading: tomatoCupsIsLoading } =
    useGetTomatoCupsQuery();

  const [createTomatoTransaction, { data, error, isLoading: createIsLoading }] =
    useCreateTomatoTransactionMutation();

  const mappedTomatoCups = mapTomatoCupsToMenuItems(tomatoCups);

  const isLoading = tomatoCupsIsLoading;

  const handleSubmit = (data: FormData) => {
    const req: UnsavedTomatoTransaction = {
      ...data,
    };

    createTomatoTransaction(req);
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
        <TomatoesTransactionForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          mappedTomatoCups={mappedTomatoCups}
          submitIsLoading={createIsLoading}
          mappedStatuses={mappedStatuses}
        />
      </Stack>
    </Container>
  );
}
