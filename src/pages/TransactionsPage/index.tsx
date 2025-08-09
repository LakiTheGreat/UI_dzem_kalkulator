import { Container, Stack } from '@mui/material';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';

export default function TransactionsPage() {
  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Pregled',
            href: routes.inventory,
          },
        ]}
      />
      <Stack gap={3}>asdasd</Stack>
    </Container>
  );
}
