import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

export type NavItem = {
  id: number;
  label: string;
  icon: ComponentType<SvgIconProps>;
  to: string;
  addDividerAfter?: boolean;
  groupTitle?: string;
};
