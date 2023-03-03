import React, { useState } from 'react';

import {
  Box,
  Grid,
  styled,
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
  ConvertLength,
  LengthMeasurementUnits
} from './type&Utils';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  maxWidht: 800,
  marginTop: '20px'
}));

const LengthMeasurementUnit: React.FC = () => {
  const [firstValue, setFirstValue] = useState<LengthMeasurementUnits>('M');
  const [secondValue, setSecondValue] = useState<LengthMeasurementUnits>('CM');
  const [values, setValues] = useState<ConvertMeasurementUnit>(
    ConvertMeasurementUnitInitialValues
  );

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;

    if (name === 'firstValue') {
      setFirstValue(value as LengthMeasurementUnits);
    }
    if (name === 'secondValue') {
      setSecondValue(value as LengthMeasurementUnits);
    }
  };

  const handleInputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitch = () => {
    setFirstValue(secondValue);
    setSecondValue(firstValue);
  };

  const handleConvertUnits = () => {
    if (firstValue && secondValue && values.input) {
      let result = ConvertLength(firstValue, secondValue, values.input);

      if (result.length > 6) {
        result = result.replace('.', ',');

        result = result.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      }
      result = `${result} ${secondValue.toLocaleLowerCase()}`;

      setValues((prev) => ({
        ...prev,
        result
      }));
    }
  };

  return (
    <PageHolder
      title="Converter unidades de medida de tamanho"
      onBackclick={() => {
        window.history.back();
      }}
    >
      <StyledContainer>
        <Grid container spacing={1} mb={3}>
          <Grid item xs={5}>
            <BaseSelect
              fullWidth
              id="firstValue"
              label="De"
              name="firstValue"
              onChange={handleSelectChange}
              data={LengthMeasurementUnitsList.sort((a, b) =>
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
              label="Para"
              name="secondValue"
              onChange={handleSelectChange}
              data={LengthMeasurementUnitsList.sort((a, b) =>
                a[0].localeCompare(b[0])
              )}
              value={secondValue}
              fullItem
            />
          </Grid>
        </Grid>

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
                      setValues(ConvertMeasurementUnitInitialValues);
                    }}
                  />
                </InputAdornment>
              }
            />
          </Grid>

          <Grid item xs={4}>
            <BaseButton
              onClick={handleConvertUnits}
              title="Converter"
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

export default LengthMeasurementUnit;
