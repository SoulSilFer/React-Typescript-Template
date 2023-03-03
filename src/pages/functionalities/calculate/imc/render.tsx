import { PageHolder } from 'components/PageHolder';
import React from 'react';
import { Box, Grid, styled } from '@mui/material';

import { BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';
import { useTranslation } from 'react-i18next';
import { ImcTableValues, IMCValues } from './types&utils';
import { FixedTable } from 'components/table/FixedTable';

type Props = {
  values: IMCValues;
  handleClear: () => void;
  handleResult: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableButton: boolean;
};

const CalculateIMC: React.FC<Props> = ({
  values,
  handleClear,
  handleResult,
  handleChange,
  disableButton
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('calculateBmi')} maxWidth="900px">
      <Grid container spacing={1} mb={6} mt={1}>
        <Grid item xs={4}>
          <BaseTextField
            name="height"
            label={`${t('height')} (ex.: 1,70)`}
            value={values.height}
            handleChange={handleChange}
            fullWidth
            endAdornment="m"
          />
        </Grid>

        <Grid item xs={4}>
          <BaseTextField
            name="weight"
            label={`${t('weight')} (ex.: 69,2)`}
            value={values.weight}
            handleChange={handleChange}
            fullWidth
            onKeyDown={(event) => {
              console.log(event);
              if (event.key === 'Enter') {
                handleResult();
              }
            }}
            endAdornment="Kg"
          />
        </Grid>

        <Grid item xs={2}>
          <BaseButton
            title={t('calculate')}
            onClick={handleResult}
            sx={{
              width: '100%',
              height: '100%',
              textTransform: 'none',
              borderRadius: '0.75rem'
            }}
            disabled={disableButton}
          />
        </Grid>

        <Grid item xs={2}>
          <BaseButton
            title={t('clear')}
            onClick={handleClear}
            sx={{
              width: '100%',
              height: '100%',
              textTransform: 'none',
              borderRadius: '0.75rem'
            }}
          />
        </Grid>
      </Grid>

      <Box maxWidth="min-content">
        <FixedTable
          headers={ImcTableValues(t).headers}
          rows={ImcTableValues(t).rows}
        />
      </Box>

      <Box mt={6} mb={1}>
        <BaseTextField
          name="result"
          label={t('result')}
          value={values.result}
          handleChange={() => {}}
          fullWidth
          disabled
        />
      </Box>
    </PageHolder>
  );
};

export default CalculateIMC;
