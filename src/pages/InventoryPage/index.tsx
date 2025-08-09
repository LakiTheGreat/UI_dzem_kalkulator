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
  const { data, isFetching } = useGetTotalInventoryQuery();

  const { data: groupedInventory, isFetching: groupedInventoryIsFetching } =
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
                <Stack>
                  {/* <Divider /> */}
                  {groupedInventory?.map((item) => (
                    <Stack key={item.label} gap={1}>
                      <Stack direction='row' sx={{ pt: 1 }} alignItems='center'>
                        <Typography
                          sx={{
                            width: 120,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >{`${item.label}`}</Typography>

                        <Stack direction='row' gap={4}>
                          {item.cups.map((cup) => (
                            <Stack key={cup.label}>
                              <Typography
                                sx={{ width: 60 }}
                                textAlign='center'
                              >{`${cup.label}:`}</Typography>
                              <Typography
                                sx={{ width: 60 }}
                                textAlign='center'
                              >{`${cup.numberOf}`}</Typography>
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
