import { Stack, Typography } from '@mui/material';

import { Transaction } from '../../../types/transactions';

const CUP_SLOT_WIDTH = 96;

const byCupSize = (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10);

// Every day gets the same slots (212ml left, 370ml right) so columns line up.
export const getCupLabels = (transactions: Transaction[]): string[] =>
  Array.from(
    new Set(
      transactions.flatMap((t) =>
        t.cups.flatMap((c) => (c.label && c.quantity > 0 ? [c.label] : []))
      )
    )
  ).sort(byCupSize);

type Props = {
  transactions: Transaction[];
  labels: string[];
};

export default function CupTotalsSlots({ transactions, labels }: Props) {
  return (
    <Stack direction='row' columnGap={2}>
      {labels.map((label) => {
        const quantity = transactions
          .flatMap((t) => t.cups)
          .filter((c) => c.label === label)
          .reduce((sum, c) => sum + c.quantity, 0);

        return (
          <Typography
            key={label}
            color='text.secondary'
            sx={{ minWidth: CUP_SLOT_WIDTH }}
          >
            {quantity > 0 ? `${label}: ${quantity}` : ''}
          </Typography>
        );
      })}
    </Stack>
  );
}
