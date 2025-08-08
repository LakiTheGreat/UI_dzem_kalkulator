import SettingsIcon from '@mui/icons-material/Settings';
import {
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import {
  useGetInventoryQuery,
  useGetTotalInventoryQuery,
} from '../../api/inventoryApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import InventoryConfigForm from './InventoryConfigForm';

export default function InventoryPage() {
  const { data, isLoading } = useGetTotalInventoryQuery();

  const { data: groupedInventory, isLoading: groupedInventoryIsLoading } =
    useGetInventoryQuery();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Inventar'}
        links={[
          {
            name: 'Pregled',
            href: routes.inventory,
          },
        ]}
      />
      <Stack gap={3}>
        <Stack gap={1}>
          <Typography variant='caption'>
            Kreiranjem "Proizvodne serije" stanje inventara se
            <strong> NE AŽURIRA AUTOMATSKI</strong>.
          </Typography>
          <Typography variant='caption'>
            Podaci u okviru "Inventara" su nezavisni od stanja u "Proizvodne
            serije" i neophodno je posebno uneti podatke kako za "ulaz" tako i
            za "izlaz".
          </Typography>
        </Stack>

        <Divider />

        {isLoading && <Skeleton variant='rounded' height={148} />}

        {!isLoading && data && (
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

            {data.map((item) => (
              <Stack direction='row' gap={1} key={item.label}>
                <Typography sx={{ width: 60 }}>{`${item.label}:`}</Typography>
                <Typography key={item.label}>
                  {`${item.numberOf} kom. `}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
        <Divider />
        <Stack gap={1}>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Stanje po voćkama:
          </Typography>
          {groupedInventoryIsLoading && (
            <Skeleton variant='rounded' height={200} />
          )}
          {!groupedInventoryIsLoading && (
            <Stack>
              <Divider />
              {groupedInventory?.map((item) => (
                <Stack key={item.label} gap={1}>
                  <Stack direction='row' sx={{ py: 0.5 }}>
                    <Typography
                      sx={{ width: 105 }}
                    >{`${item.label}`}</Typography>

                    <Stack gap={1}>
                      {item.cups.map((cup) => (
                        <Typography key={cup.label}>
                          {`${cup.numberOf} kom. (${cup.label})`}
                        </Typography>
                      ))}
                    </Stack>
                  </Stack>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>

      {open && (
        <InventoryConfigForm open={open} handleClose={() => setOpen(false)} />
      )}
    </Container>
  );
}
