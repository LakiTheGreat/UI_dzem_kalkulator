import { Button, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../../components/FormProvider';
import GeneralDialog from '../../../../components/GeneralDialog';
import RHFTextInput from '../../../../components/RHFTextInput';
import { Fruit } from '../../../../types/fruits';

export type FruitsFormData = {
  label: string;
};

type Props = {
  open: boolean;
  isLoading: boolean;
  values?: FruitsFormData;
  data?: Fruit;
  handleClose: () => void;
  onSubmit: (values: FruitsFormData) => void;
};

export function FruitForm({
  open,
  values,
  data,
  isLoading,
  handleClose,
  onSubmit,
}: Props) {
  const methods = useForm<FruitsFormData>({
    defaultValues: {
      label: values?.label || '',
    },
  });

  const { handleSubmit, reset } = methods;

  const closeDialog = useCallback(() => {
    handleClose();
    setTimeout(() => {
      reset();
    }, 100);
  }, [handleClose, reset]);

  useEffect(() => {
    if (data) {
      closeDialog();
    }
  }, [data, closeDialog]);

  return (
    <GeneralDialog
      open={open}
      handleClose={closeDialog}
      maxWidth='xs'
      title={values ? 'Izmeni naziv' : 'Kreiraj novo voće'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3} sx={{ mt: 0.5 }}>
          <RHFTextInput name='label' label='Naziv' />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            loading={isLoading}
            fullWidth
            size='large'
          >
            Sačuvaj
          </Button>
        </Stack>
      </FormProvider>
    </GeneralDialog>
  );
}
