import React from 'react';

import {
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';

import { BaseTextField } from 'components/fields';
import { RandomNumbers, RandomNumbersChecks } from './types&utils';
import { BaseButton } from 'components/buttons';
import { PageHolder } from 'components/PageHolder';
import { useTranslation } from 'react-i18next';

type Props = {
  randomNumbers: RandomNumbers;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  generateRandomNumbers: () => void;
  disableButton: boolean;
  errorMsg: string;
  setCheckValue: React.Dispatch<React.SetStateAction<RandomNumbersChecks>>;
  checkValues: RandomNumbersChecks;
  numbersArray: string | undefined;
};

const GetRandomNumberFunctionality: React.FC<Props> = ({
  randomNumbers,
  handleChange,
  generateRandomNumbers,
  disableButton,
  errorMsg,
  setCheckValue,
  checkValues,
  numbersArray
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('getRandom')}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mb: 3,
          borderRadius: 2
        }}
        bgcolor="secondary.main"
      >
        <Typography color="primary.contrastText">{t('number')}</Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <BaseTextField
            name="minValue"
            label={t('minValue')}
            value={randomNumbers.minValue}
            handleChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>

        <Grid item xs={4}>
          <BaseTextField
            name="maxValue"
            label={t('maxValue')}
            value={randomNumbers.maxValue}
            handleChange={handleChange}
            fullWidth
            type="number"
          />
        </Grid>

        <Grid item xs={2}>
          <BaseTextField
            name="qtd"
            label={t('qtdResult')}
            value={randomNumbers.qtd}
            handleChange={handleChange}
            fullWidth
            type="number"
            InputPropsRest={{}}
          />
        </Grid>

        <Grid item xs={2}>
          <BaseButton
            onClick={generateRandomNumbers}
            title={t('generateValues')}
            disabled={disableButton}
            size={{ height: '100%' }}
            sx={{
              textTransform: 'none',
              height: '100%',
              width: '100%',
              borderRadius: '0.75rem'
            }}
          />
        </Grid>
      </Grid>

      {disableButton && (
        <Grid container spacing={1} mt={0}>
          <Grid item xs={12}>
            <Typography variant="caption" color="error">
              {errorMsg}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={1} mt={3}>
        <Grid item xs={6}>
          <FormGroup
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%'
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  onClick={() =>
                    setCheckValue({
                      ...checkValues,
                      insertOwnNumbers: !checkValues.insertOwnNumbers
                    })
                  }
                />
              }
              label={t('insertOwnNumbers')}
              checked={checkValues.insertOwnNumbers}
            />
          </FormGroup>
        </Grid>
      </Grid>

      {checkValues.insertOwnNumbers && (
        <Grid container spacing={1} mt={3}>
          <Grid item xs={12}>
            <BaseTextField
              name="insertOwnNumbers"
              label={t('numbersToBeSorted')}
              value={randomNumbers.insertOwnNumbers}
              handleChange={handleChange}
              fullWidth
              multiline
              rows={3}
              tooltipContentArray={[
                t('onlyNCDAccept'),
                t('spreadByComma'),
                t('toUseBrokeNumber')
              ]}
              tooltipTitle={t('acceptFormat')}
            />
          </Grid>
        </Grid>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mb: 3,
          mt: 3,
          borderRadius: 2
        }}
        bgcolor="secondary.main"
      >
        <Typography color="primary.contrastText">{t('result')}</Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <BaseTextField
            name="result"
            label={t('result')}
            value={numbersArray}
            disabled
            handleChange={() => {}}
            fullWidth
            multiline
            rows={6}
            shrink
          />
        </Grid>
      </Grid>
    </PageHolder>
  );
};

export default GetRandomNumberFunctionality;
