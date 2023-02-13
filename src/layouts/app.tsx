import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Topbar from 'components/topbar';
import SettingsDrawer from 'components/setttings';
import Sidebar from 'components/sidebar';

const drawerWidth = 280;

type Props = {
  dashboard?: boolean;
};

const AppLayout: React.FC<Props> = ({ dashboard }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleDrawerToggle = (): void => setMobileOpen(!mobileOpen);
  const handleToggleSettingsDrawer = (): void => setSettingsOpen(!settingsOpen);

  return (
    <Box sx={{ bgcolor: 'background.neutral' }}>
      <CssBaseline />

      <Topbar
        handleDrawerToggle={handleDrawerToggle}
        handleSettingsDrawerToggle={handleToggleSettingsDrawer}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <Box
        sx={{
          pl: { xl: `${drawerWidth}px` }
        }}
      >
        {dashboard ? (
          <Box
            sx={{
              m: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh'
            }}
          >
            <Outlet />
          </Box>
        ) : (
          <Box
            sx={{
              m: 2
            }}
          >
            <Outlet />
          </Box>
        )}
      </Box>

      <SettingsDrawer
        open={settingsOpen}
        onClose={handleToggleSettingsDrawer}
      />
    </Box>
  );
};

export default AppLayout;
