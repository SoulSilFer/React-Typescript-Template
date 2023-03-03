import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  AbcRounded,
  AccessibilityNewRounded,
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
        title={t('getRandom')}
        onClick={() =>
          navigate('/tools/get-random', {
            state: { all: true }
          })
        }
        mainIcon={<ShuffleRounded />}
        stackButtons={[
          {
            icon: <PinRounded />,
            title: t('randomNumber'),
            onClick: () =>
              navigate('/tools/get-random', {
                state: { number: true }
              })
          },
          {
            icon: <AbcRounded />,
            title: t('randomText'),
            onClick: () =>
              navigate('/tools/get-random', {
                state: { string: true }
              })
          }
        ]}
      />

      <GameDashboardCard
        title={t('calculator')}
        onClick={() => navigate('/tools/calculate/calculator')}
        mainIcon={<CalculateRounded />}
        stackButtonsLength={1}
        stackButtons={[
          {
            icon: <AccessibilityNewRounded />,
            title: 'Calcular IMC',
            onClick: () => navigate('/tools/calculate/imc')
          }
        ]}
      />

      <GameDashboardCard
        title={t('convert')}
        mainIcon={<SwapHorizRounded />}
        stackButtonsLength={3}
        stackButtons={[
          {
            icon: <AttachMoneyRounded />,
            title: t('monetaryValue'),
            onClick: () => navigate('/tools/convert/coin')
          },
          {
            icon: <StraightenRounded />,
            title: t('lengthMeasurement'),
            onClick: () => navigate('/tools/convert/size')
          },
          {
            icon: <DeviceThermostatRounded />,
            title: t('temperatureMeasurement'),
            onClick: () => navigate('/tools/convert/temperature')
          }
        ]}
      />
    </>
  );
};

export default FunctionalitiesHomePage;
