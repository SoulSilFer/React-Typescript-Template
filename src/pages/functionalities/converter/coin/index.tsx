import React, { useEffect, useState } from 'react';
import axios from 'axios';
import i18n from 'i18n';

import { SelectChangeEvent } from '@mui/material';

import {
  AllowedTrades,
  EconomiaApiResponse,
  ConvertCoins,
  ConvertCoinsInitialValues
} from './type&Utils';

import CoinConverter from './render';
import { useTranslation } from 'react-i18next';

const CoinConverterContainer: React.FC = () => {
  const { t } = useTranslation();
  const selectedLanguage = i18n.language;

  const [apiResponse, setApiResponse] = useState<EconomiaApiResponse>({});
  const [firstCoin, setFirstCoin] = useState<string>('');
  const [secondCoin, setSecondCoin] = useState<string>('');
  const [combError, setCombError] = useState<string>('');
  const [changedValues, setChangedValues] = useState<boolean>(false);
  const [values, setValues] = useState<ConvertCoins>(ConvertCoinsInitialValues);

  const resetApiF = () => {
    setCombError('');
    setChangedValues(false);
    setApiResponse({});
  };

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;
    resetApiF();

    if (name === 'firstCoin') {
      setFirstCoin(value as string);
    }
    if (name === 'secondCoin') {
      setSecondCoin(value as string);
    }
  };

  const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    resetApiF();
    const { name, value } = e.target;

    const formatValue = value.replace(/[^0-9.,]/g, '');

    setValues((prev) => ({
      ...prev,
      [name]: formatValue
    }));
  };

  const handleSwitch = () => {
    resetApiF();
    setFirstCoin(secondCoin);
    setSecondCoin(firstCoin);
  };

  const handleSubmit = () => {
    if (!Number(values.input)) {
      setCombError(t('invalidValueNumbersAnPeriods'));
      return;
    }

    let coins = `${firstCoin}-${secondCoin}`;

    const verifyInArray = (value: string) =>
      AllowedTrades.find((trade) => trade === value) !== undefined;

    const firstTry = verifyInArray(coins);

    if (!firstTry) {
      coins = `${secondCoin}-${firstCoin}`;

      const secondTry = verifyInArray(coins);

      if (!secondTry) {
        setCombError(t('combinationNotAllowedAPI'));
        return;
      }
      setChangedValues(true);
    }

    const url = `https://economia.awesomeapi.com.br/json/all/${coins}`;

    axios.get(url).then((apiResponse) => {
      setApiResponse(apiResponse.data as EconomiaApiResponse);
    });
  };

  useEffect(() => {
    if (apiResponse && Object.keys(apiResponse).length > 0) {
      const firstKey = Object.keys(apiResponse)[0];
      const { bid } = apiResponse[firstKey];
      let result: any;
      const floatBid = parseFloat(bid);
      const floatInput = parseFloat(values.input);

      if (!changedValues) {
        result = floatBid * floatInput;
      } else {
        result = floatInput / floatBid;
      }

      if (selectedLanguage === 'pt-BR') {
        result = result.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      } else {
        result = result.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        });
      }

      setValues((prev) => ({
        ...prev,
        result
      }));
    }
  }, [apiResponse]);

  return (
    <CoinConverter
      handleSelectChange={handleSelectChange}
      firstCoin={firstCoin}
      handleSwitch={handleSwitch}
      secondCoin={secondCoin}
      combError={combError}
      handleInputValues={handleInputValues}
      values={values}
      setValues={setValues}
      handleSubmit={handleSubmit}
    />
  );
};

export default CoinConverterContainer;
