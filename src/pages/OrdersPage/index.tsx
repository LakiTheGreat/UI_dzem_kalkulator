import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, IconButton, Skeleton, Stack } from '@mui/material';
import { useNavigate } from 'react-router';

import { useGetAllOrdersQuery } from '../../api/ordersApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import OrderCard from './OrderCard';

export default function OrdersPage() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetAllOrdersQuery();

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
        {isLoading && (
          <Stack gap={3}>
            <Skeleton variant='rounded' height={280} />
            <Skeleton variant='rounded' height={280} />
            <Skeleton variant='rounded' height={280} />
          </Stack>
        )}

        {!isLoading &&
          data?.map((order) => <OrderCard key={order.id} order={order} />)}
      </Stack>
    </Container>
  );
}
