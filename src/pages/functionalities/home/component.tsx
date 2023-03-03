import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  AbcRounded,
  AttachMoneyRounded,
  CalculateRounded,
  PinRounded,
  ShuffleRounded,
  StraightenRounded,
  SwapHorizRounded
} from '@mui/icons-material';

import { GameDashboardCard } from 'components/cards';

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
        mainIcon={<ShuffleRounded />}
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
        mainIcon={<CalculateRounded />}
      />

      <GameDashboardCard
        title="Converter"
        mainIcon={<SwapHorizRounded />}
        stackButtons={[
          {
            icon: <AttachMoneyRounded />,
            title: 'Valor monetário',
            onClick: () => navigate('/tools/convert/coin')
          },
          {
            icon: <StraightenRounded />,
            title: 'Unidade de comprimento',
            onClick: () => navigate('/tools/convert/size')
          }
        ]}
      />
    </>
  );
};

export default FunctionalitiesHomePage;
