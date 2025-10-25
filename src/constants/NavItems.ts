import CalculateIcon from '@mui/icons-material/Calculate';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SettingsIcon from '@mui/icons-material/Settings';

import JarIcon from '../components/customIcons/JarIcon';
import TomatoIcon from '../components/customIcons/TomatoIcon';
import { NavItem } from '../types/nav';
import {
  routesBouquets,
  routesGeneralCalculator,
  routesJam,
  routesSettings,
  routesTomatoes,
} from './routes';

export const NavItems: NavItem[] = [
  {
    label: 'Proizvodne serije',
    icon: FolderCopyIcon,
    to: routesJam.orders,
    groupTitle: 'Džemovi',
  },
  {
    label: 'Inventar',
    icon: InventoryIcon,
    to: routesJam.inventory,
    groupTitle: 'Džemovi',
  },
  {
    label: 'Transakcije',
    icon: JarIcon,
    to: routesJam.transactions,
    addDividerAfter: true,
    groupTitle: 'Džemovi',
  },

  /////////////////////////////////////////////
  {
    label: 'Inventar',
    icon: InventoryIcon,
    to: routesTomatoes.inventory,
    groupTitle: 'Čeri paradajz',
  },
  {
    label: 'Transakcije',
    icon: TomatoIcon,
    to: routesTomatoes.transactions,
    addDividerAfter: true,
    groupTitle: 'Čeri paradajz',
  },
  /////////////////////////////////////////////
  {
    label: 'Transakcije',
    icon: LocalFloristIcon,
    to: routesBouquets.root,
    addDividerAfter: true,
    groupTitle: 'Buketi',
  },
  /////////////////////////////////////////////
  {
    label: 'Kalkulator',
    icon: CalculateIcon,
    to: routesGeneralCalculator.root,
    addDividerAfter: true,
    groupTitle: 'Kalkulator cene',
  },
  /////////////////////////////////////////////
  {
    label: 'Podešavanja',
    icon: SettingsIcon,
    to: routesSettings.root,
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
