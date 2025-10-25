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

import { useGetAllCupCostsQuery } from '../../../../api/cupCosts';
import useResponsive from '../../../../hooks/useResponsive';
import FormattedPrice from '../../../../utils/FormattedPrice';
import { mapCupsToMenuItems } from '../../../../utils/mapToMenuItems';
import EditCupCosts from './form/EditCupCosts';
import { BG_COLOR_INPUT } from '../../../../theme/palette';

export default function CupCostsSettings() {
  const isMdDown = useResponsive('down', 'md');

  const [open, setOpen] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<string>('');

  const { data, isLoading } = useGetAllCupCostsQuery();
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
            <Typography variant='h6'>Nabavna cena teglica</Typography>
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
            <Stack direction='row' gap={2} alignItems='center'>
              <Stack
                direction={isMdDown ? 'column' : 'row'}
                gap={1}
                alignItems='center'
              >
                <Typography>Nabavna cena teglice:</Typography>
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
        <EditCupCosts
          open={open}
          cup={data?.find((c) => c.id === Number(selectedId))}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
