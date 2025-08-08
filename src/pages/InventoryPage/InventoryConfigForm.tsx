import { Button, Divider, Skeleton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Id } from 'react-toastify';

import { useGetAllCupsQuery } from '../../api/cups';
import { useGetFruitsQuery } from '../../api/fruitsSlice';
import { usePostInventoryMutation } from '../../api/inventoryApi';
import FormProvider from '../../components/FormProvider';
import GeneralDialog from '../../components/GeneralDialog';
import RHFSelectInput from '../../components/RHFSelectInput';
import RHFTextInput from '../../components/RHFTextInput';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import { InventoryPostRequest } from '../../types/inventory';
import {
  mapCupsWithDataToMenuItems,
  mapFruitToMenuItems,
} from '../../utils/mapToMenuItems';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export type InventoryConfigFormData = {
  orderTypeId: number | string;
  cupId: number | string;
  numberOf: number;
};

export default function InventoryConfigForm({ open, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [postInventory, { data, isLoading, error }] =
    usePostInventoryMutation();

  const { data: fruits, isLoading: fruitsIsLoading } = useGetFruitsQuery();
  const mappedFruits = mapFruitToMenuItems(fruits);

  const { data: cupsWithData, isLoading: cupsWithDataIsLoading } =
    useGetAllCupsQuery();

  const mappedCups = mapCupsWithDataToMenuItems(cupsWithData);

  const methods = useForm<InventoryConfigFormData>({
    defaultValues: {
      orderTypeId: '',
      cupId: '',
      numberOf: 0,
    },
  });
  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (fruits) {
      setValue('orderTypeId', fruits[0].id);
    }
  }, [fruits, setValue]);

  useEffect(() => {
    if (cupsWithData) {
      setValue('cupId', cupsWithData[0].id);
    }
  }, [cupsWithData, setValue]);

  useEffect(() => {
    if (data) {
      reset();
      handleClose();
    }
  }, [data, handleClose, reset]);

  const onSubmit = (data: InventoryConfigFormData) => {
    const req: InventoryPostRequest = {
      orderTypeId: Number(data.orderTypeId),
      cupData: [
        {
          cupId: Number(data.cupId),
          quantity: Number(data.numberOf),
        },
      ],
    };

    setToastId(setToastIsLoading(`Sačekaj....`));
    postInventory(req);
  };

  useApiErrorNotification({ error, toastId });
  useApiSuccessNotification({
    data,
    toastId,
    message: 'Uspešno izmenjeno stanje inventara',
  });

  return (
    <GeneralDialog
      open={open}
      handleClose={handleClose}
      title={'Konfiguracija inventara'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant='caption'>
              Inicijalna konfiguracija inventara, odnosno unos početnog stanja.
            </Typography>
            <Typography variant='caption'>
              Sve naknade promene se vrše pomoću kreiranja transakcija
              (ulaz/izlaz).
            </Typography>
          </Stack>

          <Divider />

          <Stack gap={2}>
            {fruitsIsLoading && <Skeleton variant='rounded' height={57} />}
            {!fruitsIsLoading && (
              <RHFSelectInput
                name='orderTypeId'
                label='Vrsta džema'
                menuItems={mappedFruits}
              />
            )}

            {cupsWithDataIsLoading && (
              <Skeleton variant='rounded' height={57} />
            )}
            {!cupsWithDataIsLoading && (
              <RHFSelectInput
                name='cupId'
                label='Teglica'
                menuItems={mappedCups}
              />
            )}

            <RHFTextInput name='numberOf' label='Broj teglica' type='number' />

            <Button type='submit' variant='contained' loading={isLoading}>
              Sačuvaj
            </Button>
          </Stack>
        </Stack>
      </FormProvider>
    </GeneralDialog>
  );
}
