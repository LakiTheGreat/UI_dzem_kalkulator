import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { ReactComponent as Jar } from '../../assets/icons/jar.svg';

export default function JarIcon(props: SvgIconProps) {
  return <SvgIcon {...props} component={Jar} inheritViewBox {...props} />;
}
