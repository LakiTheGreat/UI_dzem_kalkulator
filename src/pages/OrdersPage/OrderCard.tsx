import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { ORDER_WIDTH } from '../../constants';
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
            <Typography sx={{ width: ORDER_WIDTH }}>
              Vreme porudžbine:
            </Typography>
            <Typography>{formatLocalDateTime(order.createdAt)}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>
              Naziv porudžbine:
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }}>
              {order.orderTypeName}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>
              Broj malih teglica:
            </Typography>
            <Typography> {order.numberOfSmallCups}</Typography>
          </Stack>

          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>
              Broj velikih teglica:
            </Typography>
            <Typography>{order.numberOfLargeCups}</Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>Prihodi:</Typography>
            <FormattedPrice price={order.totalValue} />
          </Stack>

          <Stack direction='row' color='primary.main'>
            <Typography sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}>
              Rashodi:
            </Typography>
            <FormattedPrice price={order.totalExpense} isExpense isBold />
          </Stack>

          <Stack direction='row' color='success.dark'>
            <Typography sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}>
              Profit:
            </Typography>
            <FormattedPrice price={order.profit} isBold />
          </Stack>

          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>Profitna marža:</Typography>
            <Typography>{`${order.profitMargin}%`}</Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions>
        <Stack
          direction='row'
          justifyContent='center'
          sx={{ width: '100%' }}
          gap={3}
        >
          <IconButton>
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
