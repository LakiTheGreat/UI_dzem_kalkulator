import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { Button, Typography, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { JSX, ReactElement, useState } from 'react';

import { Stack } from '@mui/material';

const createPromise = (): [Promise<boolean>, (value: boolean) => void] => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let resolver: (value: boolean) => void = () => {};
  const promise = new Promise<boolean>((resolve) => {
    resolver = resolve;
  });
  return [promise, resolver];
};

type ConfirmDialogContent = {
  title: string;
  contentSubtitle: string;
  contentWarning?: string;
  contentMessage?: string;
  confirmLabel?: string;
  icon?: ReactElement;
  nonWarningModal?: boolean;
  showRegularButton?: boolean;
};

export default function useConfirmDialog(): [
  (payload: ConfirmDialogContent) => Promise<boolean>,
  () => JSX.Element
] {
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ConfirmDialogContent>();
  const [resolver, setResolver] = useState<{
    resolve: (value: boolean) => void;
  }>();
  const theme = useTheme();

  const getConfirmation = async (payload: ConfirmDialogContent) => {
    setContent(payload);
    setOpen(true);
    const [promise, resolve] = await createPromise();
    setResolver({ resolve });

    return promise;
  };

  const handleClick = async (status: boolean) => {
    setOpen(false);
    resolver?.resolve(status);
  };

  const Confirmation = () => (
    <Dialog open={open} onClose={() => handleClick(false)}>
      <Stack direction='row' gap={2} sx={{ p: 3 }} alignItems='center'>
        {content?.icon || <DeleteIcon />}
        <Typography variant='subtitle2'>{content?.title}</Typography>
      </Stack>
      <DialogContent sx={{ maxWidth: 600, px: 8 }}>
        <DialogContentText fontWeight='600' color='InfoText'>
          {content?.contentSubtitle}
        </DialogContentText>
        <DialogContentText
          fontWeight='600'
          sx={{ color: theme.palette.error.main }}
        >
          {content?.contentWarning}
        </DialogContentText>
        <DialogContentText sx={{ mt: 3 }} fontStyle='italic'>
          {content?.contentMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          variant='contained'
          color={content?.nonWarningModal ? 'primary' : 'error'}
          onClick={() => handleClick(true)}
          size='large'
        >
          {content?.confirmLabel || 'Da'}
        </Button>
        <Button
          fullWidth
          color='inherit'
          size='large'
          variant='outlined'
          aria-label='cancel'
          onClick={() => handleClick(false)}
        >
          Ne
        </Button>
      </DialogActions>
    </Dialog>
  );

  return [getConfirmation, Confirmation];
}
