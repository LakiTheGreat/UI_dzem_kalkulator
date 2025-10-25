import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Container,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { routesTomatoes } from '../../../constants/routes';

export default function TomatoesInventoryPage() {
  const isFetching = false;
  const data = true;

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
        action={
          <IconButton color='primary'>
            <AddCircleOutlineIcon fontSize='large' />
          </IconButton>
        }
      />
      <Stack gap={3}>
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
              </Stack>
              <Stack direction='row' gap={4}>
                data
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
