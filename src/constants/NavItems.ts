import CalculateIcon from '@mui/icons-material/Calculate';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SettingsIcon from '@mui/icons-material/Settings';

import JarIcon from '../components/customIcons/JarIcon';
import TomatoIcon from '../components/customIcons/TomatoIcon';
import { NavItem } from '../types/nav';
import { routes } from './routes';

export const NavItems: NavItem[] = [
  {
    label: 'Proizvodne serije',
    icon: FolderCopyIcon,
    to: routes.orders,
    groupTitle: 'Džemovi',
  },
  {
    label: 'Inventar',
    icon: InventoryIcon,
    to: routes.inventory,
    groupTitle: 'Džemovi',
  },
  {
    label: 'Transakcije',
    icon: JarIcon,
    to: routes.transactions,
    addDividerAfter: true,
    groupTitle: 'Džemovi',
  },

  /////////////////////////////////////////////
  {
    label: 'Inventar',
    icon: InventoryIcon,
    to: routes.general_calculator,
    groupTitle: 'Čeri paradajz',
  },
  {
    label: 'Transakcije',
    icon: TomatoIcon,
    to: routes.general_calculator,
    addDividerAfter: true,
    groupTitle: 'Čeri paradajz',
  },
  /////////////////////////////////////////////
  {
    label: 'Transakcije',
    icon: LocalFloristIcon,
    to: routes.bouquets,
    addDividerAfter: true,
    groupTitle: 'Buketi',
  },
  /////////////////////////////////////////////
  {
    label: 'Kalkulator',
    icon: CalculateIcon,
    to: routes.general_calculator,
    addDividerAfter: true,
    groupTitle: 'Kalkulator cene',
  },
  /////////////////////////////////////////////
  {
    label: 'Podešavanja',
    icon: SettingsIcon,
    to: routes.settings,
    groupTitle: 'Ostalo',
    addDividerAfter: true,
  },
];

export const GroupedNavItems = NavItems.reduce((groups, item) => {
  const title = item.groupTitle || '__ungrouped';
  if (!groups[title]) groups[title] = [];
  groups[title].push(item);
  return groups;
}, {} as Record<string, NavItem[]>);
