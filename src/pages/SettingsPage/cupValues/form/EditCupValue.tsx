import { useState } from 'react';
import { Id } from 'react-toastify';

import { usePutCupValueMutation } from '../../../../api/cupValues';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { Cup } from '../../../../types/cups';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import { CupCostFormData, CupValueForm } from './CupValueForm';

type Props = {
  open: boolean;
  cup?: Cup;
  handleClose: () => void;
};

export default function EditCupValue({ open, cup, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [putCupValue, { data, error, isLoading }] = usePutCupValueMutation();

  const handleEdit = (values: CupCostFormData) => {
    putCupValue({
      id: cup?.id || -1,
      value: Number(values.value),
      label: cup?.label || '',
    });

    setToastId(setToastIsLoading(`Sačekaj...`));
  };

  useApiSuccessNotification({
    data: data,
    message: 'Cena je uspešno izmenjena',
    toastId,
  });

  useApiErrorNotification({ error: error, toastId });

  return (
    <CupValueForm
      values={{ value: cup?.value || 0 }}
      open={open}
      isLoading={isLoading}
      data={data}
      handleClose={handleClose}
      onSubmit={handleEdit}
    />
  );
}
