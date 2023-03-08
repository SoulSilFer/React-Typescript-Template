import {
  AbcRounded,
  AccessibilityNewRounded,
  AttachMoneyRounded,
  CalculateRounded,
  CalendarMonthRounded,
  DateRangeRounded,
  DeviceThermostatRounded,
  PinRounded,
  SettingsRounded,
  ShuffleRounded,
  StraightenRounded,
  SwapHorizRounded
} from '@mui/icons-material';

export const GetRandomBody = (t: any) => {
  const obj = {
    title: t('getRandom'),
    onClick: {
      to: '/tools/get-random',
      state: { all: true }
    },
    mainIcon: <ShuffleRounded />,
    stackButtons: [
      {
        icon: <PinRounded />,
        title: t('randomNumber'),
        onClick: {
          to: '/tools/get-random',
          state: { number: true }
        }
      },
      {
        icon: <AbcRounded />,
        title: t('randomText'),
        onClick: {
          to: '/tools/get-random',
          state: { string: true }
        }
      }
    ]
  };
  return obj;
};

export const CalculateBody = (t: any) => {
  const obj = {
    title: t('calculator'),
    onClick: {
      to: '/tools/calculate/calculator'
    },
    mainIcon: <CalculateRounded />,
    stackButtons: [
      {
        icon: <AccessibilityNewRounded />,
        title: t('calculateBmi'),
        onClick: {
          to: '/tools/calculate/imc'
        }
      }
    ]
  };

  return obj;
};

export const ConvertBody = (t: any) => {
  const obj = {
    title: t('converter'),
    onClick: {
      to: '/tools/convert/temperature'
    },
    mainIcon: <SwapHorizRounded />,
    stackButtons: [
      {
        icon: <AttachMoneyRounded />,
        title: t('monetaryValue'),
        onClick: {
          to: '/tools/convert/coin'
        }
      },
      {
        icon: <StraightenRounded />,
        title: t('lengthMeasurement'),
        onClick: {
          to: '/tools/convert/size'
        }
      },
      {
        icon: <DeviceThermostatRounded />,
        title: t('temperatureMeasurement'),
        onClick: {
          to: '/tools/convert/temperature'
        }
      }
    ]
  };

  return obj;
};

export const ToDoListBody = (t: any) => {
  const obj = {
    title: t('toDoList'),
    onClick: {
      to: '/tools/to-do-list'
    },
    mainIcon: <SwapHorizRounded />,
    stackButtons: [
      {
        icon: <CalendarMonthRounded />,
        title: 'Mensal',
        onClick: {
          to: '/tools/to-do-list/month'
        }
      },
      {
        icon: <SettingsRounded />,
        title: 'Configurar',
        onClick: {
          to: '/tools/to-do-list/config'
        }
      }
    ]
  };

  return obj;
};
