import { PageHolder } from 'components/PageHolder';
import React from 'react';
import { Box, Grid, styled } from '@mui/material';

import { BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';
import { useTranslation } from 'react-i18next';
import { ImcTableValues, IMCValues } from './types&utils';
import { FixedTable } from 'components/table/FixedTable';
import { useWindowDimensions } from 'utils/getWindowDimensions';

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

  const windowWidth = useWindowDimensions().width;

  return (
    <>
      <PageHolder title={t('calculateBmi')} maxWidth="900px">
        <Box
          sx={{
            display: 'flex',
            flexWrap: windowWidth > 540 ? 'nowrap' : 'wrap',
            height: '100%'
          }}
        >
          <BaseTextField
            name="height"
            label={`${t('height')} (ex.: 1,70)`}
            value={values.height}
            handleChange={handleChange}
            fullWidth
            endAdornment="m"
            sx={{
              mr: windowWidth > 540 ? 2 : 0,
              mb: windowWidth > 540 ? 0 : 2
            }}
          />

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
            sx={{
              mr: windowWidth > 540 ? 2 : 0,
              mb: windowWidth > 540 ? 0 : 2
            }}
          />

          <Box
            sx={{
              width: '100%'
            }}
          >
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
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexWrap: windowWidth > 540 ? 'nowrap' : 'wrap',
            mt: 2
          }}
        >
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
        </Box>

        <Box mt={4} mb={1}>
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

      <Box maxWidth="min-content">
        <FixedTable
          headers={ImcTableValues(t).headers}
          rows={ImcTableValues(t).rows}
        />
      </Box>
    </>
  );
};

export default CalculateIMC;
