import { BouquetTransactionEnum } from '../types/bouguets';
import { TransactionStatusStrings } from '../types/transactions';

export default function getStatusTranslation(
  status: TransactionStatusStrings | BouquetTransactionEnum
) {
  if (status === TransactionStatusStrings.CONSUMED) {
    return 'Potrošeno';
  }

  if (status === TransactionStatusStrings.SOLD) {
    return 'Prodato';
  }

  if (status === TransactionStatusStrings.GIVEN_AWAY) {
    return 'Poklon';
  }

  if (status === TransactionStatusStrings.PROMOTION) {
    return 'Promocija';
  }

  if (status === TransactionStatusStrings.OTHER) {
    return 'Ostalo';
  }

  return 'Ostalo - nema statusa';
}
