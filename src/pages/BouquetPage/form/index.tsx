import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../components/FormProvider';
import RHFTextInput from '../../../components/RHFTextInput';
import FormattedPrice from '../../../utils/FormattedPrice';
import { BouquetTransactionEnum } from '../../../types/bouguets';
import RHFSelectInput, {
  MenuItemType,
} from '../../../components/RHFSelectInput';

export type BouquetFormData = {
  note: string;
  totalExpense: number;
  income: number;
  profit: number;
  profitMargin: number;
  status: BouquetTransactionEnum;
};

type Props = {
  onSubmit: (data: BouquetFormData) => void;
  values?: BouquetFormData;
  isLoading: boolean;
  mappedStatus: MenuItemType[];
};

export default function BouquetForm({
  onSubmit,
  values,
  mappedStatus,
  isLoading,
}: Props) {
  const methods = useForm<BouquetFormData>({
    defaultValues: {
      note: values?.note || '',
      totalExpense: values?.totalExpense || 0,
      income: values?.income || 0,
      profit: values?.profit || 0,
      profitMargin: values?.profitMargin || 0,
      status: values?.status || BouquetTransactionEnum.SOLD,
    },
  });

  const { handleSubmit, watch, setValue } = methods;

  const { totalExpense, income, profit, profitMargin } = watch();

  useEffect(() => {
    if (totalExpense && income) {
      setValue('profit', income - totalExpense);
      setValue(
        'profitMargin',
        Math.round(((income - totalExpense) / totalExpense) * 100)
      );
    } else {
      setValue('profit', 0);
      setValue('profitMargin', 0);
    }
  }, [totalExpense, income, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={3}>
        <RHFTextInput name='note' label='Napomena' />
        <RHFTextInput
          name='totalExpense'
          label='Ukupni troškovi'
          type='number'
        />
        <RHFTextInput name='income' label='Cena buketa' type='number' />
        <RHFSelectInput
          name='status'
          label='Transakcija'
          menuItems={mappedStatus}
        />
        <Stack direction='row' gap={1} color='success.dark'>
          <Typography sx={{ fontWeight: 'bold' }}>Profit: </Typography>
          <FormattedPrice price={profit} isBold />
        </Stack>
        <Stack direction='row' gap={1}>
          <Typography>Profitna marža: </Typography>
          <Typography>{profitMargin}%</Typography>
        </Stack>

        <Button
          type='submit'
          variant='contained'
          loading={isLoading}
          disabled={!profit || !profitMargin}
        >
          Sačuvaj
        </Button>
      </Stack>
    </FormProvider>
  );
}
