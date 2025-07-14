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
import { Id } from 'react-toastify';

import { useGetFruitsQuery } from '../../api/fruitsSlice';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from '../../api/ordersApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ORDER_WIDTH } from '../../constants';
import { routes } from '../../constants/routes';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { OrderParams, PRICE_STATUS } from '../../types/orders';
import FormattedPrice from '../../utils/FormattedPrice';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import OrderCard from './OrderCard';
import OrderDetailsDialog from './OrderDetailsDialog';

export default function OrdersPage() {
  const navigate = useNavigate();

  const [toastId, setToastId] = useState<Id>('');
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const param = {
    orderTypeId: 0,
    priceStatus: PRICE_STATUS.ALL,
  };

  const [params, setParams] = useState<OrderParams>(param);

  const { data, isFetching } = useGetAllOrdersQuery(params);
  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();

  const [deleteOrder, { data: deletedOrderData, error }] =
    useDeleteOrderMutation();

  const handleDelete = async (id: number) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu seriju?',
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
        heading={'Proizvodne serije'}
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
          <Stack direction='row' gap={2}>
            <FormControl fullWidth>
              <InputLabel>Vrsta džema</InputLabel>
              <Select
                value={params.orderTypeId}
                label='Vrsta džema'
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
            <FormControl fullWidth>
              <InputLabel>Besplatna osnova</InputLabel>
              <Select
                value={params.priceStatus}
                label='Besplatna osnova'
                onChange={(e) =>
                  setParams({ ...params, priceStatus: Number(e.target.value) })
                }
              >
                <MenuItem value={PRICE_STATUS.ALL}>Prikaži sve</MenuItem>
                <MenuItem value={PRICE_STATUS.ONLY_FREE}>
                  Besplatna osnova
                </MenuItem>
                <MenuItem value={PRICE_STATUS.ONLY_PAID}>
                  Plaćena osnova
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        )}

        {isFetching && <Skeleton variant='rounded' height={72} />}
        {!isFetching && (
          <Stack>
            {data?.totalCups.map((cup) => (
              <Stack direction='row' key={cup.label} gap={1}>
                <Typography sx={{ width: ORDER_WIDTH }}>
                  Broj teglica od: {cup.label}
                </Typography>
                <Typography sx={{ width: ORDER_WIDTH }}>
                  {cup.numberOf}
                </Typography>
              </Stack>
            ))}
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
            <Typography>
              Broj proizvodnih serija: {data?.orders?.length}
            </Typography>
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
