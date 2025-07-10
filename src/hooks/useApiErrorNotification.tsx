import { useEffect } from 'react';
import { Id, toast } from 'react-toastify';

import NotificationMessage from '../components/NotificationMessage';
import updateToast from '../utils/toastify/updateToast';

type Props = {
  error: any;
  toastId?: Id;
};

export const useApiErrorNotification = ({ error, toastId }: Props) => {
  useEffect(() => {
    if (error) {
      if (!toastId) {
        toast.error(<NotificationMessage>{error.message}</NotificationMessage>);
      } else if (toastId) {
        updateToast({
          toastId,
          message: 'Nešto ne valja',
          type: 'error',
        });
      }
    }
  }, [error, toastId]);
};
