import { Skeleton, Stack, Typography } from '@mui/material';

import { useGetOrderByIdQuery } from '../../../api/ordersApi';
import GeneralDialog from '../../../components/GeneralDialog';
import { ORDER_WIDTH } from '../../../constants';
import { formatLocalDateTime } from '../../../utils/formatLocalDateTime';

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
      {!isLoading && data && (
        <Stack>
          <Stack direction='row' gap={1}>
            <Typography sx={{ width: ORDER_WIDTH }}>Napomena:</Typography>
            <Typography>{data.orderName}</Typography>
          </Stack>
          <Stack direction='row' gap={1}>
            <Typography sx={{ width: ORDER_WIDTH }}>Vreme unosa:</Typography>
            <Typography>{formatLocalDateTime(data.createdAt)}</Typography>
          </Stack>
          {/* <Stack direction='row' gap={1}>
            <Typography sx={{ width: ORDER_WIDTH }}>Vrsta džema:</Typography>
            <Typography>{data.orderType.label}</Typography> 
          </Stack> */}
        </Stack>
      )}
    </GeneralDialog>
  );
}
