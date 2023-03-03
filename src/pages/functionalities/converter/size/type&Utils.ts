import { TFunction } from 'react-i18next';

export type LengthMeasurementUnits =
  | 'M'
  | 'KM'
  | 'CM'
  | 'MM'
  | 'IN'
  | 'FT'
  | 'YD'
  | 'MI'
  | 'µm'
  | 'NM'
  | 'Å'
  | 'AU'
  | 'LY'
  | 'PC';

export type ConvertMeasurementUnit = {
  input: string;
  result: string;
};

export const LengthMeasurementUnitsList: any = (
  t: TFunction<'translation', undefined>
) => [
  ['M', t('meter')],
  ['KM', t('km')],
  ['CM', t('cm')],
  ['MM', t('mm')],
  ['IN', t('in')],
  ['FT', t('ft')],
  ['YD', t('yd')],
  ['MI', t('mi')],
  ['µm', t('mc')],
  ['NM', t('nm')],
  ['Å', t('angstroms')],
  ['AU', t('astronomicalUnits')],
  ['LY', t('ly')],
  ['PC', t('parsecs')]
];

export const ConvertMeasurementUnitInitialValues: ConvertMeasurementUnit = {
  input: '0',
  result: '0'
};
