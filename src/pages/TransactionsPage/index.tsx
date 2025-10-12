import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Id } from 'react-toastify';

import { useGetFruitsQuery } from '../../api/fruitsSlice';
import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '../../api/transactionsApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { useAppSelector } from '../../hooks/reduxStoreHooks';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import {
  TransactionParams,
  TransactionStatusStrings,
} from '../../types/transactions';
import filterFruits from '../../utils/filterFruits';
import getStatusTranslation from '../../utils/getStatusTranslation';
import { mapAllTransactionStatusesToMenuItems } from '../../utils/mapToMenuItems';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import TransactionCard from './TransactionCard';
import TransactionTable from './table/TransactionTable';
import { ORDER_WIDTH } from '../../constants';
import FormattedPrice from '../../utils/FormattedPrice';
import useResponsive from '../../hooks/useResponsive';

export default function TransactionsPage() {
  const isSm = useResponsive('down', 'sm');
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [toastId, setToastId] = useState<Id>('');
  const [value, setValue] = useState<number>(0);

  const param = {
    orderTypeId: 0,
    transactionStatus: 'ALL',
  };

  const [params, setParams] = useState<TransactionParams>(param);

  const { data: fruits, isFetching: isLoadingFruits } = useGetFruitsQuery();
  const { data, isFetching } = useGetTransactionsQuery(params);
  const [deleteTransaction, { data: deleteTransactionData, error }] =
    useDeleteTransactionMutation();

  const getCupsTotals = () => {
    if (!data) return [];

    const totals = data.reduce<Record<string, number>>((acc, transaction) => {
      transaction.cups.forEach((cup) => {
        if (!cup.label) return;
        acc[cup.label] = (acc[cup.label] ?? 0) + cup.quantity;
      });
      return acc;
    }, {});

    return Object.entries(totals).map(([label, quantity]) => ({
      label,
      quantity,
    }));
  };

  const sumData = getCupsTotals();

  const filteredFruits = userId === 1 ? fruits : filterFruits(fruits);
  const mappedStatus = mapAllTransactionStatusesToMenuItems();

  const handleEdit = (id: number) => {
    navigate(`/${routes.transactions}/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu transakciju?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    if (isConfirmed) {
      deleteTransaction(id);
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  useApiSuccessNotification({
    data: deleteTransactionData,
    message: 'Transakcija uspešno obrisana',
    toastId,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Džemovi',
            href: routes.inventory,
          },
        ]}
        action={
          <IconButton
            color='primary'
            onClick={() => navigate(`/${routes.transactions}/${routes.new}`)}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={4}>
        <Container maxWidth='sm'>
          <Stack gap={2}>
            {isLoadingFruits && <Skeleton variant='rounded' height={56} />}
            {!isLoadingFruits && (
              <Stack gap={2}>
                <Stack direction='row' gap={2}>
                  <FormControl fullWidth>
                    <InputLabel>Vrsta džema</InputLabel>
                    <Select
                      value={params.orderTypeId}
                      label='Vrsta džema'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          orderTypeId: Number(e.target.value),
                        })
                      }
                    >
                      <MenuItem value={0}>Prikaži sve</MenuItem>
                      {filteredFruits?.map((fruit) => (
                        <MenuItem key={fruit.id} value={fruit.id}>
                          {fruit.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Vrsta transakcije</InputLabel>
                    <Select
                      value={params.transactionStatus}
                      label='Vrsta transakcije'
                      onChange={(e) =>
                        setParams({
                          ...params,
                          transactionStatus: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={'ALL'}>Prikaži sve</MenuItem>
                      {mappedStatus?.map((status) => (
                        <MenuItem key={status.value} value={status.value}>
                          {getStatusTranslation(status.value)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>
            )}
            <Stack gap={1}>
              {isFetching && (
                <Stack gap={1}>
                  <Skeleton variant='rounded' height={30} />
                  <Skeleton variant='rounded' height={30} />
                  <Skeleton variant='rounded' height={30} />
                </Stack>
              )}
              {!isFetching && (
                <>
                  {sumData.map((cup, index) => (
                    <Stack
                      direction={isSm ? 'column' : 'row'}
                      key={cup.label}
                      gap={1}
                    >
                      <Stack direction='row'>
                        <Typography sx={{ width: ORDER_WIDTH }}>
                          Br. teglica od {cup.label}:
                        </Typography>
                        <Stack
                          direction='row'
                          gap={1}
                          sx={{ width: ORDER_WIDTH }}
                          justifyContent='space-between'
                        >
                          <Typography>{cup.quantity}</Typography>

                          <Stack
                            direction='row'
                            color={getColor(params.transactionStatus || 'ALL')}
                            gap={1}
                          >
                            ≈
                            <FormattedPrice
                              price={calculatePrice(cup.quantity, cup.label)}
                            />
                          </Stack>
                        </Stack>
                      </Stack>

                      <Divider />
                    </Stack>
                  ))}
                  <Stack
                    direction='row'
                    color={getColor(params.transactionStatus || 'ALL')}
                    sx={{ fontWeight: 'bold' }}
                    gap={1}
                    justifyContent='flex-end'
                  >
                    ≈
                    <FormattedPrice
                      isBold
                      price={calculateTotalPrice(sumData)}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>
        </Container>
        <TabContext value={value}>
          <TabList
            onChange={(e, newValue) => setValue(newValue)}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            sx={{ mt: -2 }}
          >
            <Tab label={'Kartice'} value={0} />
            <Tab label={'Tabela'} value={1} />
          </TabList>
          <Stack gap={3}>
            {isFetching && (
              <Stack>
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={234}
                  sx={{ mt: 3, mx: 3 }}
                />
              </Stack>
            )}

            <TabPanel value={0}>
              <Grid container spacing={3}>
                {!isFetching &&
                  data?.map((transaction) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                      <TransactionCard
                        transaction={transaction}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                  ))}
                {data?.length === 0 && (
                  <Typography textAlign='center' sx={{ mt: 3, width: '100%' }}>
                    Još nema ni jedne takve transakcije.
                  </Typography>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={1}>
              <TransactionTable
                data={data}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            </TabPanel>
          </Stack>
        </TabContext>
      </Stack>
      <Confirmation />
    </Container>
  );
}

const calculatePrice = (quantity: number, label: string) => {
  switch (label) {
    case '212ml':
      return quantity * 500;
    case '370ml':
      return quantity * 600;
    default:
      return 0;
  }
};

const calculateTotalPrice = (
  cupData: { quantity: number; label?: string }[]
) => {
  let total = 0;
  cupData.forEach((cup) => {
    total += calculatePrice(cup.quantity, cup.label || '');
  });
  return total;
};

const getColor = (status: string) => {
  switch (status) {
    case TransactionStatusStrings.CONSUMED:
      return 'error.main';
    case TransactionStatusStrings.PROMOTION:
      return 'error.main';
    case TransactionStatusStrings.GIVEN_AWAY:
      return 'error.main';
    case TransactionStatusStrings.OTHER:
      return 'error.main';
    case TransactionStatusStrings.SOLD:
      return 'success.dark';
    case 'ALL':
      return '';
    default:
      return '';
  }
};
