import { Container } from '@mui/material';
import { useState } from 'react';
import { Id } from 'react-toastify';

import BouquetForm, { BouquetFormData } from '.';
import { useCreateBouquetTransactionMutation } from '../../../../api/bouquetsApi';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import { routesBouquets } from '../../../../constants/routes';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { mapBouquetTransactionStatusesToMenuItems } from '../../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';

export default function CreateBouquetTransaction() {
  const [toastId, setToastId] = useState<Id>('');

  const [createTransaction, { data, error, isLoading: createIsLoading }] =
    useCreateBouquetTransactionMutation();

  const mappedStatus = mapBouquetTransactionStatusesToMenuItems();

  const handleSubmit = (data: BouquetFormData) => {
    createTransaction(data);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useApiSuccessNotification({
    data,
    message: 'Transakcija uspešno kreirana',
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
            name: 'Jestivi buketi',
            href: `/${routesBouquets.root}`,
          },
          {
            name: 'Nova transakcija',
            href: `${routesBouquets.root}/new`,
          },
        ]}
      />

      <BouquetForm
        isLoading={createIsLoading}
        onSubmit={handleSubmit}
        mappedStatus={mappedStatus}
      />
    </Container>
  );
}
