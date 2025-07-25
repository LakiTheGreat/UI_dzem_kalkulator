import { Button, Container, Divider, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Id } from 'react-toastify';

import { useLoginMutation } from '../../api/authApi';
import Logo from '../../components/Logo';
import { useAppDispatch } from '../../hooks/reduxStoreHooks';
import { useApiErrorNotification } from '../../hooks/useApiErrorNotification';
import { logInUser } from '../../store/authSlice';
import setToastIsLoading from '../../utils/toastify/setToastIsLoading';
import { useApiSuccessNotification } from '../../hooks/useApiSuccessNotification';

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [toastId, setToastId] = useState<Id>('');

  const [password, setPassword] = useState('');

  const [login, { data, isLoading, error }] = useLoginMutation();

  console.log(data);

  const handleLogin = () => {
    setToastId(setToastIsLoading(`Sačekaj....`));
    login({ password });
  };

  useApiErrorNotification({ error, toastId });
  useApiSuccessNotification({ data, toastId, message: 'Uspešno ulogovan' });

  useEffect(() => {
    if (data) {
      dispatch(logInUser(data.userId));
    }
  }, [data, dispatch]);

  return (
    <Container maxWidth='sm' sx={{ height: '70vh' }}>
      <Stack
        gap={5}
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100%' }}
      >
        <Logo width={200} height={200} />
        <Button
          fullWidth
          variant='contained'
          onClick={() => {
            dispatch(logInUser(1));
          }}
        >
          Uloguj se kao testni korisnik
        </Button>
        <Divider sx={{ width: '100%' }} />
        <Stack sx={{ width: '100%' }} gap={2}>
          <TextField
            size='small'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Unesi lozinku'
          />
          <Button
            fullWidth
            loading={isLoading}
            variant='outlined'
            disabled={!password}
            onClick={handleLogin}
          >
            Uloguj se
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
