import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Divider, type Breakpoint } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  maxWidth?: Breakpoint;
  children: ReactNode;
}

export default function GeneralDialog({
  handleClose,
  children,
  open,
  title,
  maxWidth = 'lg',
}: Props) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          gap={0.5}
        >
          <Typography variant='h4' sx={{ fontSize: { xs: 20, md: 24 } }}>
            {title}
          </Typography>

          <IconButton onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
