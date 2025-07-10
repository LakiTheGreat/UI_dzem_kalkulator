import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Button,
  Container,
  Divider,
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
} from '../../api/fruitsSlice';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import { mapFruitToMenuItems } from '../../utils/mapToMenuItems';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import CreateFruit from './fruits/CreateFruit';
import EditFruit from './fruits/EditFruit';

export default function Settings() {
  const [toastId, setToastId] = useState<Id>('');
  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [selectedFruitId, setSelectedFruitId] = useState<string>('');

  const { data: fruits, isLoading: fruitsIsLoading } = useGetFruitsQuery();
  const mappedData = mapFruitToMenuItems(fruits);

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

  useApiSuccessNotification({
    data: deleteFruitData,
    message: 'Voćka uspešno obrisana',
    toastId,
  });

  useEffect(() => {
    if (fruits && fruits.length > 0) {
      setSelectedFruitId(fruits[0].id.toString());
    }
  }, [fruits]);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Podešavanja'}
        links={[
          {
            name: 'Podešavanja',
            href: routes.settings,
          },
        ]}
      />
      <Stack gap={3}>
        <Divider />

        {fruitsIsLoading && <Skeleton variant='rounded' height={131} />}
        {!fruitsIsLoading && fruits && (
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
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  value={selectedFruitId}
                  label='Izaberi voće'
                  onChange={(e) => setSelectedFruitId(e.target.value)}
                >
                  {mappedData.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction='row' gap={2}>
                <Button
                  variant='contained'
                  disabled={!selectedFruitId}
                  onClick={() => setOpenEdit(true)}
                >
                  Izmeni
                </Button>
                <Button
                  variant='outlined'
                  disabled={!selectedFruitId}
                  onClick={() => handleDelete(selectedFruitId)}
                >
                  Obriši
                </Button>
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
                fruit={fruits.find((f) => f.id === Number(selectedFruitId))}
              />
            )}
          </Stack>
        )}

        <Divider />
      </Stack>

      <Confirmation />
    </Container>
  );
}
