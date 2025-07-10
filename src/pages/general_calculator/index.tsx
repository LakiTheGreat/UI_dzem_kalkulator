import { Container, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../components/FormProvider';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import RHFTextInput from '../../components/RHFTextInput';
import { routes } from '../../constants/routes';
import FormattedPrice from '../../utils/FormattedPrice';

export default function GeneralCalculator() {
  type FormData = {
    basePrice: number | string;
    totalWeight: number | string;
    packageWeight: number | string;
    fixedExpense: number | string;
    additionalExpense: number | string;
    totalExpense: number | string;
    profitMarginValue: number | string;
    minPrice: number | string;
    packageDifference: number | string;
  };

  const methods = useForm<FormData>({
    defaultValues: {
      basePrice: '',
      totalWeight: '',
      packageWeight: '',
      fixedExpense: '',
      additionalExpense: '',
      totalExpense: '',
      profitMarginValue: '',
      minPrice: '',
      packageDifference: '',
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const {
    basePrice,
    totalWeight,
    packageWeight,
    fixedExpense,
    packageDifference,
    additionalExpense,
    totalExpense,
    profitMarginValue,
    minPrice,
  } = watch();

  useEffect(() => {
    if (basePrice) {
      setValue(
        'fixedExpense',
        Number(basePrice) * (packageDifference ? Number(packageDifference) : 1)
      );
    } else {
      setValue('fixedExpense', '');
      setValue('additionalExpense', '');
      setValue('totalExpense', '');
      setValue('profitMarginValue', '');
      setValue('minPrice', '');
    }
  }, [setValue, basePrice, packageDifference]);

  useEffect(() => {
    if (basePrice) {
      setValue(
        'additionalExpense',
        Number(basePrice) *
          0.25 *
          (packageDifference ? Number(packageDifference) : 1)
      );
    }
  }, [setValue, basePrice, packageDifference]);

  useEffect(() => {
    if (fixedExpense && additionalExpense) {
      setValue(
        'totalExpense',
        Number(fixedExpense) + Number(additionalExpense)
      );
    }
  }, [setValue, fixedExpense, additionalExpense, packageDifference]);

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

  useEffect(() => {
    const value = Number(packageWeight) / Number(totalWeight);

    if (value !== Infinity) {
      setValue(
        'packageDifference',
        Number(packageWeight) / Number(totalWeight)
      );
    } else {
      setValue('fixedExpense', '');
      setValue('additionalExpense', '');
      setValue('totalExpense', '');
      setValue('profitMarginValue', '');
      setValue('minPrice', '');
      setValue('packageWeight', '');
    }
  }, [setValue, packageWeight, totalWeight]);

  const formSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Container maxWidth='md'>
      <HeaderBreadcrumbs
        heading={'Kalkulator cene'}
        links={[
          {
            name: 'Izračunaj minimalnu prodajnu cenu',
            href: routes.general_calculator,
          },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        <Stack gap={4}>
          <Stack gap={2} sx={{ py: 1 }}>
            <Stack gap={2}>
              <Typography>Ukupna cena sirovina:</Typography>
              <RHFTextInput
                name='basePrice'
                label='Ukupna cena'
                type='number'
              />
            </Stack>
            <Stack direction='row' gap={2}>
              <Stack gap={2} sx={{ flex: 1 }}>
                <Typography>Ukupna masa (g)</Typography>
                <RHFTextInput
                  name='totalWeight'
                  label='Ukupna masa (g)'
                  type='number'
                />
              </Stack>

              <Stack gap={2} sx={{ flex: 1 }}>
                <Typography>Masa pakovanja(g)</Typography>
                <RHFTextInput
                  name='packageWeight'
                  label='Masa pakovanja (g)'
                  type='number'
                  disabled={!totalWeight}
                />
              </Stack>
            </Stack>
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
              <FormattedPrice price={fixedExpense} isExpense={true} />
            </Stack>
            <Stack
              gap={1}
              direction='row'
              justifyContent='space-between'
              sx={{ p: 1 }}
            >
              <Typography>Ostali troškovi (25%):</Typography>
              <FormattedPrice price={additionalExpense} isExpense={true} />
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
              <FormattedPrice
                price={totalExpense}
                isBold={true}
                isExpense={true}
              />
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
    </Container>
  );
}
