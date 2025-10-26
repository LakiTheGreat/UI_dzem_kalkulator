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
import { Id } from 'react-toastify';

import {
  useDeleteTomatoTransactionMutation,
  useGetAllTomatoTransactionQuery,
} from '../../../api/tomatoesApi';
import GeneralDialog from '../../../components/GeneralDialog';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MONTHS, YEARS } from '../../../constants';
import { routesTomatoes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { BG_COLOR_INPUT } from '../../../theme/palette';
import { TomatoTransactionParams } from '../../../types/tomatos';
import { TransactionStatusStrings } from '../../../types/transactions';
import getStatusTranslation from '../../../utils/getStatusTranslation';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import CreateTomatoTransaction from './form/CreateTomatoTransaction';
import EditTomatoTransaction from './form/EditTomatoTransaction';
import TomatoTransactionCard from './TomatoTransactionCard';

export default function TomatoesTransactionPage() {
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [toastId, setToastId] = useState<Id>('');
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

  const [deleteTransaction, { data: deleteData, error: deleteError }] =
    useDeleteTomatoTransactionMutation();

  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const handleEdit = (id: number) => {
    setTransactionId(id);
    setOpenEdit(true);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu transakciju?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    const req = {
      isDeleted: true,
      id,
    };

    if (isConfirmed) {
      deleteTransaction(req);
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  useApiSuccessNotification({
    data: deleteData,
    message: 'Serija uspešno obrisana',
    toastId,
  });

  useApiErrorNotification({
    error: deleteError,
    toastId,
  });

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
      <GeneralDialog
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
          setTransactionId(null);
        }}
        maxWidth='xs'
        title={'Napravi transakciju čeri paradajza'}
      >
        <EditTomatoTransaction
          setOpen={setOpenEdit}
          mappedStatuses={mappedStatus}
          transactionId={transactionId}
        />
      </GeneralDialog>
      <Confirmation />
    </Container>
  );
}
