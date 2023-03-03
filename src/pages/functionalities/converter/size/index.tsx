import React, { useState } from 'react';

import { SelectChangeEvent } from '@mui/material';

import {
  ConvertMeasurementUnit,
  ConvertMeasurementUnitInitialValues,
  LengthMeasurementUnits
} from './type&Utils';
import LengthMeasurementUnit from './render';

const LengthMeasurementUnitConverterContainer: React.FC = () => {
  const [firstValue, setFirstValue] = useState<LengthMeasurementUnits>('M');
  const [secondValue, setSecondValue] = useState<LengthMeasurementUnits>('CM');
  const [values, setValues] = useState<ConvertMeasurementUnit>(
    ConvertMeasurementUnitInitialValues
  );

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;

    if (name === 'firstValue') {
      setFirstValue(value as LengthMeasurementUnits);
    }
    if (name === 'secondValue') {
      setSecondValue(value as LengthMeasurementUnits);
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

  const convertLength = (
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

  const handleConvertUnits = () => {
    if (firstValue && secondValue && values.input) {
      let result = convertLength(firstValue, secondValue, values.input);

      if (result.length > 6) {
        result = result.replace('.', ',');

        result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      }
      result = `${result} ${secondValue.toLocaleLowerCase()}`;

      setValues((prev) => ({
        ...prev,
        result
      }));
    }
  };

  return (
    <LengthMeasurementUnit
      handleSelectChange={handleSelectChange}
      firstValue={firstValue}
      handleSwitch={handleSwitch}
      secondValue={secondValue}
      handleInputValues={handleInputValues}
      values={values}
      setValues={setValues}
      handleConvertUnits={handleConvertUnits}
    />
  );
};

export default LengthMeasurementUnitConverterContainer;
