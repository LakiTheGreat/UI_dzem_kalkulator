import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

interface Props extends TypographyProps {
  children: ReactNode;
}

const NotificationMessage = ({ children }: Props) => (
  <>
    <Typography
      variant='body1'
      sx={{ fontSize: { xs: 16, sm: 24 }, p: { xs: 0, sm: 1 }, minWidth: 250 }}
    >
      {children}
    </Typography>
  </>
);

export default NotificationMessage;
