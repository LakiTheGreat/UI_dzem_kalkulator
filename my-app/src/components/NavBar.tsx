import { Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import { colors } from '../constants';
import { routes } from '../constants/routes';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack
      sx={{ bgcolor: colors.secondary, p: 1 }}
      direction='row'
      justifyContent='center'
      gap={2}
    >
      <Button
        variant={
          location.pathname === `/${routes.dzem_calculator}`
            ? 'contained'
            : 'outlined'
        }
        size='large'
        fullWidth
        sx={{ height: 60 }}
        onClick={() => navigate(`/${routes.dzem_calculator}`)}
      >
        Dzemovi
      </Button>
      <Button
        variant={
          location.pathname === `/${routes.general_calculator}`
            ? 'contained'
            : 'outlined'
        }
        size='large'
        fullWidth
        sx={{ height: 60 }}
        onClick={() => navigate(`/${routes.general_calculator}`)}
      >
        Opšti kalkulator
      </Button>
    </Stack>
  );
}
