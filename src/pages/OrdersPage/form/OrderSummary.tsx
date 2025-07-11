import { Divider, Stack, Typography } from '@mui/material';

import FormattedPrice from '../../../utils/FormattedPrice';
import { CupItem } from '.';

type CupCost = {
  label: string;
  value: number;
};

type Props = {
  cupCosts: CupCost[];
  cupValues: CupCost[];
  cups: CupItem[];
  totalOrderPrice: number;
  totalFruitPrice: number;
  totalCupPrice: number;
  otherExpenses: number;
  totalExpenses: number;
  profit: number;
  profitMargin: number;
  otherExpansesMargin?: { label: string };
};

export default function OrderSummary({
  cupCosts,
  cupValues,
  cups,
  totalOrderPrice,
  totalFruitPrice,
  totalCupPrice,
  otherExpenses,
  totalExpenses,
  profit,
  profitMargin,
  otherExpansesMargin,
}: Props) {
  return (
    <Stack gap={1}>
      {cupCosts.map((cost, index) => {
        const numberOf = Number(cups[index]?.numberOf ?? 0);
        const valueMatch = cupValues.find((val) => val.label === cost.label);
        const cupValue = Number(valueMatch?.value ?? 0);
        const total = numberOf * cupValue;

        return (
          <Stack
            key={cost.label}
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography>
              {numberOf} × {cupValue} RSD ({cost.label})
            </Typography>
            <FormattedPrice price={total} />
          </Stack>
        );
      })}

      <Divider />

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography fontWeight='bold'>Prihodi:</Typography>
        <FormattedPrice price={totalOrderPrice} isBold />
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography>Troškovi voća:</Typography>
        <FormattedPrice price={totalFruitPrice} isExpense />
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography>Troškovi teglica:</Typography>
        <FormattedPrice price={totalCupPrice} isExpense />
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography>{`Ostali troškovi (${otherExpansesMargin?.label})`}</Typography>
        <FormattedPrice price={otherExpenses} isExpense />
      </Stack>

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ color: 'error.main' }}
      >
        <Typography fontWeight='bold'>Rashodi:</Typography>
        <FormattedPrice price={totalExpenses} isExpense isBold />
      </Stack>

      <Divider />

      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ color: 'success.dark' }}
      >
        <Typography fontWeight='bold'>Profit</Typography>
        <FormattedPrice price={profit} isBold />
      </Stack>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography>Profitna marža:</Typography>
        <Typography>{`${profitMargin}%`}</Typography>
      </Stack>
    </Stack>
  );
}
