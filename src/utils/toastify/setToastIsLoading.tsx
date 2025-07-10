import { Id, toast } from 'react-toastify';
import NotificationMessage from '../../components/NotificationMessage';

export default function setToastIsLoading(message: string) {
  const toastId: Id = toast.loading(
    <NotificationMessage>{message}</NotificationMessage>
  );

  return toastId;
}
