import { Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../components/FormProvider';
import RHFSelectInput, {
  MenuItemType,
} from '../../../components/RHFSelectInput';
import RHFTextInput from '../../../components/RHFTextInput';
import { CupData } from '../../../types/inventory';
import { TransactionStatusStrings } from '../../../types/transactions';

export type TransactionFormData = {
  orderTypeId: string;
  status: TransactionStatusStrings;
  cupData: CupData[];
  note: string;
};

type Props = {
  onSubmit: (data: TransactionFormData) => void;
  values?: TransactionFormData;
  mappedFruits: MenuItemType[] | undefined;
  mappedCups: MenuItemType[] | undefined;
  mappedStatus: MenuItemType[] | undefined;
  isLoading: boolean;
};

export default function TransactionsForm({
  onSubmit,
  values,
  mappedFruits,
  mappedCups,
  mappedStatus,
  isLoading,
}: Props) {
  const mergedCupData =
    mappedCups?.map((cup) => {
      const existing = values?.cupData?.find((c) => c.cupId === cup.id);
      return {
        cupId: cup.id,
        quantity: existing ? existing.quantity : 0,
      };
    }) || [];

  const methods = useForm<TransactionFormData>({
    defaultValues: {
      orderTypeId: values?.orderTypeId || '',
      status: values?.status || TransactionStatusStrings.SOLD,
      cupData: mergedCupData,
      note: values?.note || '',
    },
  });

  const { handleSubmit, register, watch } = methods;

  const { orderTypeId, cupData } = watch();

  const hasCupWithQuantity = cupData.some((cup) => Number(cup.quantity) > 0);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={3}>
        <RHFTextInput name='note' label='Napomena' />

        <RHFSelectInput
          name='orderTypeId'
          label='Voće'
          menuItems={mappedFruits || []}
        />
        <RHFSelectInput
          name='status'
          label='Transakcija'
          menuItems={mappedStatus || []}
        />
        {mappedCups?.map((cup, index) => (
          <Stack
            direction='row'
            gap={2}
            alignItems='center'
            key={cup.id}
            sx={{ width: '100%' }}
          >
            <Stack sx={{ maxWidth: 120 }}>
              <RHFTextInput
                type='number'
                label='Broj teglica'
                {...register(`cupData.${index}.quantity`)}
              />
            </Stack>
            <Typography>{cup.menuItemLabel}</Typography>
          </Stack>
        ))}
        <Button
          size='large'
          type='submit'
          variant='contained'
          loading={isLoading}
          disabled={!orderTypeId || !hasCupWithQuantity}
        >
          Sačuvaj
        </Button>
      </Stack>
    </FormProvider>
  );
}
