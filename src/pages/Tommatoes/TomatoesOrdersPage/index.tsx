import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Container, IconButton, Stack } from '@mui/material';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';

export default function TomatoesOrdersPage() {
  return (
    <Container>
      <HeaderBreadcrumbs
        heading={'Proizvodne serije'}
        links={[
          {
            name: 'Čeri paradajz',
            href: routesTomatoes.root,
          },
        ]}
        action={
          <IconButton color='primary'>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={3}>
        <Container maxWidth='sm'>ORDERS</Container>
      </Stack>
    </Container>
  );
}
