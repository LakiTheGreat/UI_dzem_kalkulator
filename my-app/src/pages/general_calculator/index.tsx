import { useForm } from 'react-hook-form';
import FormProvider from '../../components/FormProvider';
import { Divider, Stack, Typography } from '@mui/material';
import RHFTextInput from '../../components/RHFTextInput';
import FormattedPrice from '../../utils/FormattedPrice';
import { useEffect } from 'react';

export default function GeneralCalculator() {
  type FormData = {
    fixedExpense: number | string;
    additionalExpense: number | string;
    totalExpense: number | string;
    profitMarginValue: number | string;
    minPrice: number | string;
  };

  const methods = useForm<FormData>({
    defaultValues: {
      fixedExpense: '',
      additionalExpense: '',
      totalExpense: '',
      profitMarginValue: '',
      minPrice: '',
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const {
    fixedExpense,
    additionalExpense,
    totalExpense,
    profitMarginValue,
    minPrice,
  } = watch();

  useEffect(() => {
    if (fixedExpense) {
      setValue('additionalExpense', Number(fixedExpense) * 0.25);
    }
  }, [setValue, fixedExpense]);

  useEffect(() => {
    if (fixedExpense && additionalExpense) {
      setValue(
        'totalExpense',
        Number(fixedExpense) + Number(additionalExpense)
      );
    }
  }, [setValue, fixedExpense, additionalExpense]);

  useEffect(() => {
    if (totalExpense) {
      setValue('profitMarginValue', Number(totalExpense) * 0.5);
    }
  }, [setValue, totalExpense]);

  useEffect(() => {
    if (totalExpense && profitMarginValue) {
      setValue('minPrice', Number(totalExpense) + Number(profitMarginValue));
    }
  }, [setValue, totalExpense, profitMarginValue]);

  const formSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Stack gap={4}>
        <Stack gap={2}>
          <Typography>Ukupna cena sirovina:</Typography>
          <RHFTextInput name='fixedExpense' label='Ukupna cena' type='number' />
        </Stack>
        <Divider />
        <Stack>
          <Stack
            gap={1}
            direction='row'
            justifyContent='space-between'
            sx={{ p: 1 }}
          >
            <Typography>Fiksni troškovi:</Typography>
            <FormattedPrice price={fixedExpense} />
          </Stack>
          <Stack
            gap={1}
            direction='row'
            justifyContent='space-between'
            sx={{ p: 1 }}
          >
            <Typography>Ostali troškovi (25%):</Typography>
            <FormattedPrice price={additionalExpense} />
          </Stack>
          <Stack
            gap={1}
            direction='row'
            justifyContent='space-between'
            sx={{
              border: `2px solid ${'red'}`,
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Ukupni troškovi :
            </Typography>
            <FormattedPrice price={totalExpense} isBold={true} />
          </Stack>
        </Stack>
        <Stack>
          <Stack
            gap={1}
            direction='row'
            justifyContent='space-between'
            sx={{ p: 1 }}
          >
            <Typography>Profitna marža (50%):</Typography>
            <FormattedPrice price={profitMarginValue} />
          </Stack>
          <Stack
            gap={1}
            direction='row'
            justifyContent='space-between'
            sx={{
              border: `2px solid ${'lightgreen'}`,
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography sx={{ fontWeight: 'bold' }}>
              Minimalna cena koštanja:
            </Typography>
            <FormattedPrice price={minPrice} isBold={true} />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
