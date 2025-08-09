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
            <br />
            <strong> NE AŽURIRA AUTOMATSKI</strong>.
          </Typography>
          <Typography variant='caption'>
            Podaci u okviru "Inventara" su nezavisni od stanja u "Proizvodne
            serije". Neophodno je posebno uneti podatke na stranici
            "Transakcije".
          </Typography>
        </Stack>

        <Divider />

        {isLoading && <Skeleton variant='rounded' height={104} />}
        <Stack gap={4}>
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
              <Stack direction='row' gap={4}>
                {data.map((item) => (
                  <Stack gap={1} key={item.label}>
                    <Typography
                      sx={{ width: 60 }}
                    >{`${item.label}:`}</Typography>
                    <Typography key={item.label}>
                      {`${item.numberOf} kom. `}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          )}

          <Stack gap={1}>
            {groupedInventoryIsLoading && (
              <Skeleton variant='rounded' height={260} />
            )}
            {!groupedInventoryIsLoading && (
              <>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  Stanje po voćkama:
                </Typography>
                <Stack>
                  {/* <Divider /> */}
                  {groupedInventory?.map((item) => (
                    <Stack key={item.label} gap={1}>
                      <Stack direction='row' sx={{ pt: 1 }} alignItems='center'>
                        <Typography
                          sx={{ flex: 1 }}
                        >{`${item.label}`}</Typography>

                        <Stack sx={{ flex: 2 }} direction='row' gap={4}>
                          {item.cups.map((cup) => (
                            <Stack key={cup.label}>
                              <Typography>{`${cup.label}:`}</Typography>
                              <Typography>{`${cup.numberOf} kom.`}</Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                      <Divider />
                    </Stack>
                  ))}
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
