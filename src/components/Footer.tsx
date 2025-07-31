import { Stack, Typography } from '@mui/material';

import { AppName } from '../constants';
import { APP_VERSION } from '../version';

export default function Footer() {
  return (
    <Stack
      sx={{
        bgcolor: ({ palette }) => palette.secondary.light,
        py: 1,
        mt: 'auto',
        zIndex: 1300,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography
        variant='caption'
        textAlign='center'
        sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
      >
        {`${AppName} - Sva prava Dule zadržo © ${new Date().getFullYear()} Verzija: ${APP_VERSION}`}
      </Typography>
    </Stack>
  );
}
