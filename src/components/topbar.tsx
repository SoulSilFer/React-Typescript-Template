import React from 'react';
import { Badge, Box, IconButton, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import {
  Menu as MenuIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

type TopbarProps = {
  handleDrawerToggle?: () => void;
  handleSettingsDrawerToggle: () => void;
};

const Topbar: React.FC<TopbarProps> = ({
  handleDrawerToggle,
  handleSettingsDrawerToggle
}) => {
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar
        variant="regular"
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {handleDrawerToggle ? (
          <IconButton
            size="large"
            edge="start"
            color="default"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <div />
        )}

        <Box display="flex" alignItems="center" flexWrap="nowrap">
          <IconButton
            size="large"
            edge="end"
            color="default"
            onClick={handleSettingsDrawerToggle}
            sx={{ margin: '0 2px' }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </Box>
  );
};

export default Topbar;
