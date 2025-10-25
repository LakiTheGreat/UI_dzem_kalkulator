import SettingsIcon from '@mui/icons-material/Settings';
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  useGetInventoryQuery,
  useGetTotalInventoryQuery,
} from '../../../api/inventoryApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import InventoryConfigForm from './InventoryConfigForm';
import { routesJam } from '../../../constants/routes';

export default function InventoryPage() {
  const { data, isFetching } = useGetTotalInventoryQuery();
  const [showAll, setShowAll] = useState<boolean>(false);

  const { data: groupedInventory, isFetching: groupedInventoryIsFetching } =
    useGetInventoryQuery();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Inventar'}
        links={[
          {
            name: 'Džemovi',
            href: routesJam.inventory,
          },
        ]}
      />
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography variant='caption'>
            Kreiranjem "Proizvodne serije" ili "Transakcije" stanje inventara se
            <strong> AUTOMATSKI AŽURIRA</strong>.
          </Typography>
        </Stack>

        <Divider />

        {isFetching && <Skeleton variant='rounded' height={104} />}
        <Stack gap={4}>
          {!isFetching && data && (
            <Stack gap={1}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Ukupno stanje:
                </Typography>
                <IconButton onClick={() => setOpen(true)}>
                  <SettingsIcon />
                </IconButton>
              </Stack>
              <Stack direction='row' gap={4}>
                {data.map((item) => (
                  <Stack gap={1} key={item.label}>
                    <Typography
                      sx={{
                        width: 60,
                      }}
                      textAlign='center'
                    >{`${item.label}:`}</Typography>
                    <Typography key={item.label} textAlign='center'>
                      {`${item.numberOf}  `}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}

          <Stack gap={1}>
            {groupedInventoryIsFetching && (
              <Skeleton variant='rounded' height={260} />
            )}
            {!groupedInventoryIsFetching && (
              <>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Stanje po voćkama:
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={showAll}
                      onClick={() => setShowAll(!showAll)}
                    />
                  }
                  label='Prikaži i voćke kojih nema na stanju'
                />
                <Stack>
                  {/* <Divider /> */}
                  {groupedInventory?.map((item) => {
                    const hasNonZeroCup = item.cups.some(
                      (cup) => cup.numberOf !== 0
                    );

                    if (!hasNonZeroCup && !showAll) return null;

                    return (
                      <Stack key={item.label} gap={1}>
                        <Stack
                          direction='row'
                          sx={{
                            pt: 1,
                            color: !hasNonZeroCup ? 'text.disabled' : 'default',
                          }}
                          alignItems='center'
                        >
                          <Typography
                            sx={{
                              width: 120,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item.label}
                          </Typography>

                          <Stack direction='row' gap={4}>
                            {item.cups.map((cup) => (
                              <Stack key={cup.label}>
                                <Typography
                                  sx={{ width: 60 }}
                                  textAlign='center'
                                >
                                  {cup.label}:
                                </Typography>
                                <Typography
                                  sx={{ width: 60 }}
                                  textAlign='center'
                                >
                                  {cup.numberOf}
                                </Typography>
                              </Stack>
                            ))}
                          </Stack>
                        </Stack>
                        <Divider />
                      </Stack>
                    );
                  })}
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      {open && (
        <InventoryConfigForm open={open} handleClose={() => setOpen(false)} />
      )}
    </Container>
  );
}
