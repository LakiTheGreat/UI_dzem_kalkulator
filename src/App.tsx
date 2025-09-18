import { Box, Stack } from '@mui/material';

import Background from './components/Background';
import Footer from './components/Footer';
import DesktopNav from './components/navigation/DesktopNav';
import MobileNav from './components/navigation/MobileNav';
import useResponsive from './hooks/useResponsive';

function App() {
  const isMobile = useResponsive('down', 'sm');

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Logo - fixed center */}
      {isMobile && <Background />}

      {/* Foreground content */}
      <Stack
        direction='column'
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
        }}
      >
        {isMobile ? <MobileNav /> : <DesktopNav />}
        <Box sx={{ flexGrow: 1 }} />
        <Footer />
      </Stack>
    </Box>
  );
}

export default App;
