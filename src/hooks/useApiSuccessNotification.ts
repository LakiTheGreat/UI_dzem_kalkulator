import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Id } from 'react-toastify';

import updateToast from '../utils/toastify/updateToast';

type Props = {
  data: any;
  toastId: Id;
  message: string;
  navigateToAfter?: string;
};

export const useApiSuccessNotification = ({
  data,
  toastId,
  message,
  navigateToAfter,
}: Props) => {
  const navigate = useNavigate();
  const previousDataRef = useRef<any>(null); // Store the previous data

  useEffect(() => {
    if (data && data !== previousDataRef.current) {
      updateToast({
        toastId,
        message,
        type: 'success',
      });
      navigateToAfter && navigate(navigateToAfter);

      // Update the ref with the current data
      previousDataRef.current = data;
    }
  }, [data, message, navigate, navigateToAfter, toastId]);
};
