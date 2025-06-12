import { Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormattedPrice from '../utils/FormattedPrice';
import FormProvider from './FormProvider';
import RHFAutoComplete, { MenuItemType } from './RHFAutoComplete';
import RHFTextInput from './RHFTextInput';

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
};

const cupTypes: MenuItemType[] = [
  {
    key: 1,
    value: 35,
    menuItemLabel: '212ml',
  },
  {
    key: 2,
    value: 46,
    menuItemLabel: '370ml',
  },
];

const cupPrice: MenuItemType[] = [
  {
    key: 1,
    value: 350,
    menuItemLabel: '212ml',
  },
  {
    key: 2,
    value: 550,
    menuItemLabel: '370ml',
  },
];

const fruits: MenuItemType[] = [
  {
    key: 1,
    value: 1,
    menuItemLabel: 'Jagode',
  },
  {
    key: 2,
    value: 2,
    menuItemLabel: 'Šljive',
  },
  {
    key: 3,
    value: 3,
    menuItemLabel: 'Pomorandže',
  },
  {
    key: 4,
    value: 4,
    menuItemLabel: 'Kajsije',
  },
];

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

  const formSubmit = async (data: FormData) => {};

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
      setValue('additionalExpences', Number(fixedExpences) * 0.15);
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
            Troškovi teglica
          </Typography>
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '35%' }}>
              <RHFTextInput name='numOfCups' label='Broj' type='number' />
            </Stack>

            <Stack sx={{ width: '35%' }}>
              <RHFAutoComplete
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
              <RHFAutoComplete
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
                <RHFAutoComplete
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
                <RHFAutoComplete
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
                <RHFAutoComplete
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
                <RHFAutoComplete
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
                <RHFAutoComplete
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
            <Typography>{`${fixedExpences} din`}</Typography>
          </Stack>

          <Stack direction='row' alignItems='center' gap={3} sx={{ px: 1 }}>
            <Typography variant='body1' sx={{ width: 200 }}>
              Ostali troškovi (15%):
            </Typography>
            <Typography>{`${additionalExpences} din`}</Typography>
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            gap={3}
            sx={{ bgcolor: 'lightblue', p: 1, borderRadius: 1 }}
          >
            <Typography variant='body1' sx={{ width: 200, fontWeight: 'bold' }}>
              UKUPNI TROŠKOVI:
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold' }}
            >{`${totalExpences} din`}</Typography>
          </Stack>
        </Stack>

        <Divider variant='middle' />

        <Stack gap={3}>
          <Stack direction='row' alignItems='center' gap={3} sx={{ px: 1 }}>
            <Typography variant='body1' sx={{ width: 200 }}>
              Ukupni prihodi:
            </Typography>
            <Typography>{`${totalIncome} din`}</Typography>
          </Stack>

          <Stack
            direction='row'
            alignItems='center'
            gap={3}
            sx={{ p: 1, bgcolor: 'lightGreen', borderRadius: 1 }}
          >
            <Typography variant='body1' sx={{ width: 200, fontWeight: 'bold' }}>
              UKUPNA ZARADA:
            </Typography>
            <Typography
              sx={{ fontWeight: 'bold' }}
            >{`${totalProfit} din`}</Typography>
          </Stack>
        </Stack>
        <Divider />
      </Stack>
    </FormProvider>
  );
}
