import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import { ORDER_WIDTH } from '../../../constants';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import { TomatoOrder } from '../../../types/tomatos';

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
              <Typography sx={{ width: ORDER_WIDTH }}>Vreme unosa:</Typography>
              <Typography>{formatLocalDateTime(order.createdAt)}</Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Broj teglica:</Typography>
              <Typography
                sx={{
                  width: ORDER_WIDTH,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {order.numOfCups}
              </Typography>
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
