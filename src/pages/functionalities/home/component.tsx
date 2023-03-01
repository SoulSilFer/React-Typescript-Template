import { AbcRounded, Delete, PinRounded } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { GameDashboardCard } from 'components/cards';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const FunctionalitiesHomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <GameDashboardCard
        title="Pegar aleatório"
        onClick={() =>
          navigate('/tools/get-random', {
            state: { all: true }
          })
        }
        mainIcon={<PinRounded />}
        stackButtons={[
          {
            icon: <PinRounded />,
            title: 'Número aleatório',
            onClick: () =>
              navigate('/tools/get-random', {
                state: { number: true }
              })
          },
          {
            icon: <AbcRounded />,
            title: 'Texto aleatório',
            onClick: () =>
              navigate('/tools/get-random', {
                state: { string: true }
              })
          }
        ]}
      />

      <GameDashboardCard
        title="Calculadora"
        onClick={() => navigate('/tools/calculator')}
        mainIcon={<PinRounded />}
      />

      <GameDashboardCard
        title="Converter"
        onClick={() => navigate('/tools/convert/coin')}
        mainIcon={<PinRounded />}
      />
    </>
  );
};

export default FunctionalitiesHomePage;
