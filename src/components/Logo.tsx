import { Box, BoxProps } from '@mui/material';
import { Link } from 'react-router';

import LogoImage from '../assets/logo.png';

interface Props extends BoxProps {
  disabledLink?: boolean;
  width?: number;
  height?: number;
  isSmall?: boolean;
  logoImage?: string;
}

export default function Logo({
  isSmall = false,
  disabledLink = false,
  height = 90,
  width = 90,
  sx,
  logoImage = LogoImage,
}: Props) {
  const logo = !isSmall ? (
    <Box
      component='img'
      sx={{
        borderRadius: 0.5,
        width,
        height,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: disabledLink ? 1 : 0.7,
        },
        ...sx,
      }}
      src={logoImage}
      alt='companyLogo'
    />
  ) : (
    <Box
      component='img'
      sx={{
        borderRadius: 0.5,
        width: 60,
        height: 60,
        transition: 'opacity 0.3s ease',
        '&:hover': {
          opacity: disabledLink ? 1 : 0.7,
        },
        ...sx,
      }}
      src={logoImage}
      alt='companyLogo'
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link style={{ paddingTop: 3.5 }} to='/'>
      {logo}
    </Link>
  );
}
