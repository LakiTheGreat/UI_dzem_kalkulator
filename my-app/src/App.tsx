import { Box, Container, Stack, Typography } from '@mui/material';

import logo from './assets/logo.png';
import Form from './form';

function App() {
  return (
    <>
      <Container sx={{ my: 5 }}>
        <Stack alignItems='center' gap={2}>
          <Box
            component='img'
            alt='logo'
            src={logo}
            sx={{ width: 100, height: 100 }}
          />
          <Form />
        </Stack>
      </Container>
      <Stack sx={{ bgcolor: '#DF3A15', py: 1 }}>
        <Typography
          variant='caption'
          textAlign='center'
          sx={{ fontWeight: 'bold', color: '#fff' }}
        >
          - Džemarijum - Sva prava Dule zadržo 2025 -
        </Typography>
      </Stack>
    </>
  );
}

export default App;
