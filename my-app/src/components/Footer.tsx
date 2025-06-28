import { Stack, Typography } from '@mui/material';

import { AppName } from '../constants';

export default function Footer() {
  return (
    <Stack
      sx={{
        bgcolor: ({ palette }) => palette.secondary.main,
        py: 1,
        mt: 'auto',
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
  );
}
