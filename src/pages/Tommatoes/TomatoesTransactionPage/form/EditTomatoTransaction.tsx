import { Container, Skeleton, Stack } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import TomatoesTransactionForm, { FormData } from '.';
import {
  useGetTomatoCupsQuery,
  useGetTomatoTransactionByIdQuery,
  useUpdateTomatoTransactionMutation,
} from '../../../../api/tomatoesApi';
import { MenuItemType } from '../../../../components/RHFSelectInput';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { TomatoTransaction } from '../../../../types/tomatos';
import { mapTomatoCupsToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  transactionId: number | null;
  mappedStatuses: MenuItemType[];
};

export default function EditTomatoTransaction({
  setOpen,
  transactionId,
  mappedStatuses,
}: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const { data: tomatoCups, isLoading: tomatoCupsIsLoading } =
    useGetTomatoCupsQuery();

  const { data: transaction, isLoading: transactionIsLoading } =
    useGetTomatoTransactionByIdQuery(transactionId ?? skipToken);

  const [
    updateTomatoTransaction,
    { data, error, isLoading: updateTransactionIsLoading },
  ] = useUpdateTomatoTransactionMutation();

  const mappedTomatoCups = mapTomatoCupsToMenuItems(tomatoCups);

  const isLoading = tomatoCupsIsLoading;

  const handleSubmit = (data: FormData) => {
    const req: TomatoTransaction = {
      id: transactionId || 0,
      ...data,
    };

    updateTomatoTransaction(req);
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
        {transactionIsLoading && <Skeleton variant='rounded' height={438} />}
        {transaction && (
          <TomatoesTransactionForm
            values={{
              note: transaction.note,
              cupTypeId: transaction.cupTypeId,
              status: transaction.status,
              numOfCups: transaction.numOfCups,
              pricePerCup: transaction.pricePerCup,
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            mappedTomatoCups={mappedTomatoCups}
            mappedStatuses={mappedStatuses}
            submitIsLoading={updateTransactionIsLoading}
          />
        )}
      </Stack>
    </Container>
  );
}
