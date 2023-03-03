import { PageHolder } from 'components/PageHolder';
import React from 'react';

import { Box, Grid, Typography, styled } from '@mui/material';

import { BaseTextField } from 'components/fields';
import { RandomText } from './types&utils';
import { BaseButton } from 'components/buttons';
import { useTranslation } from 'react-i18next';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '0.75rem'
}));

type Props = {
  allInOne: boolean;
  values: RandomText;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableButton: boolean;
  getRandomText: () => void;
};

const GetRandomTextFunctionality: React.FC<Props> = ({
  allInOne,
  values,
  handleChange,
  disableButton,
  getRandomText
}) => {
  const { t } = useTranslation();

  const content: React.ReactNode = (
    <>
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
        <Typography color="primary.contrastText">{t('text')}</Typography>
      </Box>

      <Grid container spacing={1} mt={3}>
        <Grid item xs={10}>
          <BaseTextField
            name="inputText"
            label={t('textToBeSorted')}
            value={values.inputText}
            handleChange={handleChange}
            fullWidth
            multiline
            rows={4}
            tooltipContentArray={[t('textSpreadByComma')]}
            tooltipTitle={t('acceptFormat')}
          />
        </Grid>

        <Grid item xs={2}>
          <Box display="flex" flexDirection="column" height="100%">
            <BaseTextField
              name="qtd"
              label={t('qtdResult')}
              value={values.qtd}
              handleChange={handleChange}
              fullWidth
              type="number"
            />

            <Box height="100%" mt={1}>
              <BaseButton
                disabled={disableButton}
                title={t('generateValues')}
                sx={{
                  textTransform: 'none',
                  height: '100%',
                  width: '100%',
                  borderRadius: '0.75rem'
                }}
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
        <Typography color="primary.contrastText">{t('result')}</Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={12}>
          <BaseTextField
            name="result"
            label={t('result')}
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
    </>
  );

  const pageHolder = (children: React.ReactNode) => {
    if (allInOne) {
      return <StyledBox>{children}</StyledBox>;
    } else {
      return <PageHolder title={t('getRandom')}>{children}</PageHolder>;
    }
  };

  return <>{pageHolder(content)}</>;
};

export default GetRandomTextFunctionality;
