import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

import FormattedPrice from '../utils/FormattedPrice';
import FormProvider from './FormProvider';
import RHFSelectInput from './RHFSelectInput';
import RHFTextInput from './RHFTextInput';
import { colors, cupPrice, cupTypes, fruits } from '../constants';

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

export default function Form() {
  const methods = useForm<FormData>({
    defaultValues: {
      numOfCups: ' ',
      typeOfCups: '',
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
      orderCupType1: '',
      orderCupType2: '',
      fixedExpences: '',
      numOfCups1: '',
      typeOfCups1: '',
      priceOfCups1: '',
      additionalExpences: '',
      totalExpences: '',
      totalIncome: '',
      totalProfit: '',
      buyer: '',
      email: 'dusan.pantelic7@gmail.com',
    },
  });

  const { handleSubmit, watch, setValue } = methods;

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

  const formSubmit = async (data: FormData) => {
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
          expences_cups: 110,
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
          console.log('Email sent:', result.text);
          alert('Email je uspešno poslat!');
        },
        (error) => {
          console.error('Email send error:', error.text);
          alert('Nešto ne radi - cimaj Nikolu.');
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
      setValue('additionalExpences', Number(fixedExpences) * 0.2);
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
    }
  }, [orderNumberOfCups1, orderCupType1, setValue]);

  useEffect(() => {
    if (orderNumberOfCups2 && orderCupType2) {
      setValue(
        'orderTotal2',
        Number(orderNumberOfCups2) * Number(orderCupType2)
      );
    }
  }, [orderNumberOfCups2, orderCupType2, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Stack gap={3}>
        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Kupac
          </Typography>
          <RHFTextInput name='buyer' label='Kupac' />
        </Stack>

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Troškovi teglica
          </Typography>
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '35%' }}>
              <RHFTextInput name='numOfCups' label='Broj' type='number' />
            </Stack>

            <Stack sx={{ width: '35%' }}>
              <RHFSelectInput
                name='typeOfCups'
                label='Veličina'
                menuItems={cupTypes}
              />
            </Stack>

            <Stack
              sx={{ width: '30%' }}
              alignItems='center'
              justifyContent='center'
            >
              <Typography>{`Ukupno:`}</Typography>
              <FormattedPrice price={priceOfCups} />
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '35%' }}>
              <RHFTextInput name='numOfCups1' label='Broj' type='number' />
            </Stack>

            <Stack sx={{ width: '35%' }}>
              <RHFSelectInput
                name='typeOfCups1'
                label='Veličina'
                menuItems={cupTypes}
              />
            </Stack>

            <Stack
              sx={{ width: '30%' }}
              alignItems='center'
              justifyContent='center'
            >
              <Typography>{`Ukupno:`}</Typography>
              <FormattedPrice price={priceOfCups1} />
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Troškovi voća
          </Typography>
          {/* PRVA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '40%' }}>
                <RHFSelectInput
                  name='fruits1'
                  label='Vrsta voća'
                  menuItems={fruits}
                />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsG1' label='Gramaža' type='number' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
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
          <Divider />
          {/* DRUGA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '40%' }}>
                <RHFSelectInput
                  name='fruits2'
                  label='Vrsta voća'
                  menuItems={fruits}
                />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsG2' label='Gramaža' type='number' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
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
          <Divider />
          {/* TRECA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '40%' }}>
                <RHFSelectInput
                  name='fruits3'
                  label='Vrsta voća'
                  menuItems={fruits}
                />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsG3' label='Gramaža' type='number' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
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
        </Stack>

        <Divider />

        {/* ----------------------------------------------------------------------- */}
        <Stack gap={3}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Vrednost porudžbine
          </Typography>
          {/* PRVA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '28%' }}>
                <RHFTextInput
                  name='orderNumberOfCups1'
                  label='Broj'
                  type='number'
                />
              </Stack>
              <Stack sx={{ width: '45%' }}>
                <RHFSelectInput
                  name='orderCupType1'
                  label='Veličina'
                  menuItems={cupPrice}
                />
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
              <Stack sx={{ width: '28%' }}>
                <RHFTextInput
                  name='orderNumberOfCups2'
                  label='Broj'
                  type='number'
                />
              </Stack>
              <Stack sx={{ width: '45%' }}>
                <RHFSelectInput
                  name='orderCupType2'
                  label='Veličina'
                  menuItems={cupPrice}
                />
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

        <Divider />

        {/* ----------------------------------------------------------------------- */}
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Presek
        </Typography>
        <Stack gap={3}>
          <Stack direction='row' alignItems='center' gap={3} sx={{ px: 1 }}>
            <Typography variant='body1' sx={{ width: 200 }}>
              Fiksni troškovi:
            </Typography>
            <FormattedPrice price={fixedExpences} />
          </Stack>

          <Stack direction='row' alignItems='center' gap={3} sx={{ px: 1 }}>
            <Typography variant='body1' sx={{ width: 200 }}>
              Ostali troškovi (20%):
            </Typography>
            <FormattedPrice price={additionalExpences} />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            gap={3}
            sx={{ border: '2px solid lightblue', p: 1, borderRadius: 1 }}
          >
            <Typography variant='body1' sx={{ width: 200, fontWeight: 'bold' }}>
              UKUPNI TROŠKOVI:
            </Typography>
            <FormattedPrice price={totalExpences} />
          </Stack>
        </Stack>

        <Divider variant='middle' />

        <Stack gap={3}>
          <Stack direction='row' alignItems='center' gap={3} sx={{ px: 1 }}>
            <Typography variant='body1' sx={{ width: 200 }}>
              Ukupni prihodi:
            </Typography>
            <FormattedPrice price={totalIncome} />
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            gap={3}
            sx={{ p: 1, border: '2px solid lightGreen', borderRadius: 1 }}
          >
            <Typography variant='body1' sx={{ width: 200, fontWeight: 'bold' }}>
              UKUPNA ZARADA:
            </Typography>
            <FormattedPrice price={totalProfit} />
          </Stack>
        </Stack>

        <Divider
          sx={{
            color: colors.secondary,
            bgcolor: colors.secondary,
            height: 2,
          }}
        />

        <Stack gap={3}>
          <RHFTextInput name='email' label='Email' />
          <Button
            type='submit'
            variant='contained'
            sx={{ fontWeight: 'bold', bgcolor: colors.main }}
          >
            Pošalji mi na mejl
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
