import { useEffect } from 'react';
import { Id, toast } from 'react-toastify';

import NotificationMessage from '../components/NotificationMessage';
import updateToast from '../utils/toastify/updateToast';

type Props = {
  error: any;
  toastId?: Id;
};

// Shows the server message only for plain 4xx business errors (v2 sends Serbian text).
// Validation arrays (JSON) and Prisma errors (customStatusCode) keep the fallback.
const getServerMessage = (error: any): string | undefined => {
  // Error may be the response body itself or an RTK Query error wrapping it in `data`.
  const body = error?.data ?? error;
  const message = body?.message;
  const httpStatus = Number(body?.status ?? error?.status);

  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.startsWith('[') ||
    message.startsWith('{') ||
    body?.customStatusCode ||
    !(httpStatus >= 400 && httpStatus < 500)
  ) {
    return undefined;
  }

  return message;
};

export const useApiErrorNotification = ({ error, toastId }: Props) => {
  useEffect(() => {
    if (error) {
      const serverMessage = getServerMessage(error);

      if (!toastId) {
        toast.error(
          <NotificationMessage>
            {serverMessage ?? error.message}
          </NotificationMessage>
        );
      } else if (toastId) {
        updateToast({
          toastId,
          message: serverMessage ?? 'Nešto ne valja',
          type: 'error',
        });
      }
    }
  }, [error, toastId]);
};
