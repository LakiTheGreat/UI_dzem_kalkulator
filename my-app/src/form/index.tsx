import { useForm } from 'react-hook-form';
import FormProvider from './FormProvider';
import { Divider, Stack, Typography } from '@mui/material';
import RHFTextInput from './RHFTextInput';
import RHFAutoComplete, { MenuItemType } from './RHFAutoComplete';
import { useEffect } from 'react';

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
    value: 24,
    menuItemLabel: '212ml',
  },
  {
    key: 2,
    value: 27,
    menuItemLabel: '370ml',
  },
];

const cupPrice: MenuItemType[] = [
  {
    key: 1,
    value: 370,
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
    }
  }, [fruitsG1, fruitsPrice1, setValue]);
  useEffect(() => {
    if (fruitsG2 && fruitsPrice2) {
      setValue(
        'fruits2Total',
        (Number(fruitsPrice2) / 1000) * Number(fruitsG2)
      );
    }
  }, [fruitsG2, fruitsPrice2, setValue]);
  useEffect(() => {
    if (fruitsG3 && fruitsPrice3) {
      setValue(
        'fruits3Total',
        (Number(fruitsPrice3) / 1000) * Number(fruitsG3)
      );
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
        <Stack gap={3}>
          <Typography variant='h5'>Troškovi teglica </Typography>
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '35%' }}>
              <RHFTextInput name='numOfCups' label='Broj tegli' type='number' />
            </Stack>

            <Stack sx={{ width: '35%' }}>
              <RHFAutoComplete
                name='typeOfCups'
                label='Velicina tegle'
                menuItems={cupTypes}
              />
            </Stack>

            <Stack sx={{ width: '30%' }}>
              <RHFTextInput
                name='priceOfCups'
                label='Ukupno'
                disabled={true}
                showCurrency={true}
              />
            </Stack>
          </Stack>
          <Divider />
          <Stack gap={1} direction={'row'}>
            <Stack sx={{ width: '35%' }}>
              <RHFTextInput
                name='numOfCups1'
                label='Broj tegli'
                type='number'
              />
            </Stack>

            <Stack sx={{ width: '35%' }}>
              <RHFAutoComplete
                name='typeOfCups1'
                label='Velicina tegle'
                menuItems={cupTypes}
              />
            </Stack>

            <Stack sx={{ width: '30%' }}>
              <RHFTextInput
                name='priceOfCups1'
                label='Ukupno'
                disabled={true}
                showCurrency={true}
              />
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Stack gap={3}>
          <Typography variant='h5'>Troškovi voća</Typography>

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
            <RHFTextInput
              name='fruits1Total'
              label='Ukupno'
              disabled={true}
              showCurrency={true}
            />
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
            <RHFTextInput
              name='fruits2Total'
              label='Ukupno'
              disabled={true}
              showCurrency={true}
            />
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
            <RHFTextInput
              name='fruits3Total'
              label='Ukupno'
              disabled={true}
              showCurrency={true}
            />
          </Stack>
        </Stack>

        <Divider />
        <Stack gap={3}>
          <Typography variant='h5'>Vrednost porudžbine</Typography>
          {/* PRVA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '28%' }}>
                <RHFTextInput name='orderNumberOfCups1' label='Broj teglica' />
              </Stack>
              <Stack sx={{ width: '45%' }}>
                <RHFAutoComplete
                  name='orderCupType1'
                  label='Velicina teglice'
                  menuItems={cupPrice}
                />
              </Stack>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput
                  name='orderTotal1'
                  label='Ukupno'
                  showCurrency={true}
                  disabled={true}
                />
              </Stack>
            </Stack>
          </Stack>

          {/* DRUGA */}
          <Stack gap={2}>
            <Stack direction='row' gap={1}>
              <Stack sx={{ width: '28%' }}>
                <RHFTextInput
                  name='orderNumberOfCups2'
                  label='Broj teglica'
                  type='number'
                />
              </Stack>
              <Stack sx={{ width: '45%' }}>
                <RHFAutoComplete
                  name='orderCupType2'
                  label='Velicina teglice'
                  menuItems={cupPrice}
                />
              </Stack>
              <Stack sx={{ width: '33%' }}>
                <RHFTextInput
                  name='orderTotal2'
                  label='Ukupno'
                  showCurrency={true}
                  disabled={true}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Typography variant='h5'>Troškovi</Typography>
        <Stack gap={3}>
          <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='body1' sx={{ width: 150 }}>
              Fiksni troškovi:
            </Typography>
            <RHFTextInput
              name='fixedExpences'
              label='Fiksni troskovi'
              showCurrency={true}
              disabled={true}
            />
          </Stack>

          <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='body1' sx={{ width: 150 }}>
              Ostali troškovi:
            </Typography>
            <RHFTextInput
              name='additionalExpences'
              label='Ostali troskovi'
              showCurrency={true}
              disabled={true}
            />
          </Stack>

          <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='body1' sx={{ width: 150, fontWeight: 'bold' }}>
              UKUPNO:
            </Typography>
            <RHFTextInput
              name='totalExpences'
              label='UKUPNO'
              showCurrency={true}
              disabled={true}
            />
          </Stack>
        </Stack>

        <Typography variant='h5'>Prihod</Typography>
        <Stack gap={3}>
          <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='body1' sx={{ width: 150 }}>
              Ukupni prihodi:
            </Typography>
            <RHFTextInput
              name='totalIncome'
              label='Ukupni prihod'
              showCurrency={true}
              disabled={true}
            />
          </Stack>

          <Stack direction='row' alignItems='center' gap={3}>
            <Typography variant='body1' sx={{ width: 150, fontWeight: 'bold' }}>
              UKUPNA ZARADA:
            </Typography>
            <RHFTextInput
              name='totalProfit'
              label='UKUPNA ZARADA'
              showCurrency={true}
              disabled={true}
            />
          </Stack>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
