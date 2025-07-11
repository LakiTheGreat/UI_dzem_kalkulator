import { useState } from 'react';
import { Id } from 'react-toastify';

import setToastIsLoading from '../../../../utils/toastify/setToastIsLoading';
import { useApiSuccessNotification } from '../../../../hooks/useApiSuccessNotification';
import { useApiErrorNotification } from '../../../../hooks/useApiErrorNotification';
import { Constant } from '../../../../types/constants';
import { ConstantForm, ConstantFormData } from './ConstantForm';
import { usePatchConstantMutation } from '../../../../api/constantApi';

type Props = {
  open: boolean;
  constant?: Constant;
  handleClose: () => void;
};

export default function EditConstant({ open, constant, handleClose }: Props) {
  const [toastId, setToastId] = useState<Id>('');

  const [patchConstant, { data, error, isLoading }] =
    usePatchConstantMutation();

  const handleEdit = (values: ConstantFormData) => {
    patchConstant({
      id: constant?.id || -1,
      value: Number(values.value),
      label: `${values.value}%` || '',
    });
    setToastId(setToastIsLoading(`Sačekaj...`));
  };

  useApiSuccessNotification({
    data,
    message: 'Konstanta je uspešno izmenjena',
    toastId,
  });

  useApiErrorNotification({ error, toastId });

  return (
    <ConstantForm
      values={{ value: constant?.value || 0 }}
      open={open}
      isLoading={isLoading}
      data={data}
      handleClose={handleClose}
      onSubmit={handleEdit}
    />
  );
}
