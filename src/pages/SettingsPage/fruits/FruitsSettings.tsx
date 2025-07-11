import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import {
  useDeleteFruitMutation,
  useGetFruitsQuery,
} from '../../../api/fruitsSlice';
import { useApiSuccessNotification } from '../../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../../hooks/useConfirmDialog';
import { mapFruitToMenuItems } from '../../../utils/mapToMenuItems';
import setToastIsLoading from '../../../utils/toastify/setToastIsLoading';
import CreateFruit from './form/CreateFruit';
import EditFruit from './form/EditFruit';

export default function FruitsSettings() {
  const [getConfirmation, Confirmation] = useConfirmDialog();

  const [toastId, setToastId] = useState<Id>('');
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string>('');

  const { data, isLoading } = useGetFruitsQuery();
  const mappedData = mapFruitToMenuItems(data);

  const [deleteFruit, { data: deleteFruitData }] = useDeleteFruitMutation();

  const handleDelete = async (id: string) => {
    const isConfirmed = await getConfirmation({
      title: 'Jesi li siguran da želiš da obrišeš ovu voćku?',
      contentSubtitle: 'Posle nema nazad (ima)!',
      confirmLabel: 'Da',
    });

    if (isConfirmed) {
      deleteFruit({ id });
      setToastId(setToastIsLoading(`Sačekaj....`));
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setSelectedId(data[0].id.toString());
    }
  }, [data]);

  useApiSuccessNotification({
    data: deleteFruitData,
    message: 'Voćka uspešno obrisana',
    toastId,
  });

  return (
    <>
      {isLoading && <Skeleton variant='rounded' height={131} />}
      {!isLoading && data && (
        <Stack gap={3}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h5'>Voće</Typography>

            <IconButton color='primary' onClick={() => setOpenCreate(true)}>
              <AddCircleOutlineIcon fontSize='large' />
            </IconButton>
          </Stack>
          <Stack direction='row' justifyContent='space-between' gap={4}>
            <FormControl fullWidth>
              <InputLabel>Izaberi voće</InputLabel>
              <Select
                value={selectedId}
                label='Izaberi voće'
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {mappedData.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.menuItemLabel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack direction='row' gap={2} alignItems='center'>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                disabled={!selectedId}
                onClick={() => setOpenEdit(true)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                disabled={!selectedId}
                onClick={() => handleDelete(selectedId)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Stack>
          </Stack>
          {openCreate && (
            <CreateFruit
              handleClose={() => setOpenCreate(false)}
              open={openCreate}
            />
          )}
          {openEdit && (
            <EditFruit
              handleClose={() => setOpenEdit(false)}
              open={openEdit}
              fruit={data.find((f) => f.id === Number(selectedId))}
            />
          )}
        </Stack>
      )}
      <Confirmation />
    </>
  );
}
