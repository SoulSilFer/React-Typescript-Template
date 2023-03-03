import React, { useState } from 'react';

import { InitialStateRandomText, RandomText } from './types&utils';
import GetRandomTextFunctionality from './render';

type Props = {
  allInOne: boolean;
};

const GetRandomTextFunctionalityContainer: React.FC<Props> = ({ allInOne }) => {
  const [values, setValues] = useState<RandomText>(InitialStateRandomText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getRandomText = () => {
    const { inputText, qtd } = values;
    const qtdNumber = parseInt(qtd);
    const textArray = inputText
      .split(',')
      .map((text) => text.trim())
      .filter((text) => text !== '');
    let randomTextArray: string[] = [];

    if (textArray.length === 0) {
      setValues({ ...values, result: '' });
      return;
    }

    if (textArray.length === 1) {
      setValues({ ...values, result: textArray[0] });
      return;
    }

    if (qtdNumber >= textArray.length) {
      randomTextArray = [...textArray].sort();
    } else {
      while (randomTextArray.length < qtdNumber) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        const randomText = textArray[randomIndex];
        if (!randomTextArray.includes(randomText)) {
          randomTextArray.push(randomText);
        }
      }
      randomTextArray.sort();
    }

    setValues({ ...values, result: randomTextArray.join(', ') });
  };

  const disableButton =
    values.inputText === undefined ||
    values.inputText === '' ||
    values.qtd === undefined ||
    values.qtd === '';

  return (
    <GetRandomTextFunctionality
      allInOne={allInOne}
      values={values}
      handleChange={handleChange}
      disableButton={disableButton}
      getRandomText={getRandomText}
    />
  );
};

export default GetRandomTextFunctionalityContainer;
