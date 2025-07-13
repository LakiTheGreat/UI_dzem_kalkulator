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
  useTheme,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

import { ORDER_WIDTH } from '../../constants';
import { Order } from '../../types/orders';
import FormattedPrice from '../../utils/FormattedPrice';
import { formatLocalDateTime } from '../../utils/formatLocalDateTime';

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
  const { palette } = useTheme();

  return (
    <Card
      key={order.id}
      variant='outlined'
      sx={{
        bgcolor: 'secondary.lighter',
        border: `1px solid ${
          order.baseFruitIsFree ? `${palette.success.dark}` : 'transparent'
        }`,
      }}
    >
      <CardContent>
        <Stack>
          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>Napomena:</Typography>
            <Typography sx={{ width: ORDER_WIDTH }}>
              {order.orderName || '/'}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>Vreme unosa:</Typography>
            <Typography>{formatLocalDateTime(order.createdAt)}</Typography>
          </Stack>
          <Stack direction='row'>
            <Typography sx={{ width: ORDER_WIDTH }}>Vrsta džema:</Typography>
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
              Osnova je besplatna:
            </Typography>
            <Typography> {order.baseFruitIsFree ? 'DA' : 'NE'}</Typography>
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
