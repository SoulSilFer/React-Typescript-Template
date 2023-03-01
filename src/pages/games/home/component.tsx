import { Delete } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { GameDashboardCard } from 'components/cards';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const GamePageDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Grid
      container
      bgcolor="primary.main"
      height="100vh"
      gridTemplateColumns="repeat(3, 1fr)"
      display="grid"
      gap={2}
      p={2}
      m={2}
      justifyItems="center"
      alignItems="center"
    >
      <GameDashboardCard
        title={t('ticTacToe')}
        onClick={() => navigate('/games/tic-tac-toe')}
        mainIcon={<Delete />}
      />

      <GameDashboardCard
        title="Xadrez"
        mainIcon={<Delete />}
        onClick={() => navigate('/games/chess')}
      />

      <GameDashboardCard
        title="jokenpô"
        mainIcon={<Delete />}
        onClick={() => navigate('/games/jokenpo')}
      />
    </Grid>
  );
};

export default GamePageDashboard;
