import { Button, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import FormProvider from '../../../../../components/FormProvider';
import GeneralDialog from '../../../../../components/GeneralDialog';
import RHFTextInput from '../../../../../components/RHFTextInput';
import { Fruit } from '../../../../../types/fruits';

export type CupCostFormData = {
  value: number;
};

type Props = {
  open: boolean;
  isLoading: boolean;
  values?: CupCostFormData;
  data?: Fruit;
  handleClose: () => void;
  onSubmit: (values: CupCostFormData) => void;
};

export function CupValueForm({
  open,
  values,
  data,
  isLoading,
  handleClose,
  onSubmit,
}: Props) {
  const methods = useForm<CupCostFormData>({
    defaultValues: {
      value: values?.value || 0,
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
      title={'Izmeni prodajnu cenu'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={3} sx={{ mt: 0.5 }}>
          <RHFTextInput name='value' label='Prodajna cena' type='number' />
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
