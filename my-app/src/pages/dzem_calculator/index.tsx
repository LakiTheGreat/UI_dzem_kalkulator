import { Button, Divider, Stack, Typography } from '@mui/material';
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../components/FormProvider';
import RHFSelectInput from '../../components/RHFSelectInput';
import RHFTextInput from '../../components/RHFTextInput';
import { useSnackbar } from 'notistack';
import { cupTypes, fruits } from '../../constants';
import FormattedPrice from '../../utils/FormattedPrice';

type FormData = {
  numOfCups: number | string;
  typeOfCups: number | string;
  priceOfCups: number | string;
  fruits1: number | string;
  fruits2: number | string;
  fruits3: number | string;
  fruitsG1: number | string;
  fruitsG2: number | string;
  fruitsG3: number | string;
  fruitsPrice1: number | string;
  fruitsPrice2: number | string;
  fruitsPrice3: number | string;
  fruits1Total: number | string;
  fruits2Total: number | string;
  fruits3Total: number | string;
  orderNumberOfCups1: number | string;
  orderNumberOfCups2: number | string;
  orderTotal1: number | string;
  orderTotal2: number | string;
  orderCupType1: number | string;
  orderCupType2: number | string;
  fixedExpences: number | string;
  numOfCups1: number | string;
  typeOfCups1: number | string;
  priceOfCups1: number | string;
  additionalExpences: number | string;
  totalExpences: number | string;
  totalIncome: number | string;
  totalProfit: number | string;
  buyer: string;
  email: string;
};

