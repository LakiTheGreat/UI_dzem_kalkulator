import { Button, Skeleton, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../../components/FormProvider';
import RHFTextInput from '../../../../components/RHFTextInput';
import RHFSelectInput, {
  MenuItemType,
} from '../../../../components/RHFSelectInput';
import { useEffect } from 'react';
import { TransactionStatusStrings } from '../../../../types/transactions';

export type FormData = {
  cupTypeId: number;
  totalExpenses: number;
  numOfCups: number;
  status: TransactionStatusStrings;
};

type Props = {
  onSubmit: (data: FormData) => void;
  values?: FormData;
  isLoading: boolean;
  mappedTomatoCups: MenuItemType[];
  mappedStatus: MenuItemType[];
  submitIsLoading: boolean;
};

export default function TomatoesOrderForm({
  onSubmit,
  isLoading,
  values,
  mappedTomatoCups,
  mappedStatus,
  submitIsLoading,
}: Props) {
  const methods = useForm<FormData>({
    defaultValues: {
      cupTypeId: values?.cupTypeId || 0,
      totalExpenses: values?.totalExpenses || 200,
      numOfCups: values?.numOfCups || 0,
      status: values?.status || TransactionStatusStrings.SOLD,
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const { numOfCups, totalExpenses } = watch();
  useEffect(() => {
    if (mappedTomatoCups.length) {
      setValue('cupTypeId', mappedTomatoCups[0].value);
    }
  }, [mappedTomatoCups, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <Skeleton height={390} variant='rounded' />}
      {!isLoading && (
        <Stack gap={4}>
          <RHFSelectInput
            name='status'
            label='Transakcija'
            menuItems={mappedStatus}
          />
          <RHFSelectInput
            name='cupTypeId'
            label='Veličina teglice'
            menuItems={mappedTomatoCups}
          />
          <RHFTextInput name='numOfCups' label='Broj teglica' type='number' />
          <RHFTextInput
            name='totalExpenses'
            label='Troškovi po teglici'
            type='number'
          />
          <Button
            type='submit'
            variant='contained'
            loading={submitIsLoading}
            disabled={numOfCups < 1 || totalExpenses < 1}
          >
            Sačuvaj
          </Button>
        </Stack>
      )}
    </FormProvider>
  );
}
