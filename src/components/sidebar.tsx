import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';

import { Dashboard as DashboardIcon } from '@mui/icons-material';
import Logo from './logo';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

type SidebarProps = {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sections = [
    { name: 'Dashboard', path: 'dashboard', Icon: DashboardIcon },
    { name: t('games'), path: '/games', Icon: DashboardIcon },
    { name: 'Funcionalidades', path: 'dashboard', Icon: DashboardIcon }
  ];

  const drawer = (
    <Grid>
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 2,
            bgcolor: '#EDEFF1'
          }}
        >
          <Avatar alt="photoURL" />

          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
              John Doe
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Platform Admin
            </Typography>
          </Box>
        </Box>
      </Box>

      <List>
        {sections.map(({ name, path, Icon }) => (
          <ListItem
            key={name}
            onClick={() => navigate(path)}
            sx={{
              color: 'text.secondary',
              borderRadius: 1,
              py: 1.5,
              pl: 2.5,
              pr: 2,
              mb: 1,
              cursor: 'pointer',
              '&:hover, &.Mui-selected': {
                color: 'primary.main',
                bgcolor: 'action.hover'
              },
              '&.Mui-selected': {
                bgcolor: 'background.neutral'
              }
            }}
          >
            <ListItemIcon>
              <Icon />
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { lg: 'block', xl: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'background.neutral'
          }
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', xl: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            bgcolor: 'background.neutral'
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
