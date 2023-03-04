import { Box, Grid, styled, Typography } from '@mui/material';
import { BaseModal } from 'components/modals';
import { PageHolder } from 'components/PageHolder';
import {
  ChangePlayesNameTicTacToe,
  EndGameTicTacToe
} from 'components/pagesComponents';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  TicTacToeGameStatus,
  InitialStateTicTacToeGameStatus,
  InitialStateTicTacToeSections,
  TicTacToeSections,
  TicTacToeWinConditions,
  TicTacToePlayersNames,
  InitialStateTicTacToePlayersNames,
  TicTacToeEndGame,
  InitialStateTicTacToeEndGame
} from './types&utils';

const StyledBaseBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '190px',
  height: '190px',
  backgroundColor: theme.palette.primary.dark,
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.light
  },
  '&:active': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText
}));

const TicTacToeGame: React.FC = () => {
  const { t } = useTranslation();

  const [gameStatus, setGameStatus] = useState<TicTacToeGameStatus>(
    InitialStateTicTacToeGameStatus
  );
  const [sections, setSections] = useState<TicTacToeSections>(
    InitialStateTicTacToeSections
  );
  const [playersName, setPlayersName] = useState<TicTacToePlayersNames>(
    InitialStateTicTacToePlayersNames
  );
  const [changeNameModal, setChangeNameModal] = useState<boolean>(false);
  const [endGameModal, setEndGameModal] = useState<boolean>(false);
  const [savePlayersName, setSavePlayersName] = useState<TicTacToePlayersNames>(
    InitialStateTicTacToePlayersNames
  );
  const [endGameStatus, setEndGameStatus] = useState<TicTacToeEndGame>(
    InitialStateTicTacToeEndGame
  );

  const handlePlayerChange = (e: any) => {
    setPlayersName({ ...playersName, [e.target.name]: e.target.value });
  };

  const cancelChangeName: () => void = () => {
    setPlayersName(savePlayersName);
    setChangeNameModal(false);
  };

  const handleSectionClick = (
    section: 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3'
  ) => {
    if (sections[section].value === '') {
      if (gameStatus.turn === 'player1') {
        setSections({
          ...sections,
          [section]: {
            ...sections[section],
            value: 'X'
          }
        });
        setGameStatus({
          ...gameStatus,
          turn: 'player2'
        });
      } else {
        setSections({
          ...sections,
          [section]: {
            ...sections[section],
            value: 'O'
          }
        });
        setGameStatus({
          ...gameStatus,
          turn: 'player1'
        });
      }
    }
  };

  useEffect(() => {
    TicTacToeWinConditions.forEach((condition: string[]) => {
      const sectionsAny = sections as any;
      if (
        sectionsAny[condition[0]].value === 'X' &&
        sectionsAny[condition[1]].value === 'X' &&
        sectionsAny[condition[2]].value === 'X'
      ) {
        setGameStatus({
          ...gameStatus,
          player1: gameStatus.player1 + 1,
          games: gameStatus.games + 1,
          turn: 'player1'
        });
        setEndGameStatus({
          winner: 'player1'
        });
      } else if (
        sectionsAny[condition[0]].value === 'O' &&
        sectionsAny[condition[1]].value === 'O' &&
        sectionsAny[condition[2]].value === 'O'
      ) {
        setGameStatus({
          ...gameStatus,
          player2: gameStatus.player2 + 1,
          games: gameStatus.games + 1,
          turn: 'player2'
        });
        setEndGameStatus({
          winner: 'player2'
        });
      } else {
        let draw = true;
        Object.keys(sections).forEach((section: string) => {
          if (sectionsAny[section].value === '') {
            draw = false;
          }
        });
        if (draw) {
          setGameStatus({
            ...gameStatus,
            draws: gameStatus.draws + 1,
            games: gameStatus.games + 1,
            turn: 'player1'
          });
          setEndGameStatus({
            winner: 'draw'
          });
        }
      }
    });
  }, [sections]);

  const closeEndGameModal: () => void = () => {
    setEndGameModal(false);
    setEndGameStatus(InitialStateTicTacToeEndGame);
    setSections(InitialStateTicTacToeSections);
  };

  useEffect(() => {
    if (endGameStatus.winner !== null) {
      setEndGameModal(true);
    }
  }, [endGameStatus]);

  const getWinPlayerName = () => {
    if (endGameStatus.winner === 'player1') {
      return `${playersName.player1} ${t('won')}`;
    } else if (endGameStatus.winner === 'player2') {
      return `${playersName.player2} ${t('won')}`;
    } else {
      return t('draw');
    }
  };

  return (
    <PageHolder title={t('ticTacToe')}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          bgcolor: 'primary.main',
          border: '1px solid black',
          borderRadius: 1,
          p: 1,
          mb: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            bgcolor: 'primary.dark',
            width: '100%',
            mb: 1,
            borderRadius: 1
          }}
        >
          <StyledTypography>Ranking</StyledTypography>
        </Box>

        <StyledTypography
          onClick={() => {
            setSavePlayersName(playersName);
            setChangeNameModal(!changeNameModal);
          }}
        >
          {playersName.player1}: {gameStatus.player1}
        </StyledTypography>

        <StyledTypography>
          {playersName.player2}: {gameStatus.player2}
        </StyledTypography>

        <StyledTypography>
          {t('draws')}: {gameStatus.draws}
        </StyledTypography>

        <StyledTypography>
          {t('matches')}: {gameStatus.games}
        </StyledTypography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'primary.main',
          border: '1px solid black',
          borderRadius: 1,
          p: 1
        }}
      >
        <Grid
          container
          gridTemplateColumns="repeat(3, 0fr)"
          display="grid"
          justifyContent="center"
          alignItems="center"
        >
          <StyledBaseBox
            sx={{
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              borderTopLeftRadius: 4
            }}
            onClick={() => {
              handleSectionClick('A1');
            }}
          >
            <StyledTypography>{sections.A1.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderRight: '1px solid black',
              borderBottom: '1px solid black'
            }}
            onClick={() => {
              handleSectionClick('A2');
            }}
          >
            <StyledTypography>{sections.A2.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderBottom: '1px solid black',
              borderTopRightRadius: 4
            }}
            onClick={() => {
              handleSectionClick('A3');
            }}
          >
            <StyledTypography>{sections.A3.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderRight: '1px solid black',
              borderBottom: '1px solid black'
            }}
            onClick={() => {
              handleSectionClick('B1');
            }}
          >
            <StyledTypography>{sections.B1.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderRight: '1px solid black',
              borderBottom: '1px solid black'
            }}
            onClick={() => {
              handleSectionClick('B2');
            }}
          >
            <StyledTypography>{sections.B2.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderBottom: '1px solid black'
            }}
            onClick={() => {
              handleSectionClick('B3');
            }}
          >
            <StyledTypography>{sections.B3.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderRight: '1px solid black',
              borderBottomLeftRadius: 4
            }}
            onClick={() => {
              handleSectionClick('C1');
            }}
          >
            <StyledTypography>{sections.C1.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderRight: '1px solid black'
            }}
            onClick={() => {
              handleSectionClick('C2');
            }}
          >
            <StyledTypography>{sections.C2.value}</StyledTypography>
          </StyledBaseBox>

          <StyledBaseBox
            sx={{
              borderBottomRightRadius: 4
            }}
            onClick={() => {
              handleSectionClick('C3');
            }}
          >
            <StyledTypography>{sections.C3.value}</StyledTypography>
          </StyledBaseBox>
        </Grid>
      </Box>

      <BaseModal handleClose={cancelChangeName} open={changeNameModal}>
        <ChangePlayesNameTicTacToe
          valueP1={playersName.player1}
          valueP2={playersName.player2}
          handleChange={handlePlayerChange}
          handleSubmit={() => setChangeNameModal(false)}
          handleCancel={cancelChangeName}
        />
      </BaseModal>

      <BaseModal
        handleClose={closeEndGameModal}
        open={endGameModal}
        minSize={{
          width: '25%'
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

export default TicTacToeGame;
