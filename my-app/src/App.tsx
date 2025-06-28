import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router';

import logo from './assets/logo.png';
import { AppName } from './constants';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Container sx={{ mt: 1.5, mb: 5, flexGrow: 1 }} maxWidth='sm'>
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
              {AppName}
            </Typography>
          </Stack>

          <NavBar />

          <Divider
            sx={{
              color: ({ palette }) => palette.secondary.main,
              bgcolor: ({ palette }) => palette.secondary.main,
              height: 2,
            }}
          />

          <Outlet />
        </Stack>
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
