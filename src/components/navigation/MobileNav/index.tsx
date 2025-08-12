import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { api } from '../../../api';
import { AppName } from '../../../constants';
import { GroupedNavItems } from '../../../constants/NavItems';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxStoreHooks';
import useResponsive from '../../../hooks/useResponsive';
import { logOutUser } from '../../../store/authSlice';
import Logo from '../../Logo';
import NavItemButton from '../NavItemButton';

export default function MobileNav() {
  const dispatch = useAppDispatch();
  const isTablet = useResponsive('down', 'md');
  const isMobile = useResponsive('down', 'sm');
  const userId = useAppSelector((state) => state.auth.userId);

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Stack
            direction={isMobile ? 'column' : 'row'}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent='space-between'
            sx={{ width: '100%' }}
          >
            <Stack
              sx={{
                py: 1,
                width: { xs: '100%', sm: 'auto' },
              }}
              direction='row'
              alignItems='center'
              gap={2}
            >
              <Logo isSmall={true} />
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {AppName}
              </Typography>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
        <Stack justifyContent='space-between' sx={{ height: '100%' }}>
          <Stack alignItems='center' sx={{ pt: 1 }}>
            <List sx={{ px: 1 }}>
              {Object.entries(GroupedNavItems).map(([groupTitle, items]) => (
                <Stack key={groupTitle}>
                  {groupTitle !== '__ungrouped' && (
                    <Typography
                      variant='subtitle2'
                      sx={{ px: 2, my: 1, fontWeight: 'bold' }}
                    >
                      {groupTitle}
                    </Typography>
                  )}
                  {items.map((navItem) => (
                    <Stack key={navItem.label}>
                      <NavItemButton
                        navItem={navItem}
                        open={open}
                        setClose={() => setOpen(false)}
                      />
                      {navItem.addDividerAfter && <Divider sx={{ my: 1 }} />}
                    </Stack>
                  ))}
                </Stack>
              ))}
            </List>
          </Stack>
          <Stack sx={{ mb: 6 }} gap={1}>
            <Typography textAlign='center' sx={{ fontWeight: 'bold' }}>
              {userId === 1 ? 'Testni korisnik' : 'Dušan Pantelić'}
            </Typography>
            <Button
              sx={{ mx: 1 }}
              variant='outlined'
              onClick={() => {
                dispatch(logOutUser());
                dispatch(api.util.resetApiState());
              }}
            >
              Izloguj se
            </Button>
          </Stack>
        </Stack>
      </Drawer>
      <Box
        component='main'
        data-testid='MobileNav'
        sx={{ overflow: 'auto', pb: isTablet ? 10 : 4, mt: 3 }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
