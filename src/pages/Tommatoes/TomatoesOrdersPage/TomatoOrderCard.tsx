import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { ORDER_WIDTH_55 } from '../../../constants';
import { Constant } from '../../../types/constants';
import { TomatoOrder } from '../../../types/tomatos';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import FormattedPrice from '../../../utils/FormattedPrice';
import { calculateProfitMargin } from '../../../utils/calculateProfitMargin';

type Props = {
  order: TomatoOrder;
  tomatoPrice: Constant | undefined;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function TomatoOrderCard({
  order,
  tomatoPrice,
  handleDelete,
  handleEdit,
}: Props) {
  const totalIncome = order.numOfCups * (tomatoPrice?.value || 0);
  const totalExpenses = order.numOfCups * order.totalExpenses;

  const profitMargin = calculateProfitMargin(totalIncome, totalExpenses);

  return (
    <Card
      key={order.id}
      variant='outlined'
      sx={{
        height: '100%',
      }}
    >
      <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
        <CardContent>
          <Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Vreme unosa:
              </Typography>
              <Typography>
                {formatLocalDateTime(order.createdAt || '')}
              </Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Broj teglica:
              </Typography>
              <Typography>{order.numOfCups}</Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Procenjen prihod:
              </Typography>
              <FormattedPrice price={totalIncome} />
            </Stack>

            <Stack direction='row' color='error.main'>
              <Typography
                sx={{
                  width: ORDER_WIDTH_55,
                  fontWeight: 'bold',
                }}
              >
                Rashod:
              </Typography>
              <FormattedPrice price={totalExpenses} isBold isExpense />
            </Stack>

            <Stack direction='row' color='success.dark'>
              <Typography sx={{ width: ORDER_WIDTH_55, fontWeight: 'bold' }}>
                Procenjen profit:
              </Typography>
              <FormattedPrice price={totalIncome - totalExpenses} isBold />
            </Stack>

            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Profitna marža:
              </Typography>
              <Typography>{profitMargin}%</Typography>
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
            <IconButton onClick={() => handleEdit(order.id)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(order.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}
