import { Box, Grid } from '@mui/material';
import { GameDashboardCard } from 'components/cards';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FunctionalitiesHomePage: React.FC = () => {
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
        title="Pegar aleatório"
        onClick={() => navigate('/functionalities/get-random')}
        imgSrc="https://cdn-icons-png.flaticon.com/512/2911/2911124.png"
      />
    </Grid>
  );
};

export default FunctionalitiesHomePage;
