import React from 'react';
import {
  Drawer,
  Divider,
  Toolbar,
  Box,
  Typography,
  IconButton,
  SvgIcon,
  TextField,
  MenuItem
} from '@mui/material';

import { Close as CloseIcon } from '@mui/icons-material';
import { useSettings } from 'core/contexts/theme-context';
import { useTranslation } from 'react-i18next';

type Props = {
  onClose: () => void;
  open: boolean;
};

const Settings: React.FC<Props> = ({ onClose, open }) => {
  const { t, i18n } = useTranslation();

  const selectedLanguage = i18n.language;

  const handleChangeLanguage = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = e.target;
    void i18n.changeLanguage(value);
  };

  const { lightMode, switchThemeMode } = useSettings();

  return (
    <Drawer
      open={open}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': {
          width: 350,
          boxSizing: 'border-box'
        }
      }}
      onClose={onClose}
    >
      <Toolbar>
        <Box
          display="flex"
          flexGrow={1}
          flexWrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>{t('settings')}</Typography>

          <IconButton onClick={onClose}>
            <SvgIcon>
              <CloseIcon />
            </SvgIcon>
          </IconButton>
        </Box>
      </Toolbar>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <TextField
          select
          label={t('language')}
          fullWidth
          value={selectedLanguage}
          onChange={handleChangeLanguage}
        >
          <MenuItem value="pt-BR">{t('portuguese')}</MenuItem>
          <MenuItem value="en-US">{t('english')}</MenuItem>
        </TextField>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        sx={{ mt: 3, width: '100%', px: 3 }}
        gap={3}
      >
        <TextField
          select
          label={t('theme')}
          fullWidth
          value={lightMode ? 'light' : 'dark'}
          onChange={switchThemeMode}
        >
          <MenuItem value="light">{t('light')}</MenuItem>
          <MenuItem value="dark">{t('dark')}</MenuItem>
        </TextField>
      </Box>
    </Drawer>
  );
};

export default Settings;
