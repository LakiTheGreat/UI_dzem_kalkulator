import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
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

import { useGetTomatoOneCupExpenseQuery } from '../../../api/constantApi';
import {
  useDeleteTomatoTransactionMutation,
  useGetAllTomatoTransactionQuery,
  useGetTomatoTotalsQuery,
} from '../../../api/tomatoesApi';
import GeneralDialog from '../../../components/GeneralDialog';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MONTHS, ORDER_WIDTH, YEARS } from '../../../constants';
import { routesTomatoes } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { BG_COLOR_INPUT } from '../../../theme/palette';
import { TomatoTransactionParams } from '../../../types/tomatos';
import { TransactionStatusStrings } from '../../../types/transactions';
import FormattedPrice from '../../../utils/FormattedPrice';
import getStatusTranslation from '../../../utils/getStatusTranslation';
import { mapAllTransactionStatusesToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import CreateTomatoTransaction from './form/CreateTomatoTransaction';
import EditTomatoTransaction from './form/EditTomatoTransaction';
import TomatoTransactionCard from './TomatoTransactionCard';
import ResetButton from '../../../components/ResetButtton';

export default function TomatoesTransactionPage() {
  const userId = useAppSelector((state) => state.auth.userId);

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

  const { data: tomatoTotals, isLoading: tomatoTotalsIsLoading } =
    useGetTomatoTotalsQuery();
  const { data: tomatoExpence, isLoading: tomatoExpenceLoading } =
    useGetTomatoOneCupExpenseQuery(userId || 0);

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

  const somethingIsLoading =
    isFetching || tomatoTotalsIsLoading || tomatoExpenceLoading;

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

            <ResetButton
              sx={{ bgcolor: BG_COLOR_INPUT }}
              handleReset={() => setParams(defaultParams)}
            />

            {somethingIsLoading && <Skeleton height={96} variant='rounded' />}
            {!somethingIsLoading &&
              tomatoTotals &&
              tomatoTotals.map((tomatoTotal) => {
                // ✅ Count how many items share the same label
                const countLabels =
                  data?.reduce((sum, item) => {
                    if (item.label !== tomatoTotal.label) return sum;
                    return sum + item.numOfCups;
                  }, 0) ?? 0;

                // ✅ Calculate total expenses per label
                const estimatedTotalExpences =
                  data?.reduce((sum, item) => {
                    if (item.label !== tomatoTotal.label) return sum;
                    return sum + item.numOfCups * (tomatoExpence?.value || 0);
                  }, 0) ?? 0;

                // ✅ Calculate total income per label
                const calculatedTotalIncome =
                  data?.reduce((sum, item) => {
                    if (item.label !== tomatoTotal.label) return sum;
                    return sum + item.numOfCups * item.pricePerCup;
                  }, 0) ?? 0;

                // ✅ Profit (income - expenses)
                const profit = calculatedTotalIncome - estimatedTotalExpences;

                return (
                  <Stack>
                    <Stack direction='row' key={tomatoTotal.label}>
                      <Typography sx={{ width: ORDER_WIDTH }}>
                        Br. teglica od {tomatoTotal.label}:
                      </Typography>
                      <Typography>{countLabels}</Typography>
                    </Stack>

                    <Stack direction='row'>
                      <Typography sx={{ width: ORDER_WIDTH }}>
                        Procenjen prihod:
                      </Typography>

                      <FormattedPrice price={calculatedTotalIncome} />
                    </Stack>

                    <Stack direction='row' color='error.main'>
                      <Typography
                        sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}
                      >
                        Ukupni rashod:
                      </Typography>
                      <Stack sx={{ ml: -1.3 }}>
                        <FormattedPrice
                          price={estimatedTotalExpences || 0}
                          isExpense
                          isBold
                        />
                      </Stack>
                    </Stack>

                    <Stack direction='row' color='success.dark'>
                      <Typography
                        sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}
                      >
                        Procenjen prihod:
                      </Typography>

                      <FormattedPrice price={profit} isBold />
                    </Stack>
                  </Stack>
                );
              })}
            {/* </Stack> */}
          </Stack>
        </Container>
        <Grid container spacing={3}>
          {isFetching && (
            <>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={375} />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={375} />
              </Grid>
              <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                <Skeleton variant='rounded' height={375} />
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
                  tomatoExpence={tomatoExpence}
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
