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

import { useGetAllCupValuesQuery } from '../../../api/cupValues';
import useResponsive from '../../../hooks/useResponsive';
import FormattedPrice from '../../../utils/FormattedPrice';
import { mapCupsToMenuItems } from '../../../utils/mapToMenuItems';
import EditCupValue from './form/EditCupValue';
import { BG_COLOR_INPUT } from '../../../theme/palette';

export default function CupValuesSettings() {
  const isMdDown = useResponsive('down', 'md');

  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const { data, isLoading } = useGetAllCupValuesQuery();
  const mappedData = mapCupsToMenuItems(data);

  useEffect(() => {
    if (data && data.length > 0 && !selectedId) {
      setSelectedId(data[0].id.toString());
    }
  }, [data, selectedId]);

  return (
    <>
      {isLoading && (
        <Skeleton variant='rounded' height={isMdDown ? 128 : 112} />
      )}
      {!isLoading && data && (
        <Stack gap={2}>
          <Stack direction='row' justifyContent='space-between'>
            <Typography variant='h6'>Prodajna cena džema po teglici</Typography>
            {/* <IconButton color='primary' onClick={() => setOpenCreate(true)}>
              <AddCircleOutlineIcon fontSize='large' />
            </IconButton> */}
          </Stack>
          <Stack gap={4}>
            <FormControl fullWidth sx={{ minWidth: 120 }}>
              <InputLabel>Izaberi teglicu</InputLabel>
              <Select
                sx={{ bgcolor: BG_COLOR_INPUT }}
                value={selectedId}
                label='Izaberi teglicu'
                onChange={(e) => setSelectedId(e.target.value)}
              >
                {mappedData.map((item) => (
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
              justifyContent='space-around'
            >
              <Stack
                direction={isMdDown ? 'column' : 'row'}
                gap={1}
                alignItems='center'
              >
                <Typography
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  Prodajna cena teglice:
                </Typography>
                <FormattedPrice
                  price={
                    data.find((c) => c.id === Number(selectedId))?.value || 0
                  }
                  isBold
                />
              </Stack>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                disabled={!selectedId}
                onClick={() => setOpen(true)}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      )}
      {open && (
        <EditCupValue
          open={open}
          cup={data?.find((c) => c.id === Number(selectedId))}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
