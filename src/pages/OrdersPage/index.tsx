import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Container,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetFruitsQuery } from '../../api/fruitsSlice';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from '../../api/ordersApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ORDER_WIDTH } from '../../constants';
import { routes } from '../../constants/routes';
import { OrderParams } from '../../types/orders';
import FormattedPrice from '../../utils/FormattedPrice';
import OrderCard from './OrderCard';
import OrderDetailsDialog from './OrderDetailsDialog';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { Id } from 'react-toastify';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';

export default function OrdersPage() {
  const navigate = useNavigate();

  const [toastId, setToastId] = useState<Id>('');
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const param = {
    orderTypeId: 0,
  };

  const [params, setParams] = useState<OrderParams>(param);

  const { data, isFetching } = useGetAllOrdersQuery(params);
  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();

  const [deleteOrder, { data: deletedOrderData, error }] =
    useDeleteOrderMutation();

  const handleDelete = async (id: number) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu porudžbinu?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    if (isConfirmed) {
      deleteOrder(id);
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  useApiSuccessNotification({
    data: deletedOrderData,
    message: 'Porudžbina uspešno obrisana',
    toastId,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Porudžbine'}
        links={[
          {
            name: 'Pregled',
            href: routes.orders,
          },
        ]}
        action={
          <IconButton
            color='primary'
            onClick={() => navigate(`/${routes.orders}/${routes.new}`)}
          >
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={3}>
        {isLoadingFruits && <Skeleton variant='rounded' height={56} />}
        {!isLoadingFruits && (
          <FormControl fullWidth>
            <InputLabel>Vrsta porudžbine</InputLabel>
            <Select
              value={params.orderTypeId}
              label='Vrsta porudžbine'
              onChange={(e) =>
                setParams({ ...params, orderTypeId: Number(e.target.value) })
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
        )}
        {isFetching && <Skeleton variant='rounded' height={72} />}
        {!isFetching && (
          <Stack>
            <Stack direction='row' gap={1}>
              <Typography sx={{ width: ORDER_WIDTH }}>
                Ukupni prihod:
              </Typography>
              <FormattedPrice price={data?.totalValue ?? 0} />
            </Stack>
            <Stack direction='row' color='primary.main' gap={1}>
              <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                Ukupni rashod:
              </Typography>
              <FormattedPrice
                price={data?.totalExpense ?? 0}
                isBold
                isExpense
              />
            </Stack>
            <Stack direction='row' color='success.dark' gap={1}>
              <Typography sx={{ fontWeight: 'bold', width: ORDER_WIDTH }}>
                Ukupni profit:
              </Typography>
              <FormattedPrice price={data?.totalProfit ?? 0} isBold />
            </Stack>
          </Stack>
        )}
        <Divider />

        <Stack gap={3}>
          {isFetching && (
            <Stack gap={3}>
              <Skeleton variant='rounded' height={24} width={145} />
              <Skeleton variant='rounded' height={280} />
              <Skeleton variant='rounded' height={280} />
              <Skeleton variant='rounded' height={280} />
            </Stack>
          )}
          {!isFetching && (
            <Typography>Broj porudžbina: {data?.orders?.length}</Typography>
          )}
          {!isFetching &&
            data?.orders?.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                setSelectedId={setSelectedId}
                handleDelete={handleDelete}
              />
            ))}
          {data?.orders?.length === 0 && (
            <Typography textAlign='center' sx={{ mt: 3 }}>
              Još nema porudžbina za ovu voćku.
            </Typography>
          )}
        </Stack>
      </Stack>
      {selectedId && (
        <OrderDetailsDialog
          selectedId={selectedId}
          open={!!selectedId}
          handleClose={() => setSelectedId(null)}
        />
      )}
      <Confirmation />
    </Container>
  );
}
