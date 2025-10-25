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
  useTheme,
} from '@mui/material';

import { ORDER_WIDTH } from '../../../constants';
import {
  BouquetTransaction,
  BouquetTransactionEnum,
} from '../../../types/bouguets';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import FormattedPrice from '../../../utils/FormattedPrice';
import getStatusTranslation from '../../../utils/getStatusTranslation';

type Props = {
  transaction: BouquetTransaction;
  handleDelete: (bouquet: BouquetTransaction) => void;
  handleEdit: (id: number) => void;
};

export default function BouquetTransactionCard({
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
          transaction.status === BouquetTransactionEnum.SOLD
            ? `${palette.secondary.lighter}`
            : `${palette.error.lighter}`
        }`,
        border: `1px solid ${`${palette.primary.main}`}`,
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
              <Typography sx={{ width: ORDER_WIDTH }}>Transakcija:</Typography>
              <Typography>
                {getStatusTranslation(transaction.status)}
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>Cena buketa:</Typography>
              <FormattedPrice price={transaction.income} />
            </Stack>
            <Stack direction='row' color='primary.main'>
              <Typography sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}>
                Ukupni troškovi:
              </Typography>
              <Stack sx={{ ml: -1.4 }}>
                <FormattedPrice
                  price={transaction.totalExpense}
                  isExpense
                  isBold
                />
              </Stack>
            </Stack>

            <Stack direction='row' color='success.dark'>
              <Typography sx={{ width: ORDER_WIDTH, fontWeight: 'bold' }}>
                Profit:
              </Typography>
              <Stack>
                <FormattedPrice price={transaction.profit} isBold />
              </Stack>
            </Stack>
            <Stack direction='row'>
              <Typography sx={{ width: ORDER_WIDTH }}>
                Profitna marža:
              </Typography>
              <Stack>
                <Typography sx={{ width: ORDER_WIDTH }}>
                  {transaction.profitMargin}%
                </Typography>
              </Stack>
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

            <IconButton onClick={() => handleEdit(transaction.id)}>
              <EditIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(transaction)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}
