import { Container, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
} from '../../api/constantApi';
import FormProvider from '../../components/FormProvider';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import RHFTextInput from '../../components/RHFTextInput';
import { routes } from '../../constants/routes';
import FormattedPrice from '../../utils/FormattedPrice';
import { useAppSelector } from '../../hooks/reduxStoreHooks';

export default function Calculator() {
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: otherExpences, isLoading: otherExpenceIsLoading } =
    useGetOtherExpansesMarginQuery(userId || 0);
  const { data: profitMargin, isLoading: profitMarginIsLoading } =
    useGetProfitMarginQuery(userId || 0);

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

  const isLoading = otherExpenceIsLoading || profitMarginIsLoading;

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
          (Number(otherExpences?.value || 1) / 100) *
          (packageDifference ? Number(packageDifference) : 1)
      );
    }
  }, [setValue, basePrice, packageDifference, otherExpences?.value]);

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
      setValue(
        'profitMarginValue',
        Number(totalExpense) * ((profitMargin?.value || 1) / 100)
      );
    }
  }, [profitMargin?.value, setValue, totalExpense]);

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
    <Container maxWidth='sm'>
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
              <RHFTextInput
                name='basePrice'
                label='Ukuni fiksni troškovi'
                type='number'
              />
            </Stack>
            <Stack direction='row' gap={2}>
              <Stack gap={2} sx={{ flex: 1 }}>
                <RHFTextInput
                  name='totalWeight'
                  label='Ukupna masa (g)'
                  type='number'
                />
              </Stack>

              <Stack gap={2} sx={{ flex: 1 }}>
                <RHFTextInput
                  name='packageWeight'
                  label='Masa pakovanja (g)'
                  type='number'
                  disabled={!totalWeight}
                />
              </Stack>
            </Stack>
          </Stack>
          <Typography variant='caption'>
            Ukoliko se unese ukupna masa i masa pakovanja, troškovi i minimalna
            cena koštanja će automatski biti izračunata za uneto pakovanje.
          </Typography>
          <Divider />
          {isLoading && <Skeleton variant='rounded' height={240} />}
          {!isLoading && (
            <>
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
                  <Typography>{`Ostali troškovi ${otherExpences?.label} :`}</Typography>
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
                  <Typography>{`Profitna marža (${profitMargin?.label}):`}</Typography>
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
            </>
          )}
        </Stack>
      </FormProvider>
    </Container>
  );
}
