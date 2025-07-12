import DeleteIcon from '@mui/icons-material/DeleteOutline';
// import EditIcon from '@mui/icons-material/Edit';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
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
import { Dispatch, SetStateAction } from 'react';

type Props = {
  order: Order;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
  handleDelete: (id: number) => void;
};

export default function OrderCard({
  order,
  setSelectedId,
  handleDelete,
}: Props) {
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
            <Typography sx={{ width: ORDER_WIDTH }}>Prihod:</Typography>
            <FormattedPrice price={order.totalValue} />
          </Stack>

          <Stack direction='row' color='primary.main'>
            <Typography sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}>
              Rashod:
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
          {/* <IconButton
            onClick={() => {
              setSelectedId(order.id);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton> */}

          {/* <IconButton>
            <EditIcon />
          </IconButton> */}

          <IconButton onClick={() => handleDelete(order.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
