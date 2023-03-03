import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  AbcRounded,
  AttachMoneyRounded,
  CalculateRounded,
  DeviceThermostatRounded,
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
        stackButtonsLength={2}
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
        stackButtonsLength={0}
      />

      <GameDashboardCard
        title="Converter"
        mainIcon={<SwapHorizRounded />}
        stackButtonsLength={3}
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
          },
          {
            icon: <DeviceThermostatRounded />,
            title: 'Temperatura',
            onClick: () => navigate('/tools/convert/temperature')
          }
        ]}
      />
    </>
  );
};

export default FunctionalitiesHomePage;
