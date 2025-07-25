import { Button, Container, Stack } from '@mui/material';
import { useAppDispatch } from '../../hooks/reduxStoreHooks';
import { logInUser } from '../../store/authSlice';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth='sm'>
      <Stack gap={5}>
        <Button
          variant='contained'
          onClick={() => {
            dispatch(logInUser(1));
          }}
        >
          Uloguj se test
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            dispatch(logInUser(12397));
          }}
        >
          Uloguj se kao Dule
        </Button>
      </Stack>
    </Container>
  );
}