export default function DzemCalculator() {
  const methods = useForm<FormData>({
    defaultValues: {
      numOfCups: '',
      typeOfCups: '35',
      priceOfCups: '',
      fruits1: '',
      fruits2: '',
      fruits3: '',
      fruitsG1: '',
      fruitsG2: '',
      fruitsG3: '',
      fruitsPrice1: '',
      fruitsPrice2: '',
      fruitsPrice3: '',
      fruits1Total: '',
      fruits2Total: '',
      fruits3Total: '',
      orderNumberOfCups1: '',
      orderNumberOfCups2: '',
      orderTotal1: '',
      orderTotal2: '',
      orderCupType1: '350',
      orderCupType2: '550',
      fixedExpences: '',
      numOfCups1: '',
      typeOfCups1: '46',
      priceOfCups1: '',
      additionalExpences: '',
      totalExpences: '',
      totalIncome: '',
      totalProfit: '',
      buyer: '',
      email: 'dusan.pantelic7@gmail.com',
    },
  });

  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, watch, setValue } = methods;
  const [isLoading, setIsLoading] = useState(false);

  const {
    numOfCups,
    typeOfCups,
    fruitsG1,
    fruitsPrice1,
    fruitsG2,
    fruitsPrice2,
    fruitsG3,
    fruitsPrice3,
    orderNumberOfCups1,
    orderNumberOfCups2,
    orderCupType1,
    orderCupType2,
    priceOfCups,
    fruits1Total,
    fruits2Total,
    fruits3Total,
    numOfCups1,
    typeOfCups1,
    priceOfCups1,
    fixedExpences,
    additionalExpences,
    totalExpences,
    orderTotal1,
    orderTotal2,
    totalIncome,
    totalProfit,
  } = watch();

  const formSubmit = (data: FormData) => {
    setIsLoading(true);
    const date = new Date();
    const formattedDateTime =
      date.toLocaleDateString('sr-RS') +
      ' ' +
      date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    emailjs
      .send(
        'service_prb7u5o', // from EmailJS dashboard
        'template_opdxwmi',
        {
          email: data.email,
          date: formattedDateTime,
          expences_cups: Number(data.priceOfCups) + Number(data.priceOfCups1),
          expences_fruits:
            Number(data.fruits1Total) +
            Number(data.fruits2Total) +
            Number(data.fruits3Total),
          expences_total: Number(data.totalExpences),
          income_total: Number(data.totalIncome),
          income_profit: Number(data.totalProfit),
          fruit_1_name: data.fruits1,
          fruit_1_g: data.fruitsG1,
          fruit_1_price: data.fruitsPrice1,
          fruit_1_total: data.fruits1Total,
          fruit_2_name: data.fruits2,
          fruit_2_g: data.fruitsG2,
          fruit_2_price: data.fruitsPrice2,
          fruit_2_total: data.fruits2Total,
          fruit_3_name: data.fruits3,
          fruit_3_g: data.fruitsG3,
          fruit_3_price: data.fruitsPrice3,
          fruit_3_total: data.fruits3Total,
          smallCups: data.orderNumberOfCups1,
          smallCups_total: data.orderTotal1,
          largeCups: data.orderNumberOfCups2,
          largeCups_total: data.orderTotal2,
          buyer: data.buyer,
        },
        'HknMoAEDVlbk1FCHp' // EmailJS user ID (public key)
      )
      .then(
        (result) => {
          setIsLoading(false);
          enqueueSnackbar('Email je uspešno poslat', {
            variant: 'success',
          });
        },
        (error) => {
          console.error('Email send error:', error.text);
          setIsLoading(false);
          enqueueSnackbar('Nešto ne radi - CIMAJ NIKOLU', {
            variant: 'error',
          });
        }
      );
  };

  useEffect(() => {
    setValue(
      'fixedExpences',
      (
        Number(priceOfCups) +
        Number(priceOfCups1) +
        Number(fruits1Total) +
        Number(fruits2Total) +
        Number(fruits3Total)
      ).toFixed(0)
    );
  }, [
    priceOfCups,
    priceOfCups1,
    fruits1Total,
    fruits2Total,
    fruits3Total,
    setValue,
  ]);

  useEffect(() => {
    setValue('totalProfit', Number(totalIncome) - Number(totalExpences));
  }, [totalExpences, totalIncome, setValue]);

  useEffect(() => {
    setValue('totalIncome', Number(orderTotal1) + Number(orderTotal2));
  }, [orderTotal1, orderTotal2, setValue]);

  useEffect(() => {
    setValue(
      'totalExpences',
      Number(additionalExpences) + Number(fixedExpences)
    );
  }, [fixedExpences, additionalExpences, setValue]);

  useEffect(() => {
    if (fixedExpences) {
      setValue('additionalExpences', Number(fixedExpences) * 0.25);
    }
  }, [fixedExpences, setValue]);

  useEffect(() => {
    if (numOfCups && typeOfCups) {
      setValue('priceOfCups', Number(numOfCups) * Number(typeOfCups));
    } else {
      setValue('priceOfCups', '');
    }
  }, [numOfCups, typeOfCups, setValue]);

  useEffect(() => {
    if (numOfCups1 && typeOfCups1) {
      setValue('priceOfCups1', Number(numOfCups1) * Number(typeOfCups1));
    }
  }, [numOfCups1, typeOfCups1, setValue]);

  useEffect(() => {
    if (fruitsG1 && fruitsPrice1) {
      setValue(
        'fruits1Total',
        (Number(fruitsPrice1) / 1000) * Number(fruitsG1)
      );
    } else {
      setValue('fruits1Total', '');
    }
  }, [fruitsG1, fruitsPrice1, setValue]);

  useEffect(() => {
    if (fruitsG2 && fruitsPrice2) {
      setValue(
        'fruits2Total',
        (Number(fruitsPrice2) / 1000) * Number(fruitsG2)
      );
    } else {
      setValue('fruits2Total', '');
    }
  }, [fruitsG2, fruitsPrice2, setValue]);

  useEffect(() => {
    if (fruitsG3 && fruitsPrice3) {
      setValue(
        'fruits3Total',
        (Number(fruitsPrice3) / 1000) * Number(fruitsG3)
      );
    } else {
      setValue('fruits3Total', '');
    }
  }, [fruitsG3, fruitsPrice3, setValue]);

  useEffect(() => {
    if (orderNumberOfCups1 && orderCupType1) {
      setValue(
        'orderTotal1',
        Number(orderNumberOfCups1) * Number(orderCupType1)
      );
    } else {
      setValue('orderTotal1', '');
    }
  }, [orderNumberOfCups1, orderCupType1, setValue]);

  useEffect(() => {
    if (orderNumberOfCups2 && orderCupType2) {
      setValue(
        'orderTotal2',
        Number(orderNumberOfCups2) * Number(orderCupType2)
      );
    } else {
      setValue('orderTotal2', '');
    }
  }, [orderNumberOfCups2, orderCupType2, setValue]);

  const profitMargin =
    Number(totalProfit) > 0 &&
    Number(totalExpences) > 0 &&
    Number(totalProfit) + Number(totalExpences) > 0
      ? (
          (Number(totalProfit) /
            (Number(totalProfit) + Number(totalExpences))) *
          100
        ).toFixed(0)
      : '0.00';

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Stack gap={3}>
        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Kupac
          </Typography>
          <RHFTextInput name='buyer' label='Ima kupca / naziv porudžbine' />
        </Stack>

        <Divider sx={{ bgcolor: ({ palette }) => palette.secondary.main }} />

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Troškovi
          </Typography>
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '33%' }}>
              <RHFTextInput name='numOfCups' label='Broj' type='number' />
            </Stack>

            <Stack
              sx={{ width: '33%' }}
              alignItems='center'
              justifyContent='center'
            >
              {/* <RHFSelectInput
                name='typeOfCups'
                label='Veličina'
                menuItems={cupTypes}
              /> */}
              <Stack alignItems='center'>
                <Typography>{`Veličina:`}</Typography>
                <Typography>{`${cupTypes[0].menuItemLabel}`}</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{ width: '33%' }}
              alignItems='center'
              justifyContent='center'
            >
              <Typography>{`Ukupno:`}</Typography>
              <FormattedPrice price={priceOfCups} />
            </Stack>
          </Stack>
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '33%' }}>
              <RHFTextInput name='numOfCups1' label='Broj' type='number' />
            </Stack>

            <Stack
              sx={{ width: '33%' }}
              alignItems='center'
              justifyContent='center'
            >
              {/* <RHFSelectInput
                name='typeOfCups1'
                label='Veličina'
                menuItems={cupTypes}
              /> */}
              <Stack alignItems='center'>
                <Typography>{`Veličina:`}</Typography>
                <Typography>{`${cupTypes[1].menuItemLabel}`}</Typography>
              </Stack>
            </Stack>

            <Stack
              sx={{ width: '33%' }}
              alignItems='center'
              justifyContent='center'
            >
              <Typography>{`Ukupno:`}</Typography>
              <FormattedPrice price={priceOfCups1} />
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ bgcolor: ({ palette }) => palette.secondary.main }} />

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          {/* PRVA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '33%' }}>
                <RHFSelectInput
                  name='fruits1'
                  label='Voće'
                  menuItems={fruits}
                />
              </Stack>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput name='fruitsG1' label='Gramaža' type='number' />
              </Stack>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput
                  name='fruitsPrice1'
                  label='Cena (KG)'
                  type='number'
                />
              </Stack>
            </Stack>

            <Stack direction='row' gap={1}>
              <Typography>{`Ukupno:`}</Typography>
              <FormattedPrice price={fruits1Total} />
            </Stack>
          </Stack>

          {/* DRUGA */}
          {fruitsG1 && typeof fruits1Total === 'number' && (
            <>
              <Divider variant='middle' />
              <Stack gap={2}>
                <Stack direction='row' gap={1}>
                  <Stack sx={{ width: '33%' }}>
                    <RHFSelectInput
                      name='fruits2'
                      label='Voće'
                      menuItems={fruits}
                    />
                  </Stack>
                  <Stack sx={{ width: '33%' }}>
                    <RHFTextInput
                      name='fruitsG2'
                      label='Gramaža'
                      type='number'
                    />
                  </Stack>
                  <Stack sx={{ width: '33%' }}>
                    <RHFTextInput
                      name='fruitsPrice2'
                      label='Cena (KG)'
                      type='number'
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction='row' gap={1}>
                <Typography>{`Ukupno:`}</Typography>
                <FormattedPrice price={fruits2Total} />
              </Stack>
            </>
          )}
          {/* TRECA */}
          {fruitsG2 && typeof fruits2Total === 'number' && (
            <>
              <Divider variant='middle' />
              <Stack gap={2}>
                <Stack direction='row' gap={1}>
                  <Stack sx={{ width: '33%' }}>
                    <RHFSelectInput
                      name='fruits3'
                      label='Voće'
                      menuItems={fruits}
                    />
                  </Stack>
                  <Stack sx={{ width: '33%' }}>
                    <RHFTextInput
                      name='fruitsG3'
                      label='Gramaža'
                      type='number'
                    />
                  </Stack>
                  <Stack sx={{ width: '33%' }}>
                    <RHFTextInput
                      name='fruitsPrice3'
                      label='Cena (KG)'
                      type='number'
                    />
                  </Stack>
                </Stack>
              </Stack>
              <Stack direction='row' gap={1}>
                <Typography>{`Ukupno:`}</Typography>
                <FormattedPrice price={fruits3Total} />
              </Stack>
            </>
          )}
        </Stack>

        <Divider sx={{ bgcolor: ({ palette }) => palette.secondary.main }} />

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Vrednost porudžbine
          </Typography>
          {/* PRVA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput
                  name='orderNumberOfCups1'
                  label='Broj'
                  type='number'
                />
              </Stack>
              <Stack
                sx={{ width: '33%' }}
                alignItems='center'
                justifyContent='center'
              >
                {/* <RHFSelectInput
                  name='orderCupType1'
                  label='Veličina'
                  menuItems={cupPrice}
                /> */}
                <Stack alignItems='center'>
                  <Typography>{`Veličina:`}</Typography>
                  <Typography>{`${cupTypes[0].menuItemLabel}`}</Typography>
                </Stack>
              </Stack>
              <Stack
                sx={{ width: '33%' }}
                alignItems='center'
                justifyContent='center'
              >
                <Typography>{`Ukupno:`}</Typography>
                <FormattedPrice price={orderTotal1} />
              </Stack>
            </Stack>
          </Stack>

          {/* DRUGA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput
                  name='orderNumberOfCups2'
                  label='Broj'
                  type='number'
                />
              </Stack>
              <Stack
                sx={{ width: '33%' }}
                alignItems='center'
                justifyContent='center'
              >
                {/* <RHFSelectInput
                  name='orderCupType2'
                  label='Veličina'
                  menuItems={cupPrice}
                /> */}
                <Stack alignItems='center'>
                  <Typography>{`Veličina:`}</Typography>
                  <Typography>{`${cupTypes[1].menuItemLabel}`}</Typography>
                </Stack>
              </Stack>
              <Stack
                sx={{ width: '33%' }}
                alignItems='center'
                justifyContent='center'
              >
                <Typography>{`Ukupno:`}</Typography>
                <FormattedPrice price={orderTotal2} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider sx={{ bgcolor: ({ palette }) => palette.secondary.main }} />

        {/* ----------------------------------------------------------------------- */}

        <Stack gap={1.5}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={3}
            sx={{ px: 1 }}
          >
            <Typography variant='body1'>Ukupni prihod:</Typography>
            <FormattedPrice price={totalIncome} />
          </Stack>
          <Divider variant='middle' />
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={3}
            sx={{ px: 1 }}
          >
            <Typography variant='body1'>Fiksni troškovi:</Typography>
            <FormattedPrice price={fixedExpences} isExpense={true} />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={3}
            sx={{ px: 1 }}
          >
            <Typography variant='body1'>Ostali troškovi (25%):</Typography>
            <FormattedPrice price={additionalExpences} isExpense={true} />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            gap={3}
            sx={{ px: 1, borderRadius: 1 }}
          >
            <Typography variant='body1'>Ukupni troškovi:</Typography>

            <FormattedPrice price={totalExpences} isExpense={true} />
          </Stack>

          <Divider variant='middle' />

          <Stack gap={1}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              gap={3}
              sx={{
                p: 1,
                border: `2px solid ${
                  Number(totalProfit) >= 0 ? 'lightGreen' : 'red'
                }`,
                borderRadius: 1,
              }}
            >
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {`${Number(totalProfit) >= 0 ? 'Profit:' : 'Gubitak:'}`}
              </Typography>
              <FormattedPrice price={totalProfit} isBold={true} />
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ p: 1 }}
            >
              <Typography variant='body1'>Profitna marža:</Typography>
              <Typography variant='body1'>{profitMargin}%</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider
          sx={{
            color: ({ palette }) => palette.secondary.main,
            bgcolor: ({ palette }) => palette.secondary.main,
            height: 2,
          }}
        />

        <Stack gap={3} sx={{ mt: 2 }}>
          <RHFTextInput name='email' label='Email' type='email' />
          <Button
            loading={isLoading}
            type='submit'
            variant='contained'
            sx={{
              fontWeight: 'bold',
            }}
            disabled={!totalIncome}
          >
            Pošalji mi na mejl
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
