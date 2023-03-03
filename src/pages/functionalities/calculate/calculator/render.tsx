import { PageHolder } from 'components/PageHolder';
import React, { useState } from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';

import { BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';
import { useWindowDimensions } from 'utils/getWindowDimensions';
import { useTranslation } from 'react-i18next';

const StyledHistoricContainer = styled(Grid)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius: '0.75rem',
  overflow: 'auto',
  maxHeight: 200,
  '&::-webkit-scrollbar': {
    width: '0.4em'
  },
  '&::-webkit-scrollbar-track': {
    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: '0.75rem'
  },
  padding: 2
}));

type Props = {
  value: string;
  windowWidth: number;
  previous: string[];
  handleOperator: (operator: string) => void;
  setValue: (value: string) => void;
  handleClear: () => void;
  handleClickNumber: (number: string) => void;
  handleResult: () => void;
};

const CalculatorTool: React.FC<Props> = ({
  value,
  windowWidth,
  previous,
  handleOperator,
  setValue,
  handleClear,
  handleClickNumber,
  handleResult
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('calculator')} maxWidth={900}>
      <Box>
        <BaseTextField
          name="minValue"
          label=""
          value={value}
          handleChange={() => {}}
          fullWidth
          disabled
          textAlign="end"
        />
      </Box>

      <Grid
        display="grid"
        gridTemplateColumns={windowWidth < 425 ? '1fr' : '0.8fr 1.2fr'}
        gap={1}
        mt={2}
      >
        <StyledHistoricContainer>
          <Typography variant="body1">{t('historic')}:</Typography>

          {previous.map((_, index) => {
            const reversed = [...previous].reverse();

            return (
              <Typography key={index} variant="body1">
                {reversed[index]}
              </Typography>
            );
          })}
        </StyledHistoricContainer>

        <Grid
          display="grid"
          gridTemplateColumns="repeat(4, 1fr)"
          sx={{
            gap: '3px'
          }}
        >
          <BaseButton
            sx={{ visibility: 'hidden' }}
            title="%"
            onClick={() => handleOperator('%')}
          />

          <BaseButton title="CE" onClick={() => setValue('')} />

          <BaseButton title="C" onClick={handleClear} />

          <BaseButton title="←" onClick={() => setValue(value.slice(0, -1))} />

          <BaseButton title="7" onClick={() => handleClickNumber('7')} />

          <BaseButton title="8" onClick={() => handleClickNumber('8')} />

          <BaseButton title="9" onClick={() => handleClickNumber('9')} />

          <BaseButton title="X" onClick={() => handleOperator('x')} />

          <BaseButton title="4" onClick={() => handleClickNumber('4')} />

          <BaseButton title="5" onClick={() => handleClickNumber('5')} />

          <BaseButton title="6" onClick={() => handleClickNumber('6')} />

          <BaseButton title="-" onClick={() => handleOperator('-')} />

          <BaseButton title="1" onClick={() => handleClickNumber('1')} />

          <BaseButton title="2" onClick={() => handleClickNumber('2')} />

          <BaseButton title="3" onClick={() => handleClickNumber('3')} />

          <BaseButton title="+" onClick={() => handleOperator('+')} />

          <BaseButton title="/" onClick={() => handleOperator('/')} />

          <BaseButton title="0" onClick={() => handleClickNumber('0')} />

          <BaseButton title="," onClick={() => handleOperator(',')} />

          <BaseButton title="=" onClick={handleResult} />
        </Grid>
      </Grid>
    </PageHolder>
  );
};

export default CalculatorTool;
