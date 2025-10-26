import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import { useGetAllTomatoTransactionQuery } from '../../../api/tomatoesApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MONTHS, YEARS } from '../../../constants';
import { routesTomatoes } from '../../../constants/routes';
import { BG_COLOR_INPUT } from '../../../theme/palette';
import { TomatoTransactionParams } from '../../../types/tomatos';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';
import TomatoTransactionCard from './TomatoTransactionCard';
import GeneralDialog from '../../../components/GeneralDialog';
import CreateTomatoTransaction from './form/CreateTomatoTransaction';
import { TransactionStatusStrings } from '../../../types/transactions';
import getStatusTranslation from '../../../utils/getStatusTranslation';
import { Z } from 'react-router/dist/development/index-react-server-client-BQ6FxdA_';

export default function TomatoesTransactionPage() {
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const defaultParams: TomatoTransactionParams = {
    transactionStatus: TransactionStatusStrings.ALL,
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
          <IconButton
            color='primary'
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={4}>
        <Container maxWidth='sm'>
          <Stack gap={2}>
            <Stack direction='row' gap={2}>
              <FormControl fullWidth>
                <InputLabel>Godina</InputLabel>
                <Select
                  sx={{ bgcolor: BG_COLOR_INPUT }}
                  value={params.year}
                  label='Godina'
                  onChange={(e) =>
                    setParams({
                      ...params,
                      year: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value={0}>Prikaži sve</MenuItem>
                  {YEARS?.map((year) => (
                    <MenuItem key={year.id} value={year.value}>
                      {year.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Mesec</InputLabel>
                <Select
                  sx={{ bgcolor: BG_COLOR_INPUT }}
                  value={params.month}
                  label='Mesec'
                  onChange={(e) =>
                    setParams({
                      ...params,
                      month: Number(e.target.value),
                    })
                  }
                >
                  <MenuItem value={0}>Prikaži sve</MenuItem>
                  {MONTHS?.map((month) => (
                    <MenuItem key={month.id} value={month.value}>
                      {month.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <Stack direction='row' gap={2}>
              <FormControl fullWidth>
                <InputLabel>Vrsta transakcije</InputLabel>
                <Select
                  sx={{ bgcolor: BG_COLOR_INPUT }}
                  value={params.transactionStatus}
                  label='Vrsta transakcije'
                  onChange={(e) =>
                    setParams({
                      ...params,
                      transactionStatus: e.target
                        .value as TransactionStatusStrings,
                    })
                  }
                >
                  {mappedStatus?.map((status) => (
                    <MenuItem key={status.value} value={status.value}>
                      {getStatusTranslation(status.value)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
      <GeneralDialog
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        maxWidth='xs'
        title={'Napravi transakciju čeri paradajza'}
      >
        <CreateTomatoTransaction
          setOpen={setOpenCreate}
          mappedStatuses={mappedStatus}
        />
      </GeneralDialog>
    </Container>
  );
}
