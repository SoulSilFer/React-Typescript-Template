export type ConvertMeasurementUnit = {
  input: string;
  result: string;
};
export const ConvertMeasurementUnitInitialValues: ConvertMeasurementUnit = {
  input: '0',
  result: '0'
};

export type TemperatureMeasurementUnits =
  | 'C'
  | 'F'
  | 'K'
  | 'R'
  | 'De'
  | 'N'
  | 'Re'
  | 'Ro'
  | 'Ré'
  | 'Rø';

export const TemperatureMeasurement = {
  C: {
    C: (value: number) => value,
    F: (value: number) => (value * 9) / 5 + 32,
    K: (value: number) => value + 273.15,
    R: (value: number) => ((value + 273.15) * 9) / 5,
    De: (value: number) => ((100 - value) * 3) / 2,
    N: (value: number) => (value * 33) / 100,
    Re: (value: number) => (value * 4) / 5,
    Ro: (value: number) => ((value - 7.5) * 24) / 40 + 7.5,
    Ré: (value: number) => (value * 4) / 5,
    Rø: (value: number) => ((value - 7.5) * 24) / 40 + 7.5
  },
  F: {
    C: (value: number) => ((value - 32) * 5) / 9,
    F: (value: number) => value,
    K: (value: number) => ((value + 459.67) * 5) / 9,
    R: (value: number) => value + 459.67,
    De: (value: number) => ((212 - value) * 5) / 6,
    N: (value: number) => ((value - 32) * 11) / 60,
    Re: (value: number) => ((value - 32) * 4) / 9,
    Ro: (value: number) => ((value - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => ((value - 32) * 4) / 9,
    Rø: (value: number) => ((value - 31.5) * 28) / 57 + 7.5
  },
  K: {
    C: (value: number) => value - 273.15,
    F: (value: number) => (value * 9) / 5 - 459.67,
    K: (value: number) => value,
    R: (value: number) => (value * 9) / 5,
    De: (value: number) => ((373.15 - value) * 3) / 2,
    N: (value: number) => ((value - 273.15) * 33) / 100,
    Re: (value: number) => ((value - 273.15) * 4) / 5,
    Ro: (value: number) => ((value - 273.15 - 7.5) * 24) / 40 + 7.5,
    Ré: (value: number) => ((value - 273.15) * 4) / 5,
    Rø: (value: number) => ((value - 273.15 - 7.5) * 24) / 40 + 7.5
  },
  R: {
    C: (value: number) => ((value - 491.67) * 5) / 9,
    F: (value: number) => value - 459.67,
    K: (value: number) => (value * 5) / 9,
    R: (value: number) => value,
    De: (value: number) => ((671.67 - value) * 5) / 6,
    N: (value: number) => ((value - 491.67) * 11) / 60,
    Re: (value: number) => ((value - 491.67) * 4) / 9,
    Ro: (value: number) => ((value - 491.67 - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => ((value - 491.67) * 4) / 9,
    Rø: (value: number) => ((value - 491.67 - 31.5) * 28) / 57 + 7.5
  },
  De: {
    C: (value: number) => 100 - (value * 2) / 3,
    F: (value: number) => 212 - (value * 6) / 5,
    K: (value: number) => 373.15 - (value * 2) / 3,
    R: (value: number) => 671.67 - (value * 6) / 5,
    De: (value: number) => value,
    N: (value: number) => ((212 - value) * 11) / 60,
    Re: (value: number) => ((212 - value) * 8) / 15,
    Ro: (value: number) => ((671.67 - (value * 6) / 5 - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => ((212 - value) * 8) / 15,
    Rø: (value: number) => ((671.67 - (value * 6) / 5 - 31.5) * 28) / 57 + 7.5
  },
  N: {
    C: (value: number) => (value * 100) / 33,
    F: (value: number) => (value * 60) / 11 + 32,
    K: (value: number) => (value * 100) / 33 + 273.15,
    R: (value: number) => (value * 60) / 11 + 491.67,
    De: (value: number) => ((212 - (value * 60) / 11) * 5) / 6,
    N: (value: number) => value,
    Re: (value: number) => ((212 - (value * 60) / 11) * 8) / 15,
    Ro: (value: number) =>
      ((671.67 - (value * 60) / 11 - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => ((212 - (value * 60) / 11) * 8) / 15,
    Rø: (value: number) => ((671.67 - (value * 60) / 11 - 31.5) * 28) / 57 + 7.5
  },
  Re: {
    C: (value: number) => (value * 5) / 4,
    F: (value: number) => (value * 9) / 4 + 32,
    K: (value: number) => (value * 5) / 4 + 273.15,
    R: (value: number) => (value * 9) / 4 + 491.67,
    De: (value: number) => ((212 - (value * 9) / 4) * 5) / 6,
    N: (value: number) => ((212 - (value * 9) / 4) * 11) / 60,
    Re: (value: number) => value,
    Ro: (value: number) => ((671.67 - (value * 9) / 4 - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => value,
    Rø: (value: number) => ((671.67 - (value * 9) / 4 - 31.5) * 28) / 57 + 7.5
  },
  Ro: {
    C: (value: number) => (value * 40) / 24 + 7.5,
    F: (value: number) => (value * 57) / 28 + 31.5,
    K: (value: number) => (value * 40) / 24 + 273.15,
    R: (value: number) => (value * 57) / 28 + 491.67,
    De: (value: number) => ((671.67 - (value * 57) / 28) * 5) / 6,
    N: (value: number) => ((671.67 - (value * 57) / 28) * 11) / 60,
    Re: (value: number) => ((671.67 - (value * 57) / 28) * 8) / 15,
    Ro: (value: number) => value,
    Ré: (value: number) => ((671.67 - (value * 57) / 28) * 8) / 15,
    Rø: (value: number) => value
  },
  Ré: {
    C: (value: number) => (value * 5) / 4,
    F: (value: number) => (value * 9) / 4 + 32,
    K: (value: number) => (value * 5) / 4 + 273.15,
    R: (value: number) => (value * 9) / 4 + 491.67,
    De: (value: number) => ((212 - (value * 9) / 4) * 5) / 6,
    N: (value: number) => ((212 - (value * 9) / 4) * 11) / 60,
    Re: (value: number) => value,
    Ro: (value: number) => ((671.67 - (value * 9) / 4 - 31.5) * 28) / 57 + 7.5,
    Ré: (value: number) => value,
    Rø: (value: number) => ((671.67 - (value * 9) / 4 - 31.5) * 28) / 57 + 7.5
  },
  Rø: {
    C: (value: number) => (value * 40) / 24 + 7.5,
    F: (value: number) => (value * 57) / 28 + 31.5,
    K: (value: number) => (value * 40) / 24 + 273.15,
    R: (value: number) => (value * 57) / 28 + 491.67,
    De: (value: number) => ((671.67 - (value * 57) / 28) * 5) / 6,
    N: (value: number) => ((671.67 - (value * 57) / 28) * 11) / 60,
    Re: (value: number) => ((671.67 - (value * 57) / 28) * 8) / 15,
    Ro: (value: number) => value,
    Ré: (value: number) => ((671.67 - (value * 57) / 28) * 8) / 15,
    Rø: (value: number) => value
  }
};

export const TemperatureMeasurementList: [string, string][] = [
  ['C', 'Celsius'],
  ['F', 'Fahrenheit'],
  ['K', 'Kelvin'],
  ['R', 'Rankine'],
  ['De', 'Delisle'],
  ['N', 'Newton'],
  ['Re', 'Réaumur'],
  ['Ro', 'Rømer'],
  ['Ré', 'Réaumur'],
  ['Rø', 'Rømer']
];
