import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

import { NavItem } from '../../types/nav';
import { getActiveLink } from '../../utils/getActiveLink';

type Props = {
  navItem: NavItem;
  open?: boolean;
  setClose?: () => void;
};

export default function NavItemButton({
  navItem,
  open = true,
  setClose,
}: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { label, to } = navItem;
  const isActive = getActiveLink(to, pathname);

  const handleClick = () => {
    setClose && setClose();
    navigate(to);
  };

  return (
    <ListItem
      key={label}
      disablePadding
      sx={{
        display: 'block',
        borderColor: isActive ? theme.palette.primary.light : 'transparent',
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    >
      <ListItemButton
        onClick={handleClick}
        sx={{
          height: 32,
          px: 2.5,
          justifyContent: open ? 'initial' : 'center',
          borderRadius: 1,
        }}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: 'center',
              mr: open ? 3 : 'auto',
              color: isActive ? theme.palette.primary.main : 'grey',
            },
          ]}
        >
          {<navItem.icon />}
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={{
            color: isActive ? theme.palette.primary.main : 'grey',
            opacity: open ? 1 : 0,
            '& .MuiListItemText-primary': {
              fontWeight: isActive ? 'bold' : 'normal',
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}
