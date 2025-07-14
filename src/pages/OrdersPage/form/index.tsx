import {
  Button,
  Container,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Id } from 'react-toastify';

import { useGetOtherExpansesMarginQuery } from '../../../api/constantApi';
import { useGetAllCupsQuery } from '../../../api/cups';
import { useGetFruitsQuery } from '../../../api/fruitsSlice';
import { useCreateNewOrderMutation } from '../../../api/ordersApi';
import FormProvider from '../../../components/FormProvider';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import RHFSelectInput from '../../../components/RHFSelectInput';
import RHFTextInput from '../../../components/RHFTextInput';
import { routes } from '../../../constants/routes';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import { NewOrder } from '../../../types/orders';
import { mapFruitToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import CupsForm from './subForms/CupsForm';
import FruitsForm from './subForms/FruitsForm';
import OrderSummary from './subForms/OrderSummary';

export type FruitItem = {
  fruitId: string;
  grams: string | number;
  price: string | number;
  total: string | number;
};

export type CupItem = {
  label: string;
  numberOf: number;
  cost: number;
  sellingPrice: number;
  total: number;
};

export type FormData = {
  orderName: string;
  fruits: FruitItem[];
  cups: CupItem[];
  orderTypeId: string;
  baseFruitIsFree: boolean;
};

export default function OrderForm() {
  const [toastId, setToastId] = useState<Id>('');

  const { data: otherExpensesMargin } = useGetOtherExpansesMarginQuery();
  const { data: fruitData, isLoading: fruitLoading } = useGetFruitsQuery();

  const { data: cupsWithData, isLoading: cupsWithDataIsLoading } =
    useGetAllCupsQuery();

  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery();

  const mappedFruits = mapFruitToMenuItems(fruitData);

  const isLoading =
    cupsWithDataIsLoading || otherExpansesMarginLoading || fruitLoading;

  const [createNewOrder, { data, error }] = useCreateNewOrderMutation();

  const methods = useForm<FormData>({
    defaultValues: {
      orderName: '',
      fruits: [{ grams: '', price: '', total: '' }],
      cups: [],
      orderTypeId: '',
      baseFruitIsFree: false,
    },
  });

  const { handleSubmit, reset, control, watch, setValue } = methods;

  const cups = useWatch({ control, name: 'cups' });
  const fruits = useWatch({ control, name: 'fruits' });
  const { orderTypeId } = watch();

  const totalCupPrice =
    cupsWithData?.reduce((acc, cost, index) => {
      const numberOf = Number(cups[index]?.numberOf ?? 0);
      const cupCost = Number(cost.cost ?? 0);
      return acc + numberOf * cupCost;
    }, 0) || 0;

  const totalFruitPrice = fruits.reduce((acc, fruit) => {
    const total = Number(fruit.total ?? 0);
    return acc + total;
  }, 0);

  const totalOrderPrice =
    cupsWithData
      ?.reduce((acc, cost, index) => {
        const numberOf = Number(cups[index]?.numberOf ?? 0);
        const cupValue = Number(
          cupsWithData.find((val) => val.label === cost.label)?.sellingPrice ??
            0
        );
        return acc + numberOf * cupValue;
      }, 0)
      .toFixed(2) || 0;

  const otherExpenses =
    Number(totalFruitPrice + totalCupPrice) *
    ((otherExpansesMargin?.value || 1) / 100);

  const totalExpenses = totalFruitPrice + totalCupPrice + otherExpenses;

  const profit = Number(totalOrderPrice) - totalExpenses;
  const profitMargin = (
    Number(totalOrderPrice) > 0 ? (profit / Number(totalOrderPrice)) * 100 : 0
  ).toFixed(0);

  useEffect(() => {
    if (cupsWithData) {
      const defaultCups = cupsWithData.map((cup) => ({
        label: cup.label,
        numberOf: 0,
        cost: cup.cost,
        sellingPrice: cup.sellingPrice,
        total: 0,
      }));
      setValue('cups', defaultCups);
    }
  }, [cupsWithData, setValue]);

  const formSubmit = (data: FormData) => {
    const req: NewOrder = {
      orderTypeId: Number(data.orderTypeId),
      orderName: data.orderName,
      fruits: data.fruits.map((fruit) => ({
        grams: fruit.grams.toString(),
        price: fruit.price.toString(),
        total: fruit.total.toString(),
        fruitId: fruit.fruitId,
      })),
      cups: data.cups.map((cup) => ({
        cost: cup.cost,
        label: cup.label,
        numberOf: cup.numberOf,
        sellingPrice: cup.sellingPrice,
        total: cup.total,
      })),
      otherExpensesMargin: otherExpensesMargin?.value || 1,
      baseFruitIsFree: data.baseFruitIsFree,
    };

    createNewOrder(req);
    setToastId(setToastIsLoading(`Sačekaj....`));
  };

  useEffect(() => {
    if (data) {
      reset();
    }
  }, [data, reset]);

  useApiSuccessNotification({
    data,
    message: 'Narudžbina uspešno kreirana',
    toastId,
  });

  useApiErrorNotification({
    error,
    toastId,
  });

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Pregled',
            href: `/${routes.orders}`,
          },
          {
            name: 'Nova serija',
            href: `${routes.orders}/${routes.new}`,
          },
        ]}
      />
      <FormProvider methods={methods} onSubmit={handleSubmit(formSubmit)}>
        {isLoading && <Skeleton height='70vh' variant='rounded' />}
        {!isLoading && (
          <Stack gap={4}>
            <Stack gap={2}>
              <RHFTextInput name='orderName' label='Napomena' />

              <RHFSelectInput
                name='orderTypeId'
                label='Vrsta džema'
                menuItems={mappedFruits}
              />
            </Stack>

            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Troškovi
            </Typography>
            <FruitsForm mappedData={mappedFruits} />

            <Divider />

            <CupsForm cupsWithData={cupsWithData} />

            <Divider
              sx={{
                borderColor: 'secondary.main',
                bgcolor: 'secondary.main',
                height: 3,
              }}
            />

            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Vrednost serije
            </Typography>

            <OrderSummary
              cupsWithData={cupsWithData}
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

            <Button
              variant='contained'
              type='submit'
              size='large'
              disabled={
                !orderTypeId || (!cups[0]?.numberOf && !cups[0]?.numberOf)
              }
            >
              Sačuvaj
            </Button>
          </Stack>
        )}
      </FormProvider>
    </Container>
  );
}
