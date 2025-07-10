import { useState } from 'react';
import { Id } from 'react-toastify';

import { FruitForm, FruitsFormData } from './FruitForm';
import { useCreateFruitMutation } from '../../../api/fruitsSlice';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';

type Props = {
  open: boolean;
  handleClose: () => void;
};

export default function CreateFruit({ open, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [createFruit, { data: createFruitData, isLoading }] =
    useCreateFruitMutation();

  const handleCreate = (values: FruitsFormData) => {
    console.log(values);
    createFruit({ label: values.label });

    setToastId(setToastIsLoading(`Sačekaj...`));
  };

  useApiSuccessNotification({
    data: createFruitData,
    message: 'Voćka uspešno kreirana',
    toastId,
  });

  return (
    <FruitForm
      open={open}
      isLoading={isLoading}
      data={createFruitData}
      handleClose={handleClose}
      onSubmit={handleCreate}
    />
  );
}
