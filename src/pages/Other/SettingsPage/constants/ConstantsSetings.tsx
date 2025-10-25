import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';

import {
  useGetOtherExpansesMarginQuery,
  useGetProfitMarginQuery,
  useGetTomatoPriceQuery,
} from '../../../../api/constantApi';
import EditConstant from './form/EditConstant';
import { useAppSelector } from '../../../../hooks/reduxStoreHooks';
import FormattedPrice from '../../../../utils/FormattedPrice';

export default function ConstantsSettings() {
  const userId = useAppSelector((state) => state.auth.userId);

  const { data: tomatoPrice, isLoading: tomatoPriceLoading } =
    useGetTomatoPriceQuery(userId || 0);

  const { data: profitMargin, isLoading: profitMarginLoading } =
    useGetProfitMarginQuery(userId || 0);
  const { data: otherExpansesMargin, isLoading: otherExpansesMarginLoading } =
    useGetOtherExpansesMarginQuery(userId || 0);

  const [selectedId, setSelectedId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const isLoading =
    profitMarginLoading || otherExpansesMarginLoading || tomatoPriceLoading;

  return (
    <>
      {isLoading && <Skeleton variant='rounded' height={131} />}
      {!isLoading && profitMargin && otherExpansesMargin && tomatoPrice && (
        <Stack gap={1}>
          <Typography variant='h6'>Konstante</Typography>

          <Stack>
            <Stack direction='row' justifyContent='space-between' gap={1}>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography sx={{ width: 125 }}>Ostali troškovi: </Typography>
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
            <Stack direction='row' justifyContent='space-between' gap={1}>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography sx={{ width: 125 }}>Profitna marža: </Typography>
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
            <Stack direction='row' justifyContent='space-between' gap={1}>
              <Stack direction='row' gap={1} alignItems='center'>
                <Typography>Prodajna cena čeri paradajza:</Typography>
                <FormattedPrice price={tomatoPrice.value || 0} isBold />
              </Stack>
              <IconButton
                sx={{ color: 'secondary.dark' }}
                onClick={() => {
                  setSelectedId(tomatoPrice?.id.toString());
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
                (selectedId === profitMargin.id.toString() && profitMargin) ||
                (selectedId === otherExpansesMargin.id.toString() &&
                  otherExpansesMargin) ||
                (selectedId === tomatoPrice?.id.toString() && tomatoPrice) ||
                null
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
