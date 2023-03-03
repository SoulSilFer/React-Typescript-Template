import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Box, Grid, styled, SelectChangeEvent } from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import { BaseSelect, BaseTextField } from 'components/fields';
import {
  CoinsData,
  AllowedTrades,
  EconomiaApiResponse,
  ConvertCoins,
  ConvertCoinsInitialValues
} from './type&Utils';
import IconButton from '@mui/material/IconButton';
import { CurrencyExchangeRounded } from '@mui/icons-material';
import { BaseButton } from 'components/buttons';
import i18n from 'i18n';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  maxWidht: 800
}));

const CoinConverter: React.FC = () => {
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

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitch = () => {
    resetApiF();
    setFirstCoin(secondCoin);
    setSecondCoin(firstCoin);
  };

  const handleSubmit = () => {
    if (!Number(values.input)) {
      setCombError('Valor inválido, somente números e pontos(.)');
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
        setCombError('Combinação de moedas não permitida pela API utilizada');
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
    <PageHolder
      title="Converter valor monetário"
      onBackclick={() => {
        window.history.back();
      }}
    >
      <StyledContainer>
        <Grid container spacing={1} mb={3}>
          <Grid item xs={5}>
            <BaseSelect
              fullWidth
              id="firstCoin"
              label="De"
              name="firstCoin"
              onChange={handleSelectChange}
              data={CoinsData.sort((a, b) => a[0].localeCompare(b[0]))}
              value={firstCoin}
              fullItem
            />
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <IconButton>
              <CurrencyExchangeRounded onClick={handleSwitch} />
            </IconButton>
          </Grid>

          <Grid item xs={5}>
            <BaseSelect
              fullWidth
              id="secondCoin"
              label="Para"
              name="secondCoin"
              onChange={handleSelectChange}
              data={CoinsData.sort((a, b) => a[0].localeCompare(b[0]))}
              value={secondCoin}
              fullItem
            />
          </Grid>
        </Grid>

        {combError ===
          'Combinação de moedas não permitida pela API utilizada' && (
          <Typography variant="body2" color="error" mb={2}>
            {combError}
          </Typography>
        )}

        <Grid container spacing={2} mb={3}>
          <Grid item xs={8}>
            <BaseTextField
              handleChange={handleInputValues}
              label="Valor"
              name="input"
              value={values.input}
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <BaseButton
                    title="Limpar"
                    onClick={() => {
                      setValues(ConvertCoinsInitialValues);
                    }}
                  />
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={4}>
            <BaseButton
              onClick={handleSubmit}
              title="Converter"
              sx={{
                height: '100%',
                borderRadius: '10px',
                maxWidth: '100%',
                textTransform: 'none'
              }}
              disabled={
                values.input === '0' ||
                values.input === '' ||
                firstCoin === '' ||
                secondCoin === '' ||
                Boolean(combError)
              }
            />
          </Grid>
        </Grid>

        {combError === 'Valor inválido' && (
          <Typography variant="body2" color="error" mb={2}>
            {combError}
          </Typography>
        )}

        <BaseTextField
          handleChange={() => {}}
          label="Resultado"
          name="result"
          fullWidth
          disabled
          value={values.result}
        />
      </StyledContainer>
    </PageHolder>
  );
};

export default CoinConverter;
