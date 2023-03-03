import React, { useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

import {
  ConvertMeasurementUnit,
  ConvertMeasurementUnitInitialValues,
  TemperatureMeasurement,
  TemperatureMeasurementUnits
} from './type&Utils';

import TemperatureConverter from './render';

const TemperatureConverterContainer: React.FC = () => {
  const [firstValue, setFirstValue] =
    useState<TemperatureMeasurementUnits>('C');
  const [secondValue, setSecondValue] =
    useState<TemperatureMeasurementUnits>('F');
  const [values, setValues] = useState<ConvertMeasurementUnit>(
    ConvertMeasurementUnitInitialValues
  );

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;

    if (name === 'firstValue') {
      setFirstValue(value as TemperatureMeasurementUnits);
    }
    if (name === 'secondValue') {
      setSecondValue(value as TemperatureMeasurementUnits);
    }
  };

  const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitch = () => {
    setFirstValue(secondValue);
    setSecondValue(firstValue);
  };

  const convertTemperatureValue = (
    from: TemperatureMeasurementUnits,
    to: TemperatureMeasurementUnits,
    value: number
  ): number => {
    return TemperatureMeasurement[from][to](value);
  };

  const handleConvertUnits = () => {
    if (firstValue && secondValue && values.input) {
      let result = convertTemperatureValue(
        firstValue,
        secondValue,
        Number(values.input)
      ).toString();

      result = `${result} ${secondValue}`;

      setValues((prev) => ({
        ...prev,
        result
      }));
    }
  };

  return (
    <TemperatureConverter
      firstValue={firstValue}
      secondValue={secondValue}
      handleSelectChange={handleSelectChange}
      handleConvertUnits={handleConvertUnits}
      handleSwitch={handleSwitch}
      values={values}
      setValues={setValues}
      handleInputValues={handleInputValues}
    />
  );
};

export default TemperatureConverterContainer;
