import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CupItem } from '..';
import RHFTextInput from '../../../../../components/RHFTextInput';
import { CupWithPriceData } from '../../../../../types/cups';
import FormattedPrice from '../../../../../utils/FormattedPrice';

type Props = {
  cupsWithData?: CupWithPriceData[];
};

export default function CupsForm({ cupsWithData }: Props) {
  const { register, setValue, control } = useFormContext<{ cups: CupItem[] }>();

  const cups = useWatch({
    control,
    name: 'cups',
  });
  useEffect(() => {
    if (!cupsWithData?.length) return;
    if (!cups?.length) return;

    cups.forEach((cup, index) => {
      const num = cup.numberOf ?? 0;
      const price = cupsWithData[index]?.cost ?? 0;
      const total = num * price;

      const currentTotal = cup.total ?? 0;

      if (currentTotal !== total) {
        setValue(`cups.${index}.total`, total, {
          shouldValidate: false,
          shouldDirty: false,
        });
      }
    });
  }, [cups, cupsWithData, setValue]);

  return (
    <Stack spacing={2}>
      {cupsWithData?.map((cup, index) => (
        <Stack direction='row' spacing={2} alignItems='center' key={cup.id}>
          <Stack sx={{ flex: 1 }}>
            <RHFTextInput
              type='number'
              label='Broj teglica'
              {...register(`cups.${index}.numberOf`)}
            />
          </Stack>
          <Stack sx={{ flex: 1 }} alignItems='center'>
            <Typography>{`${cup.label}`}</Typography>
            <FormattedPrice price={cup.cost} />
          </Stack>
          <Stack sx={{ flex: 1 }} alignItems='center'>
            <Typography>Ukupno:</Typography>
            <FormattedPrice price={cups[index]?.total} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
