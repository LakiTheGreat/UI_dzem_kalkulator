import { Box, Container, Divider, Stack, Typography } from '@mui/material';

import logo from './assets/logo.png';
import Form from './form';
import { colors } from './constants';

function App() {
  return (
    <>
      <Container sx={{ my: 5 }}>
        <Stack gap={2}>
          <Stack direction='row' alignItems='center' gap={1}>
            <Box
              component='img'
              alt='logo'
              src={logo}
              sx={{ width: 100, height: 100 }}
            />
            <Typography
              variant='h3'
              sx={{ fontStyle: 'italic', fontWeight: 'bold' }}
            >
              Džmulator
            </Typography>
          </Stack>

          <Divider
            sx={{
              color: colors.secondary,
              bgcolor: colors.secondary,
              height: 2,
            }}
          />

          <Form />
        </Stack>
      </Container>
      <Stack sx={{ bgcolor: colors.secondary, py: 1 }}>
        <Typography
          variant='caption'
          textAlign='center'
          sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
        >
          - Džemarijum - Sva prava Dule zadržo © 2025 -
        </Typography>
      </Stack>
    </>
  );
}

export default App;
