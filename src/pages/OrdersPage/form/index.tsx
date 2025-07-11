import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useGetAllCupCostsQuery } from '../../../api/cupCosts';
import FormProvider from '../../../components/FormProvider';
import FruitsForm from './FruitsForm';
import CupsForm from './CupsForm';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routes } from '../../../constants/routes';

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

export default function OrderForm() {
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
      <HeaderBreadcrumbs
        heading={'Porudžbine'}
        links={[
          {
            name: 'Pregled',
            href: `/${routes.orders}`,
          },
          {
            name: 'Nova porudžbina',
            href: `${routes.orders}/${routes.new}`,
          },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        <Stack gap={4}>
          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Troškovi
          </Typography>
          <FruitsForm />

          <Divider />

          <CupsForm cupCosts={cupCosts} />

          <Divider
            sx={{
              borderColor: 'secondary.main',
              bgcolor: 'secondary.main',
              height: 3,
            }}
          />

          <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
            Vrednost porudžbine
          </Typography>

          <Divider
            sx={{
              borderColor: 'secondary.main',
              bgcolor: 'secondary.main',
              height: 3,
            }}
          />

          <Button variant='contained' type='submit' size='large'>
            Sačuvaj
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}
