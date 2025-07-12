import { Skeleton } from '@mui/material';
import { useGetOrderByIdQuery } from '../../api/ordersApi';
import GeneralDialog from '../../components/GeneralDialog';

type Props = {
  open: boolean;
  selectedId: number;
  handleClose: () => void;
};

export default function OrderDetailsDialog({
  open,
  selectedId,
  handleClose,
}: Props) {
  const { data, isLoading } = useGetOrderByIdQuery(selectedId);

  return (
    <GeneralDialog
      open={open}
      handleClose={handleClose}
      maxWidth='xs'
      title={'Detalji porudžbine'}
    >
      {isLoading && <Skeleton variant='rounded' height={300} />}
      {!isLoading && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </GeneralDialog>
  );
}
