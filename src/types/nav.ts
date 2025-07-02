import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

export type NavItem = {
  label: string;
  icon: ComponentType<SvgIconProps>;
  to: string;
  addDividerAfter?: boolean;
};
