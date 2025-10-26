import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Container, Grid, IconButton, Skeleton, Tab } from '@mui/material';
import { useState } from 'react';
import { Id } from 'react-toastify';

import {
  useDeleteTomatoOrderMutation,
  useGetAllTomatoOrderQuery,
} from '../../../api/tomatoesApi';
import GeneralDialog from '../../../components/GeneralDialog';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import CreateTomatoOrder from './form/CreateTomatoOrder';
import EditTomatoOrder from './form/EditTomatoOrder';
import TomatoOrdersTable from './table/TomatoOrdersTable';
import TomatoTransactionCard from './TomatoOrderCard';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';
import { useGetTomatoPriceQuery } from '../../../api/constantApi';

export default function TomatoesOrdersPage() {
  const userId = useAppSelector((state) => state.auth.userId);

  const [toastId, setToastId] = useState<Id>('');
  const [orderId, setOrderId] = useState<number | null>(null);
  const [getConfirmation, Confirmation] = useConfirmDialog();

  const [value, setValue] = useState<number>(0);
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const { data, isFetching } = useGetAllTomatoOrderQuery();
  const [deleteTomatoOrder, { data: deleteData, error: deleteError }] =
    useDeleteTomatoOrderMutation();

  const { data: tomatoPrice, isLoading: tomatoPriceIsLoading } =
    useGetTomatoPriceQuery(userId || 0);

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
      deleteTomatoOrder(req);
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

  const somethingIsLoading = isFetching || tomatoPriceIsLoading;

  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
        action={
          <IconButton color='primary' onClick={() => setOpenCreate(true)}>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
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
        <TabPanel value={0}>
          <Grid container spacing={3}>
            {somethingIsLoading && (
              <>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                  <Skeleton variant='rounded' height={200} />
                </Grid>
              </>
            )}
            {!somethingIsLoading &&
              data?.map((transaction) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                  <TomatoTransactionCard
                    order={transaction}
                    handleDelete={handleDelete}
                    tomatoPrice={tomatoPrice}
                    handleEdit={(id) => {
                      setOrderId(id);
                      setOpenEdit(true);
                    }}
                  />
                </Grid>
              ))}
          </Grid>
        </TabPanel>
        <TabPanel value={1}>
          <TomatoOrdersTable />
        </TabPanel>
      </TabContext>

      {!data?.length && !isFetching && 'Još nema serija'}

      <GeneralDialog
        open={openCreate}
        handleClose={() => setOpenCreate(false)}
        maxWidth='xs'
        title={'Napravi turu čeri paradajza'}
      >
        <CreateTomatoOrder setOpen={setOpenCreate} />
      </GeneralDialog>
      <GeneralDialog
        open={openEdit}
        handleClose={() => {
          setOpenEdit(false);
          setOrderId(null);
        }}
        maxWidth='xs'
        title={'Izmeni turu čeri paradajza'}
      >
        <EditTomatoOrder setOpen={setOpenEdit} orderId={orderId} />
      </GeneralDialog>
      <Confirmation />
    </Container>
  );
}
