import { Container, Skeleton } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Id } from 'react-toastify';

import BouquetForm, { BouquetFormData } from '.';
import {
  useGetBouquetTransactionByIdQuery,
  useUpdateBouquetTransactionMutation,
} from '../../../../api/bouquetsApi';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { routesBouquets } from '../../../../constants/routes';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { BouquetTransaction } from '../../../../types/bouguets';
import { mapBouquetTransactionStatusesToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';

export default function EditBouquetTransaction() {
  const { id } = useParams();

  const [toastId, setToastId] = useState<Id>('');

  const { data: transaction, isLoading } = useGetBouquetTransactionByIdQuery(
    id ?? skipToken
  );

  const [updateTransaction, { data, error, isLoading: updateIsLoading }] =
    useUpdateBouquetTransactionMutation();

  const mappedStatus = mapBouquetTransactionStatusesToMenuItems();

  const handleSubmit = (data: BouquetFormData) => {
    if (transaction) {
      const req: BouquetTransaction = {
        ...data,
        id: Number(id),
        createdAt: transaction.createdAt,
        isDeleted: transaction.isDeleted,
      };

      updateTransaction(req);
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  useApiSuccessNotification({
    data,
    message: 'Transakcija uspešno izmenjena',
    toastId,
    navigateToAfter: `/${routesBouquets.root}`,
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
            href: `/${routesBouquets.root}`,
          },
          {
            name: 'Izmeni transakciju',
            href: `${routesBouquets.root}/${id}`,
          },
        ]}
      />
      {isLoading && <Skeleton variant='rounded' height={380} />}
      {transaction && !isLoading && (
        <BouquetForm
          values={{
            note: transaction.note,
            totalExpense: transaction.totalExpense,
            income: transaction.income,
            profit: transaction.profit,
            profitMargin: transaction.profitMargin,
            status: transaction.status,
          }}
          isLoading={updateIsLoading}
          onSubmit={handleSubmit}
          mappedStatus={mappedStatus}
        />
      )}
    </Container>
  );
}
