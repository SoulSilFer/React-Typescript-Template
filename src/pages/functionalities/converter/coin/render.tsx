import React from 'react';

import {
  Grid,
  SelectChangeEvent,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material';
import { CurrencyExchangeRounded } from '@mui/icons-material';

import { PageHolder } from 'components/PageHolder';
import {
  CoinsData,
  ConvertCoins,
  ConvertCoinsInitialValues
} from './type&Utils';
import { BaseButton } from 'components/buttons';
import { BaseSelect, BaseTextField } from 'components/fields';
import { useTranslation } from 'react-i18next';

type Props = {
  handleSelectChange: (event: SelectChangeEvent<unknown>) => void;
  firstCoin: string;
  handleSwitch: () => void;
  secondCoin: string;
  combError: string;
  handleInputValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: ConvertCoins;
  setValues: React.Dispatch<React.SetStateAction<ConvertCoins>>;
  handleSubmit: () => void;
};

const CoinConverter: React.FC<Props> = ({
  handleSelectChange,
  firstCoin,
  handleSwitch,
  secondCoin,
  combError,
  handleInputValues,
  values,
  setValues,
  handleSubmit
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('convertMonetaryValue')} maxWidth={800}>
      <Grid container spacing={1} mb={3}>
        <Grid item xs={5}>
          <BaseSelect
            fullWidth
            id="firstCoin"
            label={t('from')}
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
            label={t('to')}
            name="secondCoin"
            onChange={handleSelectChange}
            data={CoinsData.sort((a, b) => a[0].localeCompare(b[0]))}
            value={secondCoin}
            fullItem
          />
        </Grid>
      </Grid>

      {combError === t('combinationNotAllowedAPI') && (
        <Typography variant="body2" color="error" mb={2}>
          {combError}
        </Typography>
      )}

      <Grid container spacing={2} mb={3}>
        <Grid item xs={9}>
          <BaseTextField
            handleChange={handleInputValues}
            label={t('value')}
            name="input"
            value={values.input}
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <BaseButton
                  title={t('clear')}
                  onClick={() => {
                    setValues(ConvertCoinsInitialValues);
                  }}
                />
              </InputAdornment>
            }
          />
        </Grid>

        <Grid item xs={3}>
          <BaseButton
            onClick={handleSubmit}
            title={t('convert')}
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

      {combError === t('invalidValueNumbersAnPeriods') && (
        <Typography variant="body2" color="error" mb={2}>
          {combError}
        </Typography>
      )}

      <BaseTextField
        handleChange={() => {}}
        label={t('result')}
        name="result"
        fullWidth
        disabled
        value={values.result}
      />
    </PageHolder>
  );
};

export default CoinConverter;
