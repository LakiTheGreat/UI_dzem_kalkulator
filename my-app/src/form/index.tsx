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

export default function Form() {
  const methods = useForm<FormData>({
    defaultValues: {
      numOfCups: ' ',
      typeOfCups: '',
      priceOfCups: '',
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const { numOfCups, typeOfCups } = watch();

  const formSubmit = async (data: FormData) => {
    console.log('ASD');
  };

  useEffect(() => {
    if (numOfCups && typeOfCups) {
      setValue('priceOfCups', Number(numOfCups) * Number(typeOfCups));
    }
  }, [numOfCups, typeOfCups, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
      <Stack gap={3}>
        <Stack gap={3}>
          <Typography variant='h5'>Troskovi teglica </Typography>
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
      </Stack>
    </FormProvider>
  );
}
