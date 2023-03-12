import React, { useState } from 'react';

import { Box, Grid, styled, Typography } from '@mui/material';

import { PageHolder } from 'components/PageHolder';

import {
  InitialStateTicTacToeEndGame,
  InitialStateTicTacToeGameStatus,
  TicTacToeEndGame,
  TicTacToeGameStatus,
  TicTacToeSections,
  InitialStateTicTacToeSections,
  TicTacToeWinConditions
} from './types&utils';
import { BaseModal } from 'components/modals';
import { EndGameTicTacToe } from 'components/pagesComponents';
import { useTranslation } from 'react-i18next';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

const BaseBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.5rem'
}));

const StyledValueContainer = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.light,
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
  color: theme.palette.primary.contrastText,
  fontSize: '2rem',
  fontWeight: 'bold',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

type Props = {
  gameStatus: TicTacToeGameStatus;
  closeEndGameModal: () => void;
  setAgainst: React.Dispatch<React.SetStateAction<'player' | 'computer'>>;
  against: 'player' | 'computer';
  handleSectionClick: (
    section: 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3'
  ) => void;
  sections: TicTacToeSections;
  xImg: JSX.Element;
  oImg: JSX.Element;
  endGameModal: boolean;
  getWinPlayerName: () => string;
};

const TicTacToeRender: React.FC<Props> = ({
  gameStatus,
  closeEndGameModal,
  setAgainst,
  against,
  handleSectionClick,
  sections,
  xImg,
  oImg,
  endGameModal,
  getWinPlayerName
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('ticTacToe')}>
      <Box
        bgcolor="primary.light"
        borderRadius={1}
        p={1}
        color="primary.contrastText"
        sx={{
          '& .MuiFormLabel-root': {
            color: 'primary.contrastText'
          },
          '& .MuiRadio-root': {
            color: 'primary.contrastText'
          },
          '& .MuiRadio-root.Mui-checked': {
            color: 'primary.contrastText'
          }
        }}
      >
        <Typography
          borderRadius={1}
          variant="h5"
          justifyContent="center"
          display="flex"
          mb={1}
          bgcolor="primary.dark"
        >
          Ranking
        </Typography>

        <Typography variant="body1">
          {t('player')} X: <b>{gameStatus.player1}</b>
        </Typography>

        <Typography variant="body1">
          {t('player')} O: <b>{gameStatus.player2}</b>
        </Typography>

        <Typography variant="body1">
          {t('draw')}: <b>{gameStatus.draws}</b>
        </Typography>

        <Typography variant="body1">
          {t('matches')}: <b>{gameStatus.games}</b>
        </Typography>

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            {`${t('playAgainst')}:`}
          </FormLabel>

          <RadioGroup row>
            <FormControlLabel
              value="player"
              control={<Radio />}
              label={t('player')}
              onChange={() => {
                closeEndGameModal();
                setAgainst('player');
              }}
              checked={against === 'player'}
            />

            <FormControlLabel
              value="computer"
              control={<Radio />}
              label={t('computer')}
              onChange={() => {
                closeEndGameModal();
                setAgainst('computer');
              }}
              checked={against === 'computer'}
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        sx={{
          width: '50%',
          alignSelf: 'center'
        }}
        mt={3}
        mb={3}
      >
        <Grid
          justifyItems="center"
          gridTemplateColumns="repeat(3, 1fr)"
          gridTemplateRows="repeat(3, 2fr)"
          display="grid"
          sx={{
            aspectRatio: '1/1'
          }}
        >
          <BaseBox
            sx={{
              borderRight: '2px solid',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              borderBottomRightRadius: '10px'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('A1')}>
              {sections.A1 === 'X' ? xImg : sections.A1 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderColor: 'primary.main'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('A2')}>
              {sections.A2 === 'X' ? xImg : sections.A2 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderLeft: '2px solid',
              borderBottom: '2px solid',
              borderColor: 'primary.main',
              borderBottomLeftRadius: '10px'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('A3')}>
              {sections.A3 === 'X' ? xImg : sections.A3 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderColor: 'primary.main'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('B1')}>
              {sections.B1 === 'X' ? xImg : sections.B1 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              border: '2px solid',
              borderRadius: '10px',
              borderColor: 'primary.main'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('B2')}>
              {sections.B2 === 'X' ? xImg : sections.B2 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderColor: 'primary.main'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('B3')}>
              {sections.B3 === 'X' ? xImg : sections.B3 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderRight: '2px solid',
              borderTop: '2px solid',
              borderColor: 'primary.main',
              borderTopRightRadius: '10px'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('C1')}>
              {sections.C1 === 'X' ? xImg : sections.C1 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox>
            <StyledValueContainer onClick={() => handleSectionClick('C2')}>
              {sections.C2 === 'X' ? xImg : sections.C2 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>

          <BaseBox
            sx={{
              borderLeft: '2px solid',
              borderTop: '2px solid',
              borderColor: 'primary.main',
              borderTopLeftRadius: '10px',
              borderWidth: '80%'
            }}
          >
            <StyledValueContainer onClick={() => handleSectionClick('C3')}>
              {sections.C3 === 'X' ? xImg : sections.C3 === 'O' ? oImg : null}
            </StyledValueContainer>
          </BaseBox>
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography variant="h6">
          {`${t('currentPlayer')}: `}
          <b>
            {gameStatus.turn === 'player1'
              ? 'X'
              : gameStatus.turn === 'computer'
              ? 'computador'
              : 'O'}
          </b>
        </Typography>
      </Box>

      <BaseModal
        handleClose={closeEndGameModal}
        open={endGameModal}
        minSize={{
          width: '50%'
        }}
      >
        <EndGameTicTacToe
          title={getWinPlayerName()}
          handleSubmit={() => {
            closeEndGameModal();
          }}
        />
      </BaseModal>
    </PageHolder>
  );
};

export default TicTacToeRender;
