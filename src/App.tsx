import React from 'react';
import { useRoutes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { StyledEngineProvider } from '@mui/material';

import { SettingsContextProvider } from 'core/contexts/theme-context';
import { Theme } from 'components';
import './i18n';

import routes from './routes';

function App(): React.ReactElement {
  const content = useRoutes(routes);

  return (
    <StyledEngineProvider>
      <SettingsContextProvider>
        <Theme>
          <SnackbarProvider maxSnack={3}>{content}</SnackbarProvider>
        </Theme>
      </SettingsContextProvider>
    </StyledEngineProvider>
  );
}

export default App;
