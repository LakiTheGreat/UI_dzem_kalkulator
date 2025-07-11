import { Button, Container, Divider, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetAllCupCostsQuery } from '../../api/cupCosts';
import FormProvider from '../../components/FormProvider';
import CupsForm from './from/CupsForm';
import FruitsForm from './from/FruitsForm';

export type FruitItem = {
  fruitName: string;
  grams: string | number;
  price: string | number;
  total: string | number;
};

export type CupItem = {
  label: string;
  numberOf: number;
  value: number;
  total: number;
};

export type FormData = {
  fruits: FruitItem[];
  cups: CupItem[];
};

export default function NewForm() {
  const { data: cupCosts = [] } = useGetAllCupCostsQuery();

  const methods = useForm<FormData>({
    defaultValues: {
      fruits: [{ grams: '', price: '', total: '' }],
      cups: [],
    },
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (cupCosts.length > 0) {
      const defaultCups = cupCosts.map((cup) => ({
        label: cup.label,
        numberOf: 0,
        value: cup.value,
        total: 0,
      }));

      reset({
        fruits: [{ grams: '', price: '', total: '' }],
        cups: defaultCups,
      });
    }
  }, [cupCosts, reset]);

  const formSubmit = (data: FormData) => {
    console.log('Submitted:', data);
  };

  return (
    <Container maxWidth='sm'>
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        <Stack gap={4}>
          <FruitsForm />

          <Divider />

          <CupsForm cupCosts={cupCosts} />

          <Divider />

          <Button variant='contained' type='submit'>
            Sačuvaj
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}
