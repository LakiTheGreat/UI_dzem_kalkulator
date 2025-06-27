import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import { Outlet } from 'react-router';

import logo from './assets/logo.png';
import { AppName, colors } from './constants';
import NavBar from './components/NavBar';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Main content */}
      <Container sx={{ my: 5, flexGrow: 1 }} maxWidth='sm'>
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
              color: colors.secondary,
              bgcolor: colors.secondary,
              height: 2,
            }}
          />

          <Outlet />
        </Stack>
      </Container>

      {/* Footer */}
      <Stack
        sx={{
          bgcolor: colors.secondary,
          py: 1,
          mt: 'auto', // Push footer to bottom
        }}
      >
        <Typography
          variant='caption'
          textAlign='center'
          sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
        >
          {`${AppName} - Sva prava Dule zadržo © ${new Date().getFullYear()}`}
        </Typography>
      </Stack>
    </Box>
  );
}

export default App;
