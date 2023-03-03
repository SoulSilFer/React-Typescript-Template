import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import CalculateIMC from './render';
import {
  IMCValues,
  initialIMCValues,
  calculateIMC,
  getIMCResult
} from './types&utils';

const CalculateIMCContainer: React.FC = () => {
  const { t } = useTranslation();

  const [values, setValues] = useState<IMCValues>(initialIMCValues);

  const handleClear = () => {
    setValues(initialIMCValues);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');

    if (name === 'height') {
      const [integerPart, decimalPart] = formattedValue.split('.');
      const integerWithComma = integerPart.replace(
        /\B(?=(\d{2})+(?!\d))/g,
        '.'
      );
      let formattedInput = integerWithComma;

      if (decimalPart) {
        const limitedDecimalPart = decimalPart.slice(0, 2);
        formattedInput = `${integerWithComma}.${limitedDecimalPart}`;
      }

      setValues((prev) => ({
        ...prev,
        [name]: formattedInput
      }));
    }

    if (name === 'weight') {
      const newValue = formattedValue.slice(0, 6);

      setValues((prev) => ({
        ...prev,
        [name]: newValue
      }));
    }
  };

  const handleResult = () => {
    const { height, weight } = values;

    const imc = calculateIMC(parseFloat(height), parseFloat(weight));

    const imcCalc = getIMCResult(imc, t);

    const result = `${imcCalc}: ${imc}`;

    setValues((prev) => ({
      ...prev,
      result
    }));
  };

  const disableButton = values.height === '' || values.weight === '';

  return (
    <CalculateIMC
      values={values}
      handleClear={handleClear}
      handleResult={handleResult}
      handleChange={handleChange}
      disableButton={disableButton}
    />
  );
};

export default CalculateIMCContainer;
