import { Box, Grid, Typography } from '@mui/material';
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
    <PageHolder
      title={t('ticTacToe')}
      onBackclick={() => {
        window.history.back();
      }}
    >
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
          <Typography color="primary.contrastText">Ranking</Typography>
        </Box>

        <Typography
          color="primary.contrastText"
          onClick={() => {
            setSavePlayersName(playersName);
            setChangeNameModal(!changeNameModal);
          }}
        >
          {playersName.player1}: {gameStatus.player1}
        </Typography>

        <Typography color="primary.contrastText">
          {playersName.player2}: {gameStatus.player2}
        </Typography>

        <Typography color="primary.contrastText">
          {t('draws')}: {gameStatus.draws}
        </Typography>

        <Typography color="primary.contrastText">
          {t('matches')}: {gameStatus.games}
        </Typography>
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              borderTopLeftRadius: 1,
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('A1');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.A1.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('A2');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.A2.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderBottom: '1px solid black',
              borderTopRightRadius: 1,
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('A3');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.A3.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('B1');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.B1.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              borderBottom: '1px solid black',
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('B2');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.B2.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderBottom: '1px solid black',
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('B3');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.B3.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              borderBottomLeftRadius: 1,
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('C1');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.C1.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderRight: '1px solid black',
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('C2');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.C2.value}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '190px',
              height: '190px',
              bgcolor: 'primary.dark',
              cursor: 'pointer',
              borderBottomRightRadius: 1,
              '&:hover': {
                backgroundColor: 'primary.light'
              },
              '&:active': {
                backgroundColor: 'primary.dark'
              }
            }}
            onClick={() => {
              handleSectionClick('C3');
            }}
          >
            <Typography color="primary.contrastText">
              {sections.C3.value}
            </Typography>
          </Box>
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
