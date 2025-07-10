import { useState } from 'react';
import { Id } from 'react-toastify';

import { FruitForm, FruitsFormData } from './FruitForm';
import { usePatchFruitMutation } from '../../../api/fruitsSlice';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import { Fruit } from '../../../types/fruits';
import { useApiErrorNotification } from '../../../hooks/useApiErrorNotification';

type Props = {
  open: boolean;
  fruit?: Fruit;
  handleClose: () => void;
};

export default function EditFruit({ open, fruit, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [
    patchFruit,
    { data: patchFruitData, error: patchFruitError, isLoading },
  ] = usePatchFruitMutation();

  const handleCreate = (values: FruitsFormData) => {
    console.log(values);
    patchFruit({ id: fruit?.id || -1, label: values.label });

    setToastId(setToastIsLoading(`Sačekaj...`));
  };

  useApiSuccessNotification({
    data: patchFruitData,
    message: 'Voćka je uspešno izmenjena',
    toastId,
  });

  useApiErrorNotification({ error: patchFruitError, toastId });

  return (
    <FruitForm
      values={fruit}
      open={open}
      isLoading={isLoading}
      data={patchFruitData}
      handleClose={handleClose}
      onSubmit={handleCreate}
    />
  );
}
