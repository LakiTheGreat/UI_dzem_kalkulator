import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import CardActionButtons from '../../../components/CardActionButtons';
import { ORDER_WIDTH_55 } from '../../../constants';
import { Constant } from '../../../types/constants';
import { TomatoTransaction } from '../../../types/tomatos';
import { TransactionStatusStrings } from '../../../types/transactions';
import FormattedPrice from '../../../utils/FormattedPrice';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';
import getStatusTranslation from '../../../utils/getStatusTranslation';

type Props = {
  transaction: TomatoTransaction;
  tomatoExpence: Constant | undefined;
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  showActions?: boolean;
};

export default function TomatoTransactionCard({
  transaction,
  handleDelete,
  handleEdit,
  tomatoExpence,
  showActions = true,
}: Props) {
  const { palette } = useTheme();

  const isPositive =
    transaction.numOfCups * transaction.pricePerCup >
    (tomatoExpence?.value || 0);
  const isSold = transaction.status === TransactionStatusStrings.SOLD;

  return (
    <Card
      key={transaction.id}
      variant='outlined'
      sx={{
        height: '100%',
        bgcolor: ` ${
          isSold ? `${palette.secondary.lighter}` : `${palette.error.lighter}`
        }`,
      }}
    >
      <Stack sx={{ height: '100%', justifyContent: 'space-between' }}>
        <CardContent>
          <Stack gap={2}>
            <Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>
                  Napomena:
                </Typography>
                <Typography>{transaction.note || '/'}</Typography>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>
                  Vreme unosa:
                </Typography>
                <Typography>
                  {formatLocalDateTime(transaction.createdAt || '')}
                </Typography>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>
                  Transakcija:
                </Typography>
                <Typography>
                  {getStatusTranslation(transaction.status)}
                </Typography>
              </Stack>
            </Stack>

            <Divider />

            <Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>
                  Broj teglica od {transaction.label}:
                </Typography>
                <Typography>{transaction.numOfCups}</Typography>
              </Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>
                  Teglica prodata za:
                </Typography>
                <FormattedPrice price={transaction.pricePerCup} />
              </Stack>

              <Stack
                direction='row'
                // sx={{
                //   color: isPositive && isSold ? 'success.dark' : 'error.main',
                // }}
              ></Stack>
            </Stack>

            <Divider />
            <Stack>
              <Stack direction='row'>
                <Typography sx={{ width: ORDER_WIDTH_55 }}>Prihod:</Typography>
                <FormattedPrice
                  price={transaction.numOfCups * transaction.pricePerCup}
                />
              </Stack>

              <Stack direction='row' sx={{ color: 'error.main' }}>
                <Typography sx={{ width: ORDER_WIDTH_55, fontWeight: 'bold' }}>
                  Procenjeni troškovi:
                </Typography>
                <Stack sx={{ ml: -1.3 }}>
                  <FormattedPrice
                    isBold
                    isExpense
                    price={transaction.numOfCups * (tomatoExpence?.value || 0)}
                  />
                </Stack>
              </Stack>

              <Stack
                direction='row'
                sx={{ color: isPositive ? 'success.dark' : 'error.main' }}
              >
                <Typography sx={{ width: ORDER_WIDTH_55, fontWeight: 'bold' }}>
                  Procenjeni profit:
                </Typography>
                <Stack sx={{ ml: isPositive ? 0 : -1.3 }}>
                  <FormattedPrice
                    isBold
                    price={
                      transaction.numOfCups * transaction.pricePerCup -
                      transaction.numOfCups * (tomatoExpence?.value || 0)
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>

        <CardActionButtons
          show={showActions}
          onEdit={() => handleEdit(transaction.id)}
          onDelete={() => handleDelete(transaction.id)}
        />
      </Stack>
    </Card>
  );
}
