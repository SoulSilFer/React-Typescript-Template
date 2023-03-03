import React, { useEffect, useState } from 'react';

import {
  InitialStateRandomNumbers,
  InitialStateRandomNumbersChecks,
  RandomNumbers,
  RandomNumbersChecks
} from './types&utils';

import GetRandomNumberFunctionality from './render';
import { useTranslation } from 'react-i18next';

const GetRandomNumberFunctionalityContainer: React.FC = () => {
  const { t } = useTranslation();

  const [randomNumbers, setRandomNumbers] = useState<RandomNumbers>(
    InitialStateRandomNumbers
  );
  const [inputNumbersArray, setInputNumbersArray] = useState<string[]>([]);
  const [checkValues, setCheckValue] = useState<RandomNumbersChecks>(
    InitialStateRandomNumbersChecks
  );
  const [numbersArray, setNumbersArray] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'insertOwnNumbers') {
      const regex = /^[0-9\b,\.]+$/;
      const regexTest = regex.test(value);
      if (regexTest) {
        const numbers = value.split(',').map((number) => number);
        setInputNumbersArray(numbers);
      } else {
        return;
      }
    }
    if (name === 'qtd') {
      const regex = /^[0-9\b]+$/;
      if (value === '' || regex.test(value)) {
        setRandomNumbers({ ...randomNumbers, [name]: value });
      }
      return;
    }
    setRandomNumbers({ ...randomNumbers, [name]: value });
  };

  const { minValue, maxValue, qtd } = randomNumbers;
  const min = Number(minValue);
  const max = Number(maxValue);
  const qtdNumbers = Number(qtd);
  const sumeBtwMaxAndMin = Math.abs(max - min);

  const generateRandomNumbers = () => {
    const numbersArray: number[] = [];

    if (checkValues.insertOwnNumbers) {
      const numbers = inputNumbersArray.map((number) => Number(number));
      if (numbers.length > qtdNumbers) {
        const uniqueNumbersArray = numbers.filter(
          (item, index) => numbers.indexOf(item) === index
        );
        const randomNumbersArray = uniqueNumbersArray.sort(
          () => Math.random() - 0.5
        );

        numbersArray.push(...randomNumbersArray.slice(0, qtdNumbers));
      } else {
        numbersArray.push(...numbers);
      }
    } else {
      while (numbersArray.length < qtdNumbers) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbersArray.includes(random)) {
          numbersArray.push(random);
        }
      }
    }

    const uniqueNumbersArray = numbersArray.filter(
      (item, index) => numbersArray.indexOf(item) === index
    );
    const sortMinToMaxNumbers = uniqueNumbersArray.sort((a, b) => a - b);

    setNumbersArray(sortMinToMaxNumbers.join(', '));
  };

  const [errorMsg, setErrorMsg] = useState<string>('');

  const errrorCond1 = checkValues.insertOwnNumbers && qtdNumbers === 0;
  const errrorCond2 =
    checkValues.insertOwnNumbers && inputNumbersArray.length <= qtdNumbers;
  const errrorCond3 =
    !checkValues.insertOwnNumbers &&
    (qtd === '' || minValue === '' || maxValue === '');
  const errrorCond4 =
    !checkValues.insertOwnNumbers && qtdNumbers > sumeBtwMaxAndMin;
  const errrorCond5 = !checkValues.insertOwnNumbers && min > max;
  const errrorCond6 = !checkValues.insertOwnNumbers && qtdNumbers === 0;

  const disableButton =
    errrorCond1 || errrorCond2 || errrorCond3 || errrorCond4 || errrorCond5;

  useEffect(() => {
    if (disableButton) {
      if (errrorCond1) {
        setErrorMsg(t('insertNumAndNQtd'));
      }
      if (errrorCond2) {
        setErrorMsg(t('qtdCantEatInserted'));
      }
      if (errrorCond3) {
        setErrorMsg(t('insertValues'));
      }
      if (errrorCond4) {
        setErrorMsg(t('diffNumberValue'));
      }
      if (errrorCond5) {
        setErrorMsg(t('minMax'));
      }
      if (errrorCond6) {
        setErrorMsg(t('qtdEqualZero'));
      }
    } else {
      setErrorMsg('');
    }
  }, [checkValues, inputNumbersArray, qtdNumbers]);

  return (
    <GetRandomNumberFunctionality
      randomNumbers={randomNumbers}
      handleChange={handleChange}
      generateRandomNumbers={generateRandomNumbers}
      disableButton={disableButton}
      errorMsg={errorMsg}
      setCheckValue={setCheckValue}
      checkValues={checkValues}
      numbersArray={numbersArray}
    />
  );
};

export default GetRandomNumberFunctionalityContainer;
