import React from 'react';

import {
  Grid,
  SelectChangeEvent,
  InputAdornment,
  IconButton
} from '@mui/material';
import { ChangeCircleRounded } from '@mui/icons-material';

import { BaseSelect, BaseTextField } from 'components/fields';
import { PageHolder } from 'components/PageHolder';
import { BaseButton } from 'components/buttons';
import {
  ConvertMeasurementUnit,
  ConvertMeasurementUnitInitialValues,
  LengthMeasurementUnitsList,
  LengthMeasurementUnits
} from './type&Utils';
import { useTranslation } from 'react-i18next';

type Props = {
  handleSelectChange: (event: SelectChangeEvent<unknown>) => void;
  firstValue: LengthMeasurementUnits;
  handleSwitch: () => void;
  secondValue: LengthMeasurementUnits;
  handleInputValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: ConvertMeasurementUnit;
  setValues: React.Dispatch<React.SetStateAction<ConvertMeasurementUnit>>;
  handleConvertUnits: () => void;
};

const LengthMeasurementUnit: React.FC<Props> = ({
  handleSelectChange,
  firstValue,
  handleSwitch,
  secondValue,
  handleInputValues,
  values,
  setValues,
  handleConvertUnits
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('convertLengthMeasurement')} maxWidth={800}>
      <Grid container spacing={1} mb={3}>
        <Grid item xs={5}>
          <BaseSelect
            fullWidth
            id="firstValue"
            label={t('from')}
            name="firstValue"
            onChange={handleSelectChange}
            data={LengthMeasurementUnitsList(t).sort((a: string, b: string) =>
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
            data={LengthMeasurementUnitsList(t).sort((a: string, b: string) =>
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
              maxWidth: '100%',
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

export default LengthMeasurementUnit;
