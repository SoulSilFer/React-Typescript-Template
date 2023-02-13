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
      height="100%"
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
        imgSrc="https://cdn-icons-png.flaticon.com/512/2911/2911124.png"
      />

      <GameDashboardCard
        title="Xadrez"
        onClick={() => navigate('/games/chess')}
        imgSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Chess_Board.svg/1024px-Chess_Board.svg.png"
      />

      <GameDashboardCard title="Dama" onClick={() => {}} />
    </Grid>
  );
};

export default GamePageDashboard;
