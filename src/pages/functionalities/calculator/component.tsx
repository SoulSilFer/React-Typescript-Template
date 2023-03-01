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

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  maxWidth: 900
}));

const CoinConverter: React.FC = () => {
  return (
    <PageHolder
      title="Calculadora"
      onBackclick={() => {
        window.history.back();
      }}
    >
      <StyledContainer>a</StyledContainer>
    </PageHolder>
  );
};

export default CoinConverter;
