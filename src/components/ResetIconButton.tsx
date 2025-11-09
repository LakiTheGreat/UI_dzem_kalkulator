import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton, type IconButtonProps } from '@mui/material';
import { useState } from 'react';

type Props = {
  isLarge?: boolean;
  handleReset: () => void;

  label?: string;
} & IconButtonProps;

export default function ResetIconButton({
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
    <IconButton
      size={isLarge ? 'large' : 'medium'}
      onClick={handleClick}
      {...buttonProps}
    >
      <RefreshIcon
        sx={{
          '@keyframes spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
          animation: rotating ? 'spin 0.3s linear' : 'none',
        }}
      />
    </IconButton>
  );
}
