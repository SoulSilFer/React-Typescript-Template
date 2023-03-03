import React, { useState } from 'react';

import { useWindowDimensions } from 'utils/getWindowDimensions';

import CalculatorTool from './render';

const CalculatorToolContainer: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [previous, setPrevious] = useState<string[]>([]);

  const handleClickNumber = (number: string) => {
    setValue(value + number);
  };

  const handleOperator = (operator: string) => {
    if (
      value.endsWith('+') ||
      value.endsWith('-') ||
      value.endsWith('x') ||
      value.endsWith('/') ||
      value.endsWith(',')
    ) {
      setValue(value.slice(0, -1) + operator);
    } else {
      setValue(value + operator);
    }
  };

  const handleResult = () => {
    if (
      value.endsWith('+') ||
      value.endsWith('-') ||
      value.endsWith('x') ||
      value.endsWith('/') ||
      value.endsWith(',') ||
      value.endsWith('%')
    ) {
      return;
    }
    let result = value;

    result = result.replace(/x/g, '*');
    result = result.replace(/,/g, '.');
    result = result.replace(/%/g, '/100');

    let resultArray = result.split(/(\+|\-)/g);
    let resultArray2 = resultArray.map((item) => {
      if (item.includes('*') || item.includes('/')) {
        return item.split(/(\*|\/)/g);
      } else {
        return item;
      }
    });

    let resultArray3 = resultArray2.map((item) => {
      if (Array.isArray(item)) {
        let result = item[0];
        for (let i = 1; i < item.length; i += 2) {
          if (item[i] === '*') {
            result = String(Number(result) * Number(item[i + 1]));
          } else if (item[i] === '/') {
            result = String(Number(result) / Number(item[i + 1]));
          }
        }
        return result;
      } else {
        return item;
      }
    });

    result = resultArray3[0];
    for (let i = 1; i < resultArray3.length; i += 2) {
      if (resultArray3[i] === '+') {
        result = String(Number(result) + Number(resultArray3[i + 1]));
      } else if (resultArray3[i] === '-') {
        result = String(Number(result) - Number(resultArray3[i + 1]));
      }
    }

    setValue(result);
    const full = `${value}=${result}`;
    setPrevious([...previous, full]);
  };

  const handleClear = () => {
    setValue('');
    setPrevious([]);
  };

  const windowWidth = useWindowDimensions().width;

  return (
    <CalculatorTool
      value={value}
      windowWidth={windowWidth}
      previous={previous}
      handleOperator={handleOperator}
      setValue={setValue}
      handleClear={handleClear}
      handleClickNumber={handleClickNumber}
      handleResult={handleResult}
    />
  );
};

export default CalculatorToolContainer;
