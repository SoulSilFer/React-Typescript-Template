import { PageHolder } from 'components/PageHolder';
import React, { Children, useEffect, useState } from 'react';

import {
  Box,
  Grid,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SliderValueLabel
} from '@mui/material';

import { BaseTextField } from 'components/fields';
import { BaseButton } from 'components/buttons';
import { useWindowDimensions } from 'utils/getWindowDimensions';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  maxWidth: 900
}));

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

const CalculatorTool: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [previous, setPrevious] = useState<string[]>([]);

  const handleClickNumber = (number: string) => {
    setValue(value + number);
  };

  const handleOperator = (operator: string) => {
    if (
      value.endsWith('+') ||
      value.endsWith('-') ||
      value.endsWith('x') ||
      value.endsWith('/') ||
      value.endsWith(',')
    ) {
      setValue(value.slice(0, -1) + operator);
    } else {
      setValue(value + operator);
    }
  };

  const handleResult = () => {
    if (
      value.endsWith('+') ||
      value.endsWith('-') ||
      value.endsWith('x') ||
      value.endsWith('/') ||
      value.endsWith(',') ||
      value.endsWith('%')
    ) {
      return;
    }
    let result = value;

    result = result.replace(/x/g, '*');
    result = result.replace(/,/g, '.');
    result = result.replace(/%/g, '/100');

    let resultArray = result.split(/(\+|\-)/g);
    let resultArray2 = resultArray.map((item) => {
      if (item.includes('*') || item.includes('/')) {
        return item.split(/(\*|\/)/g);
      } else {
        return item;
      }
    });

    let resultArray3 = resultArray2.map((item) => {
      if (Array.isArray(item)) {
        let result = item[0];
        for (let i = 1; i < item.length; i += 2) {
          if (item[i] === '*') {
            result = String(Number(result) * Number(item[i + 1]));
          } else if (item[i] === '/') {
            result = String(Number(result) / Number(item[i + 1]));
          }
        }
        return result;
      } else {
        return item;
      }
    });

    result = resultArray3[0];
    for (let i = 1; i < resultArray3.length; i += 2) {
      if (resultArray3[i] === '+') {
        result = String(Number(result) + Number(resultArray3[i + 1]));
      } else if (resultArray3[i] === '-') {
        result = String(Number(result) - Number(resultArray3[i + 1]));
      }
    }

    setValue(result);
    const full = `${value}=${result}`;
    setPrevious([...previous, full]);
  };

  const handleClear = () => {
    setValue('');
    setPrevious([]);
  };

  const windowWidth = useWindowDimensions().width;
  console.log(windowWidth);

  return (
    <PageHolder
      title="Calculadora"
      onBackclick={() => {
        window.history.back();
      }}
    >
      <StyledContainer>
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
            <Typography variant="body1">Histórico:</Typography>

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

            <BaseButton
              title="←"
              onClick={() => setValue(value.slice(0, -1))}
            />

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
      </StyledContainer>
    </PageHolder>
  );
};

export default CalculatorTool;
