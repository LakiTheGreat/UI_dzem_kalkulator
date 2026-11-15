import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import { Transaction } from '../../../types/transactions';
import TransactionCard from './TransactionCard';

type Props = {
  transactions: Transaction[];
  handleDelete: (id: number) => void;
  handleEdit: (id: number) => void;
  showActions?: boolean;
};

type DayGroup = {
  day: string;
  transactions: Transaction[];
  cupTotals: { label: string; quantity: number }[];
  commonNote: string | null;
};

const DAY_KEY_FORMAT = 'YYYY-MM-DD';
const CUP_SLOT_WIDTH = 96;

// A note is "common" when more than half of the day's transactions share it.
const getCommonNote = (transactions: Transaction[]): string | null => {
  const counts = new Map<string, number>();
  transactions.forEach(({ note }) => {
    const trimmed = note?.trim();
    if (trimmed) counts.set(trimmed, (counts.get(trimmed) ?? 0) + 1);
  });

  const [top] = Array.from(counts).sort((a, b) => b[1] - a[1]);
  return top && top[1] > transactions.length / 2 ? top[0] : null;
};

// Groups by the local calendar day of createdAt; keeps the incoming order.
const groupByDay = (transactions: Transaction[]): DayGroup[] => {
  const groups = new Map<string, Transaction[]>();

  transactions.forEach((transaction) => {
    const day = dayjs(transaction.createdAt).format(DAY_KEY_FORMAT);
    groups.set(day, [...(groups.get(day) ?? []), transaction]);
  });

  return Array.from(groups, ([day, items]) => {
    const totals = new Map<string, number>();
    items.forEach((transaction) =>
      transaction.cups.forEach((cup) => {
        if (!cup.label || cup.quantity <= 0) return;
        totals.set(cup.label, (totals.get(cup.label) ?? 0) + cup.quantity);
      })
    );

    return {
      day,
      transactions: items,
      commonNote: getCommonNote(items),
      cupTotals: Array.from(totals, ([label, quantity]) => ({
        label,
        quantity,
      })).sort((a, b) => parseInt(a.label, 10) - parseInt(b.label, 10)),
    };
  });
};

export default function TransactionDayGroups({
  transactions,
  handleDelete,
  handleEdit,
  showActions = true,
}: Props) {
  const groups = useMemo(() => groupByDay(transactions), [transactions]);
  // Every group gets the same slots (212ml left, 370ml right) so columns line up.
  const cupLabels = useMemo(
    () =>
      Array.from(
        new Set(groups.flatMap((g) => g.cupTotals.map((c) => c.label)))
      ).sort((a, b) => parseInt(a, 10) - parseInt(b, 10)),
    [groups]
  );

  return (
    <Stack gap={1}>
      {groups.map((group, index) => (
        <Accordion
          key={group.day}
          defaultExpanded={index === 0}
          disableGutters
          sx={{
            borderRadius: 1,
            boxShadow: '0 1px 2px rgba(0,0,0,0.2), 0 0 6px rgba(0,0,0,0.12)',
            '&:before': { display: 'none' },
          }}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 2 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              columnGap={3}
              rowGap={0.5}
              sx={{ width: '100%', pr: 1, justifyContent: 'space-between' }}
            >
              <Typography fontWeight='bold'>
                {dayjs(group.day).format('DD.MM.YYYY.')}
                {group.commonNote && ` · ${group.commonNote}`}
              </Typography>
              <Stack direction='row' columnGap={2}>
                {cupLabels.map((label) => {
                  const quantity = group.cupTotals.find(
                    (cup) => cup.label === label
                  )?.quantity;
                  return (
                    <Typography
                      key={label}
                      color='text.secondary'
                      sx={{ minWidth: CUP_SLOT_WIDTH }}
                    >
                      {quantity ? `${label}: ${quantity}` : ''}
                    </Typography>
                  );
                })}
              </Stack>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2 }}>
            <Grid container spacing={3}>
              {group.transactions.map((transaction) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={transaction.id}>
                  <TransactionCard
                    transaction={transaction}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    showActions={showActions}
                  />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
