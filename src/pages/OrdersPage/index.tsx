import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Container,
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
import { useGetAllOrdersQuery } from '../../api/ordersApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { OrderParams } from '../../types/orders';
import OrderCard from './OrderCard';

export default function OrdersPage() {
  const navigate = useNavigate();

  const param = {
    orderTypeId: 0,
  };

  const [params, setParams] = useState<OrderParams>(param);

  const { data, isFetching } = useGetAllOrdersQuery(params);
  const { data: fruits, isLoading: isLoadingFruits } = useGetFruitsQuery();

  console.log(data);

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

        <Stack gap={3}>
          {isFetching && (
            <Stack gap={3}>
              <Skeleton variant='rounded' height={280} />
              <Skeleton variant='rounded' height={280} />
              <Skeleton variant='rounded' height={280} />
            </Stack>
          )}

          {!isFetching &&
            data?.map((order) => <OrderCard key={order.id} order={order} />)}
          {data?.length === 0 && (
            <Typography textAlign='center' sx={{ mt: 3 }}>
              Još nema porudžbina za ovu voćku.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
