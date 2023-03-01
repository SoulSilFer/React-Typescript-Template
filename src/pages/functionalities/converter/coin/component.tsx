import React, { Children, useEffect, useState } from 'react';
import axios from 'axios';

import {
  Box,
  Grid,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup,
  SliderValueLabel,
  SelectChangeEvent
} from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import { BaseSelect } from 'components/fields';
import { CoinsJson } from './type&Utils';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  maxWidth: 900
}));

type ApiResponse = {
  ask: string;
  bid: string;
  code: string;
  codein: string;
  create_date: Date;
  high: string;
  low: string;
  name: string;
  pctChange: string;
  timestamp: string;
  varBid: string;
};

const CoinConverter: React.FC = () => {
  const [coins, setCoins] = useState<[string | number, string][]>([]);
  const [firstCoin, setFirstCoin] = useState<string>('');
  const [secondCoin, setSecondCoin] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    const { name, value } = event.target;

    if (name === 'firstCoin') {
      setFirstCoin(value as string);
    }
    if (name === 'secondCoin') {
      setSecondCoin(value as string);
    }
  };

  console.log(firstCoin, secondCoin);

  return (
    <PageHolder
      title="Converter dinheiro"
      onBackclick={() => {
        window.history.back();
      }}
    >
      <StyledContainer>
        <BaseSelect
          fullWidth
          id="firstCoin"
          label="De"
          name="firstCoin"
          onChange={handleSelectChange}
          data={CoinsJson.sort((a, b) => a[0].localeCompare(b[0]))}
          value={firstCoin}
        />
      </StyledContainer>
    </PageHolder>
  );
};

export default CoinConverter;
