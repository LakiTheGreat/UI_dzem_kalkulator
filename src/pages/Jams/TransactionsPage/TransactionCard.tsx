import DeleteIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { ORDER_WIDTH } from '../../../constants';
import {
  Transaction,
  TransactionStatusStrings,
} from '../../../types/transactions';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import getStatusTranslation from '../../../utils/getStatusTranslation';

type Props = {
  transaction: Transaction;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
};

export default function TransactionCard({
  transaction,

  handleDelete,
  handleEdit,
}: Props) {
  const { palette } = useTheme();

  return (
    <Card
      key={transaction.id}
      variant='outlined'
      sx={{
        height: '100%',
        bgcolor: ` ${
          transaction.status === TransactionStatusStrings.SOLD
            ? `${palette.secondary.lighter}`
            : `${palette.error.lighter}`
        }`,
        // border: `1px solid ${
        //   order.baseFruitIsFree ? `${palette.success.dark}` : 'transparent'
        // }`,
      }}
    >
      <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
        <CardContent>
          <Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Napomena:</Typography>
              <Typography sx={{ width: ORDER_WIDTH }}>
                {transaction.note || '/'}
              </Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Vreme unosa:</Typography>
              <Typography>
                {formatLocalDateTime(transaction.createdAt)}
              </Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Džem:</Typography>
              <Typography
                sx={{
                  width: ORDER_WIDTH,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {transaction.orderType}
              </Typography>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Transakcija:</Typography>
              <Typography>
                {getStatusTranslation(transaction.status)}
              </Typography>
            </Stack>

            {transaction.cups
              .filter((cup) => cup.quantity > 0)
              .map((cup) => (
                <Stack direction='row' key={cup.label}>
                  <Typography sx={{ width: ORDER_WIDTH }}>
                    Teglica: {cup.label}
                  </Typography>
                  <Typography>{cup.quantity}</Typography>
                </Stack>
              ))}
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

            <IconButton onClick={() => handleEdit(transaction.id)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(transaction.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}
