import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Container,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Tab,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Id } from 'react-toastify';

import { useGetAllBouquetsTransactionsQuery } from '../../api/bouquetsApi';
import { useDeleteTransactionMutation } from '../../api/transactionsApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import BouquetTransactionCard from './BouquetTransactionCard';

export default function BouquetPage() {
  const navigate = useNavigate();

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [toastId, setToastId] = useState<Id>('');
  const [value, setValue] = useState<number>(0);

  const { data, isFetching } = useGetAllBouquetsTransactionsQuery();

  const [deleteTransaction, { data: deleteTransactionData, error }] =
    useDeleteTransactionMutation();

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
            name: 'Jestivi buketi',
            href: routes.bouquets,
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
        {/* <Container maxWidth='sm'>
          <Stack>
            {isLoadingFruits && <Skeleton variant='rounded' height={56} />}
            {!isLoadingFruits && (
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
                    {fruits?.map((fruit) => (
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
                    <MenuItem value={TransactionStatusStrings.SOLD}>
                      {getStatusTranslation(TransactionStatusStrings.SOLD)}
                    </MenuItem>
                    <MenuItem value={TransactionStatusStrings.CONSUMED}>
                      {getStatusTranslation(TransactionStatusStrings.CONSUMED)}
                    </MenuItem>
                    <MenuItem value={TransactionStatusStrings.GIVEN_AWAY}>
                      {getStatusTranslation(
                        TransactionStatusStrings.GIVEN_AWAY
                      )}
                    </MenuItem>
                    <MenuItem value={TransactionStatusStrings.OTHER}>
                      {getStatusTranslation(TransactionStatusStrings.OTHER)}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
        </Container> */}
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

            <TabPanel value={1}>TABELA</TabPanel>
          </Stack>
        </TabContext>
      </Stack>
      <Confirmation />
    </Container>
  );
}
