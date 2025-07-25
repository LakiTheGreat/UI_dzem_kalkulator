import { Button, Divider, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import FormProvider from '../../../components/FormProvider';
import RHFSelectInput, {
  MenuItemType,
} from '../../../components/RHFSelectInput';
import RHFTextInput from '../../../components/RHFTextInput';
import { Constant } from '../../../types/constants';
import { CupWithPriceData } from '../../../types/cups';
import { Order } from '../../../types/orders';
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

type Props = {
  onSubmit: (data: FormData) => void;
  data: Order | undefined;
  values?: FormData;
  cupsWithData: CupWithPriceData[] | undefined;
  mappedFruits: MenuItemType[] | undefined;
  otherExpansesMargin: Constant | undefined;
  isLoading: boolean;
};

export default function OrderForm({
  onSubmit,
  data,
  values,
  cupsWithData,
  mappedFruits,
  otherExpansesMargin,
  isLoading,
}: Props) {
  const methods = useForm<FormData>({
    defaultValues: {
      orderName: values?.orderName || '',
      fruits: values?.fruits || [{ grams: '', price: '', total: '' }],
      cups: values?.cups || [],
      orderTypeId: values?.orderTypeId || '',
      baseFruitIsFree: values?.baseFruitIsFree || false,
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
    if (cupsWithData && !values) {
      const defaultCups = cupsWithData.map((cup) => ({
        label: cup.label,
        numberOf: 0,
        cost: cup.cost,
        sellingPrice: cup.sellingPrice,
        total: 0,
      }));
      setValue('cups', defaultCups);
    }
  }, [cupsWithData, values, setValue]);

  useEffect(() => {
    if (data) {
      const defaultCups = data.cups.map((cup) => ({
        label: cup.label,
        numberOf: 0,
        cost: cup.cost,
        sellingPrice: cup.sellingPrice,
        total: 0,
      }));
      reset({
        orderName: '',
        fruits: [{ grams: '', price: '', total: '' }],
        cups: defaultCups,
        orderTypeId: '',
        baseFruitIsFree: false,
      });
    }
  }, [data, reset]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Stack gap={2}>
          <RHFTextInput name='orderName' label='Napomena' />

          <RHFSelectInput
            name='orderTypeId'
            label='Vrsta džema'
            menuItems={mappedFruits || []}
          />
        </Stack>

        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          Troškovi
        </Typography>
        <FruitsForm mappedData={mappedFruits || []} />

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
          loading={isLoading}
          disabled={!orderTypeId || (!cups[0]?.numberOf && !cups[0]?.numberOf)}
        >
          Sačuvaj
        </Button>
      </Stack>
    </FormProvider>
  );
}
