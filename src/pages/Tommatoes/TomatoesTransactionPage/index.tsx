import { Container } from '@mui/material';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import { routesTomatoes } from '../../../constants/routes';

export default function TomatoesTransactionPage() {
  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Transakcije'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
      />
      TRANSACKIJE YA ČERI PARADAJZ
    </Container>
  );
}
