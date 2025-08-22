import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
  Tab,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Id } from 'react-toastify';

import {
  useGetAllBouquetsTransactionsQuery,
  useUpdateBouquetTransactionMutation,
} from '../../api/bouquetsApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ORDER_WIDTH } from '../../constants';
import { routes } from '../../constants/routes';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { BouquetParams, BouquetTransaction } from '../../types/bouguets';
import FormattedPrice from '../../utils/FormattedPrice';
import getStatusTranslation from '../../utils/getStatusTranslation';
import { mapBouquetTransactionStatusesToMenuItems } from '../../utils/mapToMenuItems';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import BouquetTransactionCard from './BouquetTransactionCard';
import BouquetTable from './table/BouquetTable';

export default function BouquetPage() {
  const navigate = useNavigate();

  const param = {
    transactionStatus: 'ALL',
  };

  const [params, setParams] = useState<BouquetParams>(param);

  const mappedStatus = mapBouquetTransactionStatusesToMenuItems();

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [toastId, setToastId] = useState<Id>('');
  const [value, setValue] = useState<number>(0);

  const { data, isFetching } = useGetAllBouquetsTransactionsQuery(params);

  const [deleteTransaction, { data: deleteTransactionData, error }] =
    useUpdateBouquetTransactionMutation();

  const totalExpense = data?.reduce((sum, item) => sum + item.totalExpense, 0);
  const totalIncome = data?.reduce((sum, item) => sum + item.income, 0);
  const totalProfit = data?.reduce((sum, item) => sum + item.profit, 0);

  const handleEdit = (id: number) => {
    navigate(`/${routes.bouquets}/${id}`);
  };

  const handleDelete = async (bouquet: BouquetTransaction) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu transakciju?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    const req = {
      ...bouquet,
      isDeleted: true,
    };

    if (isConfirmed) {
      deleteTransaction(req);
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
  console.log(params);
  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Jestivi buketi',
            href: routes.bouquets,
          },
        ]}
        action={
          <IconButton
            color='primary'
            onClick={() => navigate(`/${routes.bouquets}/${routes.new}`)}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={4}>
        <Container maxWidth='sm'>
          {isFetching && <Skeleton variant='rounded' height={96} />}
          {!isFetching && (
            <Stack gap={2}>
              <Stack direction='row' gap={2}>
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
              <Stack>
                <Stack direction='row' gap={1}>
                  <Typography sx={{ width: ORDER_WIDTH }}>
                    Ukupni prihod:
                  </Typography>
                  <FormattedPrice price={totalIncome || 0} />
                </Stack>
                <Stack direction='row' color='primary.main' gap={1}>
                  <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                    Ukupni rashod:
                  </Typography>
                  <Stack sx={{ ml: -1.3 }}>
                    <FormattedPrice
                      price={totalExpense ?? 0}
                      isBold
                      isExpense
                    />
                  </Stack>
                </Stack>
                <Stack direction='row' color='success.dark' gap={1}>
                  <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                    Ukupni profit:
                  </Typography>
                  <FormattedPrice price={totalProfit || 0} isBold />
                </Stack>
              </Stack>
            </Stack>
          )}
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
                <Skeleton variant='rounded' height={24} width={200} />
                <Skeleton
                  variant='rounded'
                  height={274}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={274}
                  sx={{ mt: 3, mx: 3 }}
                />
                <Skeleton
                  variant='rounded'
                  height={274}
                  sx={{ mt: 3, mx: 3 }}
                />
              </Stack>
            )}

            {!isFetching && (
              <Typography>Broj proizvedenih buketa: {data?.length}</Typography>
            )}

            <TabPanel value={0}>
              <Grid container spacing={3}>
                {!isFetching &&
                  data?.map((transaction) => (
                    <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                      <BouquetTransactionCard
                        transaction={transaction}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                      />
                    </Grid>
                  ))}
                {data?.length === 0 && (
                  <Typography textAlign='center' sx={{ mt: 3, width: '100%' }}>
                    Još nema ni jedne transakcije.
                  </Typography>
                )}
              </Grid>
            </TabPanel>

            <TabPanel value={1}>
              <BouquetTable
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
