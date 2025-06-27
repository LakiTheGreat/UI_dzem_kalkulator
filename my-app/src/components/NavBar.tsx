import { Button, ButtonGroup, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import { routes } from '../constants/routes';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Stack direction='row' justifyContent='center' gap={2}>
      <ButtonGroup>
        <Button
          variant={
            location.pathname === `/${routes.dzem_calculator}`
              ? 'contained'
              : 'outlined'
          }
          size='large'
          fullWidth
          sx={{ height: 57, fontWeight: 'bold' }}
          onClick={() => navigate(`/${routes.dzem_calculator}`)}
        >
          Džem profit kalkulator
        </Button>
        <Button
          variant={
            location.pathname === `/${routes.general_calculator}`
              ? 'contained'
              : 'outlined'
          }
          size='large'
          fullWidth
          sx={{ height: 57, fontWeight: 'bold' }}
          onClick={() => navigate(`/${routes.general_calculator}`)}
        >
          Opšti kalkulator
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
