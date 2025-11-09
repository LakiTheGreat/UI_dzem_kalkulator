import RefreshIcon from '@mui/icons-material/Refresh';
import { Button } from '@mui/material';
import { useState } from 'react';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type Props = {
  isLarge?: boolean;
  handleReset: () => void;

  label?: string;
} & MuiButtonProps;

export default function ResetButton({
  isLarge = true,
  handleReset,
  label = 'Resetuj filtere',
  ...buttonProps
}: Props) {
  const [rotating, setRotating] = useState(false);

  const handleClick = () => {
    setRotating(true);
    handleReset();
    setTimeout(() => setRotating(false), 500);
  };

  return (
    <Button
      {...buttonProps}
      variant='outlined'
      size={isLarge ? 'large' : 'medium'}
      onClick={handleClick}
      startIcon={
        <RefreshIcon
          sx={{
            '@keyframes spin': {
              from: { transform: 'rotate(0deg)' },
              to: { transform: 'rotate(360deg)' },
            },
            animation: rotating ? 'spin 0.3s linear' : 'none',
          }}
        />
      }
    >
      {label}
    </Button>
  );
}
