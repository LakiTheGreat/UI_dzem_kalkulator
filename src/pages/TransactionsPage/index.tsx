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

import {
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from '../../api/transactionsApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import TransactionCard from './TransactionCard';

export default function TransactionsPage() {
  const navigate = useNavigate();

  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [toastId, setToastId] = useState<Id>('');
  const [value, setValue] = useState<number>(0);

  const { data, isFetching } = useGetTransactionsQuery();
  const [deleteTransaction, { data: deleteTransactionData, error }] =
    useDeleteTransactionMutation();

  const handleEdit = (id: number) => {
    navigate(`/${routes.transactions}/${id}`);
  };

  const handleDelete = async (id: number) => {
    console.log(id);
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
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Pregled',
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
      <Stack>
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
                    Nema još transakcija.
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
