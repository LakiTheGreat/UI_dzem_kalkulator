import { Id, UpdateOptions, toast } from 'react-toastify';

import { TOASTIFY_AUTO_CLOSE_TIME } from '../../constants';
import NotificationMessage from '../../components/NotificationMessage';

type Props = {
  toastId: Id;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
};

export default function updateToast({ toastId, message, type }: Props) {
  const defaultOptions: UpdateOptions = {
    render: <NotificationMessage>{message}</NotificationMessage>,
    type: type,
    isLoading: false,
    autoClose: TOASTIFY_AUTO_CLOSE_TIME,
    closeButton: true,
  };

  toast.update(toastId, defaultOptions);
}
