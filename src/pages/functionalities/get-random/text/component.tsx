import { PageHolder } from 'components/PageHolder';
import React, { Children, useEffect, useState } from 'react';

import {
  Box,
  Grid,
  Typography,
  styled,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';

import { BaseTextField } from 'components/fields';
import { InitialStateRandomText, RandomText } from '../types&utils';
import { BaseButton } from 'components/buttons';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem',
  minWidth: '765px'
}));

type Props = {
  allInOne: boolean;
};

const GetRandomTextFunctionality: React.FC<Props> = ({ allInOne }) => {
  const [values, setValues] = useState<RandomText>(InitialStateRandomText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const getRandomText = () => {
    const { inputText, qtd } = values;
    const qtdNumber = parseInt(qtd);
    const textArray = inputText
      .split(',')
      .map((text) => text.trim())
      .filter((text) => text !== '');
    let randomTextArray: string[] = [];

    if (textArray.length === 0) {
      setValues({ ...values, result: '' });
      return;
    }

    if (textArray.length === 1) {
      setValues({ ...values, result: textArray[0] });
      return;
    }

    if (qtdNumber >= textArray.length) {
      randomTextArray = [...textArray].sort();
    } else {
      while (randomTextArray.length < qtdNumber) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        const randomText = textArray[randomIndex];
        if (!randomTextArray.includes(randomText)) {
          randomTextArray.push(randomText);
        }
      }
      randomTextArray.sort();
    }

    setValues({ ...values, result: randomTextArray.join(', ') });
  };

  const disableButton =
    values.inputText === undefined ||
    values.inputText === '' ||
    values.qtd === undefined ||
    values.qtd === '';

  const content: React.ReactNode = (
    <StyledBox>
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
        <Typography color="primary.contrastText">Texto</Typography>
      </Box>

      <Grid container spacing={1} mt={3}>
        <Grid item xs={10}>
          <BaseTextField
            name="inputText"
            label="Texto a ser sortido"
            value={values.inputText}
            handleChange={handleChange}
            fullWidth
            multiline
            rows={4}
            tooltipContentArray={[
              'Os textos devem ser separados pela virgula (,)'
            ]}
            tooltipTitle="Formato aceito"
          />
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" flexDirection="column" height="100%">
            <BaseTextField
              name="qtd"
              label="Qtd. resultado"
              value={values.qtd}
              handleChange={handleChange}
              fullWidth
              type="number"
            />

            <Box height="100%" mt={1}>
              <BaseButton
                disabled={disableButton}
                title="Gerar valores"
                sx={{ textTransform: 'none', height: '100%' }}
                onClick={getRandomText}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

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
        <Typography color="primary.contrastText">Resultado</Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <BaseTextField
            name="result"
            label="Resultado"
            value={values.result}
            disabled
            handleChange={() => {}}
            fullWidth
            multiline
            rows={6}
            shrink
          />
        </Grid>
      </Grid>
    </StyledBox>
  );

  const pageHolder = (children: React.ReactNode) => {
    if (allInOne) {
      return <>{children}</>;
    } else {
      return (
        <PageHolder
          title="Pegar aleatório"
          onBackclick={() => {
            window.history.back();
          }}
        >
          {children}
        </PageHolder>
      );
    }
  };

  return <>{pageHolder(content)}</>;
};

export default GetRandomTextFunctionality;
