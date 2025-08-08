import CalculateIcon from '@mui/icons-material/Calculate';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';

import { NavItem } from '../types/nav';
import { routes } from './routes';

export const NavItems: NavItem[] = [
  {
    label: 'Proizvodne serije',
    icon: FolderCopyIcon,
    to: routes.orders,
  },
  {
    label: 'Inventar',
    icon: InventoryIcon,
    to: routes.inventory,
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
