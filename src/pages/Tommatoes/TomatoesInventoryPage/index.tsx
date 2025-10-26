import { Container, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { useGetTomatoPriceQuery } from '../../../api/constantApi';
import { useGetTomatoTotalsQuery } from '../../../api/tomatoesApi';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';
import { useAppSelector } from '../../../hooks/reduxStoreHooks';
import FormattedPrice from '../../../utils/FormattedPrice';

export default function TomatoesInventoryPage() {
  const userId = useAppSelector((state) => state.auth.userId);

  const { data, isLoading } = useGetTomatoTotalsQuery();

  const { data: tomatoPrice, isLoading: tomatoPriceIsLoading } =
    useGetTomatoPriceQuery(userId || 0);

  const somethingIsLoading = isLoading || tomatoPriceIsLoading;

  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Inventar'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
      />

      <Stack gap={4}>
        <Stack gap={1}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              Ukupno stanje:
            </Typography>
          </Stack>
          {somethingIsLoading && <Skeleton variant='rounded' height={56} />}
          {!somethingIsLoading && data && (
            <Stack direction='row' gap={4} sx={{ width: '100%' }}>
              {data.map((item) => (
                <Stack key={item.cupTypeId} sx={{ width: '100%' }} gap={1}>
                  <Stack
                    direction='row'
                    sx={{ width: '100%' }}
                    justifyContent='space-around'
                  >
                    <Stack
                      gap={1}
                      // sx={{ width: ORDER_WIDTH }}
                      alignItems='center'
                    >
                      <Typography>{item.label}:</Typography>
                      <Typography>{item.totalCups} kom. </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                      <Typography textAlign='center' sx={{ flex: 1 }}>
                        Procenjena prodajna vrednost:
                      </Typography>
                      <FormattedPrice
                        price={item.totalCups * (tomatoPrice?.value || 1)}
                      />
                    </Stack>
                  </Stack>
                  <Divider />
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
