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
  } = watch();

  const formSubmit = async (data: FormData) => {
    console.log('ASD');
  };

  useEffect(() => {
    if (numOfCups && typeOfCups) {
      setValue('priceOfCups', Number(numOfCups) * Number(typeOfCups));
    }
  }, [numOfCups, typeOfCups, setValue]);

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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Stack gap={3}>
        <Stack gap={3}>
          <Typography variant='h5'>Troškovi teglica </Typography>
          <RHFTextInput name='numOfCups' label='Broj tegli' type='number' />
          <RHFAutoComplete
            name='typeOfCups'
            label='Velicina tegle'
            menuItems={cupTypes}
          />
          <RHFTextInput
            name='priceOfCups'
            label='Ukupni troškovi'
            disabled={true}
            showCurrency={true}
          />
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
                <RHFTextInput name='fruitsG1' label='Gramaža             ' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsPrice1' label='Cena (KG)' />
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
                <RHFTextInput name='fruitsG2' label='Gramaža             ' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsPrice2' label='Cena (KG)' />
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
                <RHFTextInput name='fruitsG3' label='Gramaža             ' />
              </Stack>
              <Stack sx={{ width: '30%' }}>
                <RHFTextInput name='fruitsPrice3' label='Cena (KG)' />
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
      </Stack>
    </FormProvider>
  );
}
