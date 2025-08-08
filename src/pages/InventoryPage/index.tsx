import { Container, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { useGetTotalInventoryQuery } from '../../api/inventoryApi';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';

export default function InventoryPage() {
  const { data, isLoading } = useGetTotalInventoryQuery();

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
          // <Card variant='outlined'>
          //   <CardContent>
          <Stack gap={1}>
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Ukupno stanje:
            </Typography>

            {data.map((item) => (
              <Stack direction='row' gap={1} key={item.label}>
                <Typography sx={{ width: 105 }}>{`Broj teglica:`}</Typography>
                <Typography key={item.label}>
                  {`${item.numberOf} kom. (${item.label})`}
                </Typography>
              </Stack>
            ))}
          </Stack>
          //   </CardContent>
          // </Card>
        )}
        <Divider />
      </Stack>
    </Container>
  );
}
