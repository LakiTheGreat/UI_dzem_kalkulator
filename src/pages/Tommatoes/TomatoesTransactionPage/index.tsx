import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { useGetAllTomatoTransactionQuery } from '../../../api/tomatoesApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import { TomatoParams } from '../../../types/tomatos';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';

import TomatoTransactionCard from './TomatoTransactionCard';

export default function TomatoesTransactionPage() {
  const defaultParams: TomatoParams = {
    transactionStatus: 'ALL',
  };

  const param = {
    ...defaultParams,
  };

  const [params, setParams] = useState<TomatoParams>(param);

  const { data, isFetching } = useGetAllTomatoTransactionQuery(params);

  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

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
      <Grid container spacing={3}>
        {!isFetching &&
          data &&
          data.map((transaction) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
              <TomatoTransactionCard
                transaction={transaction}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </Grid>
          ))}
        {data?.length === 0 && (
          <Typography textAlign='center' sx={{ mt: 3, width: '100%' }}>
            Nema još ništa.
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
