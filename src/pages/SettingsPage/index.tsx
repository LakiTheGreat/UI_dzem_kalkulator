import { Container, Divider, Stack } from '@mui/material';

import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { routes } from '../../constants/routes';
import CupCostsSettings from './cupCosts/CupCostsSettings';
import FruitsSettings from './fruits/FruitsSettings';
import CupValuesSettings from './cupValues/CupValuesSettings';

export default function Settings() {
  return (
    <Container maxWidth='sm'>
      <HeaderBreadcrumbs
        heading={'Podešavanja'}
        links={[
          {
            name: 'Osnovne postavke',
            href: routes.settings,
          },
        ]}
      />
      <Stack gap={3}>
        <Divider />

        <FruitsSettings />

        <Divider />

        <CupCostsSettings />

        <Divider />

        <CupValuesSettings />
      </Stack>
    </Container>
  );
}
