import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Button,
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useGetAllTomatoTransactionQuery } from '../../../api/tomatoesApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import { BG_COLOR_INPUT } from '../../../theme/palette';
import { TomatoTransactionParams } from '../../../types/tomatos';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';
import TomatoTransactionCard from './TomatoTransactionCard';

export default function TomatoesTransactionPage() {
  const defaultParams: TomatoTransactionParams = {
    transactionStatus: 'ALL',
    year: 0,
    month: 0,
  };

  const param = {
    ...defaultParams,
  };

  const [params, setParams] = useState<TomatoTransactionParams>(param);

  const { data, isFetching } = useGetAllTomatoTransactionQuery(params);

  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const handleEdit = (id: number) => {
    console.log(id);
  };

  const handleDelete = (id: number) => {
    console.log(id);
  };

  return (
    <Container>
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
      <Stack gap={4}>
        <Container maxWidth='sm'>
          <Stack gap={2}>
            <Stack gap={2} direction='row'>
              <Stack
                sx={{
                  width: '100%',
                  bgcolor: 'lightGray',
                  height: 54,
                  borderRadius: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Filter za godinu
              </Stack>
              <Stack
                sx={{
                  width: '100%',
                  bgcolor: 'lightGray',
                  height: 54,
                  borderRadius: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Filter za mesec
              </Stack>
            </Stack>

            <Button
              sx={{ bgcolor: BG_COLOR_INPUT }}
              variant='outlined'
              startIcon={<RefreshIcon />}
              onClick={() => setParams(defaultParams)}
              size='large'
              loading={isFetching}
              fullWidth
            >
              Resetuj filtere
            </Button>
          </Stack>
        </Container>
        <Grid container spacing={3}>
          {isFetching && (
            <>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={265} />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={265} />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={265} />
              </Grid>
            </>
          )}
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
      </Stack>
    </Container>
  );
}
