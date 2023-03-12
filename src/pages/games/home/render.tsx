import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Delete, Grid3x3Rounded } from '@mui/icons-material';
import { Box } from '@mui/material';

import { DashboardMainCard } from 'components/cards';

const GamePageDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        height: 'fit-content',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}
    >
      <DashboardMainCard
        title={t('ticTacToe')}
        onClick={() => navigate('/games/tic-tac-toe')}
        mainIcon={<Grid3x3Rounded />}
        stackButtonsLength={0}
      />

      <DashboardMainCard
        title={t('ticTacToe')}
        onClick={() => navigate('/games/jokenpo')}
        mainIcon={
          <img
            alt="jokenpo"
            src="/static/jokenpo.png"
            style={{
              width: '40px',
              height: '40px',
              marginRight: '5px',
              borderRadius: '50%',
              filter: 'invert(1)'
            }}
          />
        }
        stackButtonsLength={0}
      />
    </Box>
  );
};

export default GamePageDashboard;
