import { useState } from 'react';
import { Id } from 'react-toastify';

import { usePutCupCostMutation } from '../../../../api/cupCosts';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { Cup } from '../../../../types/cups';
import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import { CupCostForm, CupCostFormData } from './CupCostForm';

type Props = {
  open: boolean;
  cup?: Cup;
  handleClose: () => void;
};

export default function EditCupCosts({ open, cup, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [putCupCost, { data, error, isLoading }] = usePutCupCostMutation();

  const handleEdit = (values: CupCostFormData) => {
    putCupCost({
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
    <CupCostForm
      values={{ value: cup?.value || 0 }}
      open={open}
      isLoading={isLoading}
      data={data}
      handleClose={handleClose}
      onSubmit={handleEdit}
    />
  );
}
