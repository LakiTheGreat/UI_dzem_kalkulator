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
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import { TomatoOrder } from '../../../types/tomatos';
import FormattedPrice from '../../../utils/FormattedPrice';

type Props = {
  order: TomatoOrder;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function TomatoOrderCard({
  order,

  handleDelete,
  handleEdit,
}: Props) {
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
              <Typography>{formatLocalDateTime(order.createdAt)}</Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Broj teglica:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {order.numOfCups}
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Troškovi po teglici:
              </Typography>
              <FormattedPrice price={order.totalExpenses} />
            </Stack>

            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH_55 }}>
                Ukupni troškovi:
              </Typography>
              <FormattedPrice price={order.numOfCups * order.totalExpenses} />
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
