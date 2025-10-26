import { Button, Divider, Skeleton, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../../components/FormProvider';
import RHFSelectInput, {
  MenuItemType,
} from '../../../../components/RHFSelectInput';
import RHFTextInput from '../../../../components/RHFTextInput';
import { TransactionStatusStrings } from '../../../../types/transactions';

export type FormData = {
  note: string;
  status: TransactionStatusStrings;
  cupTypeId: number;
  pricePerCup: number;
  numOfCups: number;
};

type Props = {
  onSubmit: (data: FormData) => void;
  values?: FormData;
  isLoading: boolean;
  mappedTomatoCups: MenuItemType[];
  submitIsLoading: boolean;
  mappedStatuses: MenuItemType[];
};

export default function TomatoesTransactionForm({
  onSubmit,
  isLoading,
  values,
  mappedTomatoCups,
  submitIsLoading,
  mappedStatuses,
}: Props) {
  const methods = useForm<FormData>({
    defaultValues: {
      note: values?.note || '',
      status: values?.status || TransactionStatusStrings.SOLD,
      cupTypeId: values?.cupTypeId || 0,
      pricePerCup: values?.pricePerCup || 0,
      numOfCups: values?.numOfCups || 0,
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const { numOfCups, pricePerCup } = watch();

  useEffect(() => {
    if (mappedTomatoCups.length) {
      setValue('cupTypeId', mappedTomatoCups[0].value);
    }
  }, [mappedTomatoCups, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Skeleton height={438} variant='rounded' />}
      {!isLoading && (
        <Stack gap={3}>
          <Stack gap={2}>
            <RHFTextInput name='note' label='Napomena' />
            <RHFSelectInput
              name='cupTypeId'
              label='Veličina teglice'
              menuItems={mappedTomatoCups}
            />
            <RHFSelectInput
              name='status'
              label='Transakcija'
              menuItems={mappedStatuses}
            />
            <RHFTextInput name='numOfCups' label='Broj teglica' type='number' />

            <RHFTextInput
              name='pricePerCup'
              label='Prodajna cena po teglici'
              type='number'
            />
          </Stack>
          <Divider />
          <Button
            type='submit'
            variant='contained'
            loading={submitIsLoading}
            disabled={numOfCups < 1 || pricePerCup < 1}
            size='large'
          >
            Sačuvaj
          </Button>
        </Stack>
      )}
    </FormProvider>
  );
}
