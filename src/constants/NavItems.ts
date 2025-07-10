import AddBoxIcon from '@mui/icons-material/AddBox';
import CalculateIcon from '@mui/icons-material/Calculate';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavItem } from '../types/nav';
import { routes } from './routes';

export const NavItems: NavItem[] = [
  {
    label: 'Nova porudžbina',
    icon: AddBoxIcon,
    to: routes.new_order,
    addDividerAfter: true,
  },
  {
    label: 'Kalkulator',
    icon: CalculateIcon,
    to: routes.general_calculator,
    addDividerAfter: true,
  },
  {
    label: 'Podešavanja',
    icon: SettingsIcon,
    to: routes.settings,
  },
];
