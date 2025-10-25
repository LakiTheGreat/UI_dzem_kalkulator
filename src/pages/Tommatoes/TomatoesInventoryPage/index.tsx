import { Container } from '@mui/material';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

import { routesTomatoes } from '../../../constants/routes';

export default function TomatoesInventoryPage() {
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
      TomatoesInventoryPage YA ČERI PARADAJZ
    </Container>
  );
}
