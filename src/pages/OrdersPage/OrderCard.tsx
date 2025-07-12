import { Card, CardContent, Divider, Stack, Typography } from '@mui/material';
import { Order } from '../../types/orders';

import FormattedPrice from '../../utils/FormattedPrice';
import { formatLocalDateTime } from '../../utils/formatLocalDateTime';

type Props = {
  order: Order;
};

export default function OrderCard({ order }: Props) {
  return (
    <Card
      key={order.id}
      variant='outlined'
      sx={{ bgcolor: 'secondary.lighter' }}
    >
      <CardContent>
        <Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Vreme porudžbine:</Typography>
            <Typography>{formatLocalDateTime(order.createdAt)}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Naziv porudžbine:</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              {order.orderTypeName}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Broj malih teglica:</Typography>
            <Typography> {order.numberOfSmallCups}</Typography>
          </Stack>

          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Broj velikih teglica:</Typography>
            <Typography>{order.numberOfLargeCups}</Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Prihodi:</Typography>
            <FormattedPrice price={order.totalValue} />
          </Stack>

          <Stack direction='row' color='primary.main'>
            <Typography sx={{ width: '55%', fontWeight: 'bold' }}>
              Rashodi:
            </Typography>
            <FormattedPrice price={order.totalExpense} isExpense isBold />
          </Stack>

          <Stack direction='row' color='success.dark'>
            <Typography sx={{ width: '55%', fontWeight: 'bold' }}>
              Profit:
            </Typography>
            <FormattedPrice price={order.profit} isBold />
          </Stack>

          <Stack direction='row'>
            <Typography sx={{ width: '55%' }}>Profitna marža:</Typography>
            <Typography>{`${order.profitMargin}%`}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
