import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

import { ReactComponent as Tomato } from '../../assets/icons/tomato.svg';

export default function TomatoIcon(props: SvgIconProps) {
  return <SvgIcon {...props} component={Tomato} inheritViewBox {...props} />;
}
