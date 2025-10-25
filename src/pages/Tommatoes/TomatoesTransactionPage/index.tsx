import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, IconButton } from '@mui/material';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import { TomatoParams } from '../../../types/tomatos';
import { useState } from 'react';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';

export default function TomatoesTransactionPage() {
  const defaultParams: TomatoParams = {
    transactionStatus: 'ALL',
  };

  const param = {
    ...defaultParams,
  };

  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const [params, setParams] = useState<TomatoParams>(param);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
        action={
          <IconButton color='primary'>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      TRANSACKIJE YA ČERI PARADAJZ
    </Container>
  );
}
