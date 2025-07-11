import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import {
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
} from '../../../api/constantApi';
import EditConstant from './form/EditConstant';

export default function ConstantsSettings() {
  const { data: profitMargin, isLoading: profitMarginLoading } =
    useGetProfitMarginQuery();
  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery();

  const [selectedId, setSelectedId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const isLoading = profitMarginLoading || otherExpansesMarginLoading;

  return (
    <>
      {isLoading && <Skeleton variant='rounded' height={131} />}
      {!isLoading && profitMargin && otherExpansesMargin && (
        <Stack gap={2}>
          <Typography variant='h5'>Konstante</Typography>

          <Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack direction='row' gap={1}>
                <Typography>Ostali troškovi: </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {otherExpansesMargin?.label}
                </Typography>
              </Stack>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                onClick={() => {
                  setSelectedId(otherExpansesMargin.id.toString());
                  setOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack direction='row' gap={1}>
                <Typography>Profitna marža: </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {profitMargin?.label}
                </Typography>
              </Stack>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                onClick={() => {
                  setSelectedId(profitMargin.id.toString());
                  setOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </Stack>
          </Stack>

          {open && (
            <EditConstant
              constant={
                selectedId === profitMargin.id.toString()
                  ? profitMargin
                  : otherExpansesMargin
              }
              handleClose={() => setOpen(false)}
              open={open}
            />
          )}
        </Stack>
      )}
    </>
  );
}
