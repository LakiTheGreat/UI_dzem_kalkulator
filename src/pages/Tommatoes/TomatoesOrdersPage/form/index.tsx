import { Button, Skeleton, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Divider } from '@mui/material';

import FormProvider from '../../../../components/FormProvider';
import RHFTextInput from '../../../../components/RHFTextInput';
import RHFSelectInput, {
  MenuItemType,
} from '../../../../components/RHFSelectInput';

export type FormData = {
  cupTypeId: number;
  totalExpenses: number;
  numOfCups: number;
};

type Props = {
  onSubmit: (data: FormData) => void;
  values?: FormData;
  isLoading: boolean;
  mappedTomatoCups: MenuItemType[];
  submitIsLoading: boolean;
};

export default function TomatoesOrderForm({
  onSubmit,
  isLoading,
  values,
  mappedTomatoCups,
  submitIsLoading,
}: Props) {
  const methods = useForm<FormData>({
    defaultValues: {
      cupTypeId: values?.cupTypeId || 0,
      totalExpenses: values?.totalExpenses || 200,
      numOfCups: values?.numOfCups || 0,
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
      {isLoading && <Skeleton height={294} variant='rounded' />}
      {!isLoading && (
        <Stack gap={3}>
          <Stack gap={2}>
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
          </Stack>
          <Divider />
          <Button
            type='submit'
            variant='contained'
            loading={submitIsLoading}
            disabled={numOfCups < 1 || totalExpenses < 1}
            size='large'
          >
            Sačuvaj
          </Button>
        </Stack>
      )}
    </FormProvider>
  );
}
