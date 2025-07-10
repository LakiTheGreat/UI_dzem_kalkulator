import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {
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

import { useGetAllCupCostsQuery } from '../../api/cupCosts';
import { useGetAllCupValuesQuery } from '../../api/cupValues';
import {
  useDeleteFruitMutation,
  useGetFruitsQuery,
} from '../../api/fruitsSlice';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';
import useConfirmDialog from '../../hooks/useConfirmDialog';
import FormattedPrice from '../../utils/FormattedPrice';
import {
  mapCupsToMenuItems,
  mapFruitToMenuItems,
} from '../../utils/mapToMenuItems';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import CreateFruit from './fruits/CreateFruit';
import EditFruit from './fruits/EditFruit';

export default function Settings() {
  const [getConfirmation, Confirmation] = useConfirmDialog();
  const [toastId, setToastId] = useState<Id>('');

  const [openCreate, setOpenCreate] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const [selectedFruitId, setSelectedFruitId] = useState<string>('');
  const [selectedCupCostId, setSelectedCupCostId] = useState<string>('');
  const [selectedCupValueId, setSelectedCupValueId] = useState<string>('');

  const { data: fruits, isLoading: fruitsIsLoading } = useGetFruitsQuery();
  const mappedFruits = mapFruitToMenuItems(fruits);

  const { data: cupCosts, isLoading: cupCostsIsLoading } =
    useGetAllCupCostsQuery();
  const mappedCupCosts = mapCupsToMenuItems(cupCosts);

  const { data: cupValues, isLoading: cupValuesIsLoading } =
    useGetAllCupValuesQuery();
  const mappedCupValues = mapCupsToMenuItems(cupValues);

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

  useEffect(() => {
    if (cupCosts && cupCosts.length > 0) {
      setSelectedCupCostId(cupCosts[0].id.toString());
    }
  }, [cupCosts]);

  useEffect(() => {
    if (cupValues && cupValues.length > 0) {
      setSelectedCupValueId(cupValues[0].id.toString());
    }
  }, [cupValues]);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Podešavanja'}
        links={[
          {
            name: 'Osnovne postavke',
            href: routes.settings,
          },
        ]}
      />
      <Stack gap={3}>
        <Divider />
        {/* -------------------------------------------------- FRUITS  -------------------------------------------------- */}
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
                  value={selectedFruitId}
                  label='Izaberi voće'
                  onChange={(e) => setSelectedFruitId(e.target.value)}
                >
                  {mappedFruits.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack direction='row' gap={2}>
                <IconButton
                  sx={{ color: 'secondary.dark' }}
                  disabled={!selectedFruitId}
                  onClick={() => setOpenEdit(true)}
                >
                  <EditIcon fontSize='large' />
                </IconButton>
                <IconButton
                  sx={{ color: 'secondary.dark' }}
                  disabled={!selectedFruitId}
                  onClick={() => handleDelete(selectedFruitId)}
                >
                  <DeleteOutlineIcon fontSize='large' />
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
                fruit={fruits.find((f) => f.id === Number(selectedFruitId))}
              />
            )}
          </Stack>
        )}

        <Divider />

        {/* -------------------------------------------------- CUP COSTS  ------------------------------------------------ */}
        {cupCostsIsLoading && <Skeleton variant='rounded' height={112} />}
        {!cupCostsIsLoading && cupCosts && (
          <Stack gap={3}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='h5'>Nabavna cena teglica</Typography>
              {/* <IconButton color='primary' onClick={() => setOpenCreate(true)}>
              <AddCircleOutlineIcon fontSize='large' />
            </IconButton> */}
            </Stack>
            <Stack gap={4} direction='row'>
              <FormControl fullWidth>
                <InputLabel>Izaberi teglicu</InputLabel>
                <Select
                  value={selectedCupCostId}
                  label='Izaberi teglicu'
                  onChange={(e) => setSelectedCupCostId(e.target.value)}
                >
                  {mappedCupCosts.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                direction='row'
                gap={2}
                alignItems='center'
                justifyContent='space-between'
              >
                <Stack direction='row' gap={1}>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Nabavna cena teglice:
                  </Typography>
                  <FormattedPrice
                    price={
                      cupCosts.find((c) => c.id === Number(selectedCupCostId))
                        ?.value || 0
                    }
                    isBold
                  />
                </Stack>
                <IconButton
                  sx={{ color: 'secondary.dark' }}
                  disabled={!selectedFruitId}
                  onClick={() => setOpenEdit(true)}
                >
                  <EditIcon fontSize='large' />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        )}

        <Divider />

        {/* -------------------------------------------------- CUP VALUE  ------------------------------------------------- */}
        {cupValuesIsLoading && <Skeleton variant='rounded' height={112} />}
        {!cupValuesIsLoading && cupValues && (
          <Stack gap={3}>
            <Stack direction='row' justifyContent='space-between'>
              <Typography variant='h5'>
                Prodajna cena džema po teglici
              </Typography>
              {/* <IconButton color='primary' onClick={() => setOpenCreate(true)}>
              <AddCircleOutlineIcon fontSize='large' />
            </IconButton> */}
            </Stack>
            <Stack gap={4} direction='row'>
              <FormControl fullWidth>
                <InputLabel>Izaberi teglicu</InputLabel>
                <Select
                  value={selectedCupValueId}
                  label='Izaberi teglicu'
                  onChange={(e) => setSelectedCupValueId(e.target.value)}
                >
                  {mappedCupValues.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.menuItemLabel}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Stack
                direction='row'
                gap={2}
                alignItems='center'
                justifyContent='space-between'
              >
                <Stack direction='row' gap={1}>
                  <Typography
                    sx={{
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Prodajna cena teglice:
                  </Typography>
                  <FormattedPrice
                    price={
                      cupValues.find((c) => c.id === Number(selectedCupValueId))
                        ?.value || 0
                    }
                    isBold
                  />
                </Stack>
                <IconButton
                  sx={{ color: 'secondary.dark' }}
                  disabled={!selectedFruitId}
                  onClick={() => setOpenEdit(true)}
                >
                  <EditIcon fontSize='large' />
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Stack>

      <Confirmation />
    </Container>
  );
}
