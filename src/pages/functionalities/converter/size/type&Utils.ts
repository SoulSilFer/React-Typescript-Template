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

export const LengthMeasurementUnitsList: [string, string][] = [
  ['M', 'Meter'],
  ['KM', 'Kilometer'],
  ['CM', 'Centimeter'],
  ['MM', 'Millimeter'],
  ['IN', 'Inch'],
  ['FT', 'Foot'],
  ['YD', 'Yard'],
  ['MI', 'Mile'],
  ['µm', 'Micrometers'],
  ['NM', 'Nanometers'],
  ['Å', 'Angstroms'],
  ['AU', 'Astronomical Units'],
  ['LY', 'Light Years'],
  ['PC', 'Parsecs']
];

export const ConvertMeasurementUnitInitialValues: ConvertMeasurementUnit = {
  input: '0',
  result: '0'
};

export const ConvertLength = (
  firstUnit: LengthMeasurementUnits,
  secondUnit: LengthMeasurementUnits,
  value: string
) => {
  const units = {
    M: 1,
    KM: 1000,
    CM: 0.01,
    MM: 0.001,
    IN: 0.0254,
    FT: 0.3048,
    YD: 0.9144,
    MI: 1609.344,
    µm: 0.000001,
    NM: 0.000000001,
    Å: 0.0000000001,
    AU: 149597870700,
    LY: parseFloat('9460730472580800'),
    PC: parseFloat('30856775814671900')
  };

  const firstValue = parseFloat(value) * units[firstUnit];
  const secondValue = firstValue / units[secondUnit];

  return secondValue.toFixed(2);
};
