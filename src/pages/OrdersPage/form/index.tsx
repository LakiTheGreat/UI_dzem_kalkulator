import {
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useGetOtherExpansesMarginQuery } from '../../../api/constantApi';
import { useGetAllCupCostsQuery } from '../../../api/cupCosts';
import { useGetAllCupValuesQuery } from '../../../api/cupValues';
import FormProvider from '../../../components/FormProvider';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import RHFTextInput from '../../../components/RHFTextInput';
import { routes } from '../../../constants/routes';
import CupsForm from './CupsForm';
import FruitsForm from './FruitsForm';
import OrderSummary from './OrderSummary';

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
  orderName: string;
  fruits: FruitItem[];
  cups: CupItem[];
};

export default function OrderForm() {
  const { data: cupCosts = [], isLoading: cupCostsLoading } =
    useGetAllCupCostsQuery();
  const { data: cupValues = [], isLoading: cupValuesLoading } =
    useGetAllCupValuesQuery();
  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery();

  const isLoading =
    cupCostsLoading || cupValuesLoading || otherExpansesMarginLoading;

  const methods = useForm<FormData>({
    defaultValues: {
      orderName: '',
      fruits: [{ grams: '', price: '', total: '' }],
      cups: [],
    },
  });

  const { handleSubmit, reset, control } = methods;

  const cups = useWatch({ control, name: 'cups' });
  const fruits = useWatch({ control, name: 'fruits' });

  const totalCupPrice = cupCosts.reduce((acc, cost, index) => {
    const numberOf = Number(cups[index]?.numberOf ?? 0);
    const cupCost = Number(cost.value ?? 0); // this is the COST
    return acc + numberOf * cupCost;
  }, 0);

  const totalFruitPrice = fruits.reduce((acc, fruit) => {
    const total = Number(fruit.total ?? 0);
    return acc + total;
  }, 0);

  const totalOrderPrice = cupCosts
    .reduce((acc, cost, index) => {
      const numberOf = Number(cups[index]?.numberOf ?? 0);
      const cupValue = Number(
        cupValues.find((val) => val.label === cost.label)?.value ?? 0
      );
      return acc + numberOf * cupValue;
    }, 0)
    .toFixed(2);

  const otherExpenses =
    Number(totalFruitPrice + totalCupPrice) *
    ((otherExpansesMargin?.value || 1) / 100);

  const totalExpenses = totalFruitPrice + totalCupPrice + otherExpenses;

  const profit = Number(totalOrderPrice) - totalExpenses;
  const profitMargin = (
    Number(totalOrderPrice) > 0 ? (profit / Number(totalOrderPrice)) * 100 : 0
  ).toFixed(0);

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
        {isLoading && <Skeleton height='70vh' variant='rounded' />}
        {!isLoading && (
          <Stack gap={4}>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Naziv porudžbine
            </Typography>

            <RHFTextInput name='orderName' label='Naziv porudžbine' />

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

            <OrderSummary
              cupCosts={cupCosts}
              cupValues={cupValues}
              cups={cups}
              totalOrderPrice={Number(totalOrderPrice)}
              totalFruitPrice={totalFruitPrice}
              totalCupPrice={totalCupPrice}
              otherExpenses={otherExpenses}
              totalExpenses={totalExpenses}
              profit={profit}
              profitMargin={Number(profitMargin)}
              otherExpansesMargin={otherExpansesMargin}
            />

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
        )}
      </FormProvider>
    </Container>
  );
}
