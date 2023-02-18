import { PageHolder } from 'components/PageHolder';
import React, { useEffect, useState } from 'react';

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
import {
  InitialStateRandomNumbers,
  InitialStateRandomNumbersChecks,
  RandomNumbers,
  RandomNumbersChecks
} from './types&utils';
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

const GetRandomFunctionality: React.FC = () => {
  const [randomNumbers, setRandomNumbers] = useState<RandomNumbers>(
    InitialStateRandomNumbers
  );
  const [inputNumbersArray, setInputNumbersArray] = useState<string[]>([]);
  const [checkValues, setCheckValue] = useState<RandomNumbersChecks>(
    InitialStateRandomNumbersChecks
  );
  const [numbersArray, setNumbersArray] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'insertOwnNumbers') {
      const regex = /^[0-9\b,\.]+$/;
      const regexTest = regex.test(value);
      if (regexTest) {
        const numbers = value.split(',').map((number) => number);
        setInputNumbersArray(numbers);
      } else {
        return;
      }
    }
    if (name === 'qtd') {
      const regex = /^[0-9\b]+$/;
      if (value === '' || regex.test(value)) {
        setRandomNumbers({ ...randomNumbers, [name]: value });
      }
      return;
    }
    setRandomNumbers({ ...randomNumbers, [name]: value });
  };

  const { minValue, maxValue, qtd } = randomNumbers;
  const min = Number(minValue);
  const max = Number(maxValue);
  const qtdNumbers = Number(qtd);
  const sumeBtwMaxAndMin = Math.abs(max - min);

  const generateRandomNumbers = () => {
    const numbersArray: number[] = [];

    if (checkValues.insertOwnNumbers) {
      const numbers = inputNumbersArray.map((number) => Number(number));
      if (numbers.length > qtdNumbers) {
        const uniqueNumbersArray = numbers.filter(
          (item, index) => numbers.indexOf(item) === index
        );
        const randomNumbersArray = uniqueNumbersArray.sort(
          () => Math.random() - 0.5
        );

        numbersArray.push(...randomNumbersArray.slice(0, qtdNumbers));
      } else {
        numbersArray.push(...numbers);
      }
    } else {
      while (numbersArray.length < qtdNumbers) {
        const random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbersArray.includes(random)) {
          numbersArray.push(random);
        }
      }
    }

    const uniqueNumbersArray = numbersArray.filter(
      (item, index) => numbersArray.indexOf(item) === index
    );
    const sortMinToMaxNumbers = uniqueNumbersArray.sort((a, b) => a - b);

    setNumbersArray(sortMinToMaxNumbers.join(', '));
  };

  const [errorMsg, setErrorMsg] = useState<string>('');

  const errrorCond1 = checkValues.insertOwnNumbers && qtdNumbers === 0;
  const errrorCond2 =
    checkValues.insertOwnNumbers && inputNumbersArray.length <= qtdNumbers;
  const errrorCond3 =
    !checkValues.insertOwnNumbers &&
    (qtd === '' || minValue === '' || maxValue === '');
  const errrorCond4 =
    !checkValues.insertOwnNumbers && qtdNumbers > sumeBtwMaxAndMin;
  const errrorCond5 = !checkValues.insertOwnNumbers && min > max;
  const errrorCond6 = !checkValues.insertOwnNumbers && qtdNumbers === 0;

  const disableButton =
    errrorCond1 || errrorCond2 || errrorCond3 || errrorCond4 || errrorCond5;

  useEffect(() => {
    if (disableButton) {
      if (errrorCond1) {
        setErrorMsg('Insira os números e a quantidade de números');
      }
      if (errrorCond2) {
        setErrorMsg(
          'A quantidade de números não pode ser maior que a quantidade de números inseridos'
        );
      }
      if (errrorCond3) {
        setErrorMsg('Insira os valores');
      }
      if (errrorCond4) {
        setErrorMsg(
          'A quantidade de números não pode ser maior que a diferença entre os valores'
        );
      }
      if (errrorCond5) {
        setErrorMsg('O valor mínimo não pode ser maior que o valor máximo');
      }
      if (errrorCond6) {
        setErrorMsg('O número da quantidade de resultados não pode ser 0');
      }
    } else {
      setErrorMsg('');
    }
  }, [checkValues, inputNumbersArray, qtdNumbers]);

  return (
    <PageHolder
      title="Pegar aleatório"
      onBackclick={() => {
        window.history.back();
      }}
    >
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
          <Typography color="primary.contrastText">Números</Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <BaseTextField
              name="minValue"
              label="Valor mínimo"
              value={randomNumbers.minValue}
              handleChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>

          <Grid item xs={3}>
            <BaseTextField
              name="maxValue"
              label="Valor máximo"
              value={randomNumbers.maxValue}
              handleChange={handleChange}
              fullWidth
              type="number"
            />
          </Grid>

          <Grid item xs={3}>
            <BaseTextField
              name="qtd"
              label="Qtd. resultado"
              value={randomNumbers.qtd}
              handleChange={handleChange}
              fullWidth
              type="number"
              InputPropsRest={{}}
            />
          </Grid>

          <Grid item xs={3}>
            <BaseButton
              onClick={generateRandomNumbers}
              title="Gerar valores"
              disabled={disableButton}
              size={{ height: '100%' }}
            />
          </Grid>
        </Grid>

        {disableButton && (
          <Grid container spacing={1} mt={0}>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {errorMsg}
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={1} mt={3}>
          <Grid item xs={6}>
            <FormGroup
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%'
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onClick={() =>
                      setCheckValue({
                        ...checkValues,
                        insertOwnNumbers: !checkValues.insertOwnNumbers
                      })
                    }
                  />
                }
                label="Inserir números próprios"
                checked={checkValues.insertOwnNumbers}
              />
            </FormGroup>
          </Grid>
        </Grid>

        {checkValues.insertOwnNumbers && (
          <Grid container spacing={1} mt={3}>
            <Grid item xs={12}>
              <BaseTextField
                name="insertOwnNumbers"
                label="Números a ser sortidos"
                value={randomNumbers.insertOwnNumbers}
                handleChange={handleChange}
                fullWidth
                multiline
                rows={3}
                tooltipContentArray={[
                  'Somente números, virgula (,) e ponto(.) são aceitos',
                  'Os números devem ser separados pela virgula (,)',
                  'Para utilizar número "quebrados" usar ponto (.)'
                ]}
                tooltipTitle="Formato aceito"
              />
            </Grid>
          </Grid>
        )}

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
              value={numbersArray}
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
    </PageHolder>
  );
};

export default GetRandomFunctionality;
