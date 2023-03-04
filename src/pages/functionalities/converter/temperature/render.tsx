import React from 'react';

import {
  Grid,
  InputAdornment,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { ChangeCircleRounded } from '@mui/icons-material';

import { BaseSelect, BaseTextField } from 'components/fields';
import { PageHolder } from 'components/PageHolder';
import { BaseButton } from 'components/buttons';
import {
  ConvertMeasurementUnit,
  ConvertMeasurementUnitInitialValues,
  TemperatureMeasurementList,
  TemperatureMeasurementUnits
} from './type&Utils';
import { useTranslation } from 'react-i18next';

type Props = {
  handleSelectChange: (event: SelectChangeEvent<unknown>) => void;
  firstValue: TemperatureMeasurementUnits;
  handleSwitch: () => void;
  secondValue: TemperatureMeasurementUnits;
  values: ConvertMeasurementUnit;
  setValues: React.Dispatch<React.SetStateAction<ConvertMeasurementUnit>>;
  handleConvertUnits: () => void;
  handleInputValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TemperatureConverter: React.FC<Props> = ({
  firstValue,
  secondValue,
  handleSelectChange,
  handleConvertUnits,
  handleSwitch,
  values,
  setValues,
  handleInputValues
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('convertTemperatureMeasurement')}>
      <Grid container spacing={1} mb={3}>
        <Grid item xs={5}>
          <BaseSelect
            fullWidth
            id="firstValue"
            label={t('from')}
            name="firstValue"
            onChange={handleSelectChange}
            data={TemperatureMeasurementList.sort((a, b) =>
              a[0].localeCompare(b[0])
            )}
            value={firstValue}
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
            <ChangeCircleRounded onClick={handleSwitch} />
          </IconButton>
        </Grid>

        <Grid item xs={5}>
          <BaseSelect
            fullWidth
            id="secondValue"
            label={t('to')}
            name="secondValue"
            onChange={handleSelectChange}
            data={TemperatureMeasurementList.sort((a, b) =>
              a[0].localeCompare(b[0])
            )}
            value={secondValue}
            fullItem
          />
        </Grid>
      </Grid>

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
                    setValues(ConvertMeasurementUnitInitialValues);
                  }}
                />
              </InputAdornment>
            }
          />
        </Grid>

        <Grid item xs={3}>
          <BaseButton
            onClick={handleConvertUnits}
            title={t('convert')}
            sx={{
              height: '100%',
              borderRadius: '10px',
              width: '100%',
              textTransform: 'none'
            }}
          />
        </Grid>
      </Grid>

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

export default TemperatureConverter;
