import { Box } from '@mui/material';

import LogoImage1 from '../assets/logo1.png';
import SVG_Tegla from '../assets/SVG_Tegla.png';
import SVG_Naradnza from '../assets/SVG_Naradnza.png';
import SVG_Smokva from '../assets/SVG_Smokva.png';
import SVG_Jagoda_1 from '../assets/SVG_Jagoda_1.png';
import Logo from './Logo';

export default function Background() {
  const generalStyle = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 0,
  };

  return (
    <Box>
      <Box
        sx={{
          ...generalStyle,
          top: '5%',
          left: '-20%',
          opacity: 0.03,
          transform: 'translate(-20%, -5%) rotate(25deg)',
        }}
      >
        <Logo logoImage={SVG_Tegla} height={200} width={250} />
      </Box>
      <Box
        sx={{
          ...generalStyle,
          top: '5%',
          right: '-70%',
          opacity: 0.05,
          transform: 'translate(-70%, -5%) rotate(-25deg)',
        }}
      >
        <Logo logoImage={SVG_Jagoda_1} height={200} width={250} />
      </Box>
      <Box
        sx={{
          ...generalStyle,
          top: '30%',
          left: '50%',
          opacity: 0.03,
          transform: 'translate(-50%, -30%)',
        }}
      >
        <Logo logoImage={LogoImage1} height={250} width={300} />
      </Box>
      <Box
        sx={{
          ...generalStyle,
          bottom: '10%',
          right: '-75%',
          opacity: 0.1,
          transform: 'translate(-75%, -10%)',
        }}
      >
        <Logo logoImage={SVG_Naradnza} height={200} width={250} />
      </Box>
      <Box
        sx={{
          ...generalStyle,
          bottom: '0%',
          left: '-15%',
          opacity: 0.1,
          transform: 'translate(-15%, -0%) rotate(25deg)',
        }}
      >
        <Logo logoImage={SVG_Smokva} height={200} width={250} />
      </Box>
    </Box>
  );
}
