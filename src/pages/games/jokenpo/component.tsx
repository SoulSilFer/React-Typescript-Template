import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Grid, Typography, Stack } from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import { BaseButton } from 'components/buttons';
import { RankingCard } from 'components/cards';
import {
  InitialStateJokenpoGame,
  InitialStateJokenpoGameRanking,
  JokenpoGameRanking,
  JokenpoGameState
} from './types&utils';
import sound from '/static/toasty_tfCWsU6.mp3';

const JokenpoGame: React.FC = () => {
  const { t } = useTranslation();

  const [modal, setModal] = useState<boolean>(false);
  const [gameState, setGameState] = useState<JokenpoGameState>(
    InitialStateJokenpoGame
  );
  const [ranking, setRanking] = useState<JokenpoGameRanking>(
    InitialStateJokenpoGameRanking
  );

  const playAudio = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  const selectValue = (value: 'scizor' | 'rock' | 'paper') => {
    let itemArray = ['scizor', 'rock', 'paper'];
    let randomItem = itemArray[Math.floor(Math.random() * itemArray.length)];

    setGameState({
      ...gameState,
      playerChoice: value,
      computerChoice: randomItem as 'scizor' | 'rock' | 'paper'
    });

    if (value === 'scizor') {
      if (randomItem === 'rock') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'computer'
        });
        setRanking({
          ...ranking,
          computer: ranking.computer + 1,
          totalGames: ranking.totalGames + 1
        });
      } else if (randomItem === 'paper') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'player'
        });
        setRanking({
          ...ranking,
          player: ranking.player + 1,
          totalGames: ranking.totalGames + 1
        });
      } else {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'draw'
        });
        setRanking({
          ...ranking,
          draw: ranking.draw + 1,
          totalGames: ranking.totalGames + 1
        });
      }
    } else if (value === 'rock') {
      if (randomItem === 'rock') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'draw'
        });
        setRanking({
          ...ranking,
          draw: ranking.draw + 1,
          totalGames: ranking.totalGames + 1
        });
      } else if (randomItem === 'paper') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'computer'
        });
        setRanking({
          ...ranking,
          computer: ranking.computer + 1,
          totalGames: ranking.totalGames + 1
        });
      } else {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'player'
        });
        setRanking({
          ...ranking,
          player: ranking.player + 1,
          totalGames: ranking.totalGames + 1
        });
      }
    } else if (value === 'paper') {
      if (randomItem === 'rock') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'player'
        });
        setRanking({
          ...ranking,
          player: ranking.player + 1,
          totalGames: ranking.totalGames + 1
        });
      } else if (randomItem === 'paper') {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'draw'
        });
        setRanking({
          ...ranking,
          draw: ranking.draw + 1,
          totalGames: ranking.totalGames + 1
        });
      } else {
        setGameState({
          playerChoice: value,
          computerChoice: randomItem as 'scizor' | 'rock' | 'paper',
          winner: 'computer'
        });
        setRanking({
          ...ranking,
          computer: ranking.computer + 1,
          totalGames: ranking.totalGames + 1
        });
      }
    }
  };

  const getWinnerText = () => {
    if (gameState.winner === 'player') {
      return t('youWon');
    } else if (gameState.winner === 'computer') {
      return t('youLost');
    } else {
      return `${t('draw')}!`;
    }
  };

  useEffect(() => {
    if (ranking.totalGames === 8 && gameState.winner === 'computer') {
      setModal(true);
      playAudio();
    } else if (modal && ranking.totalGames !== 2) {
      setModal(false);
    }
  }, [gameState.winner]);

  return (
    <PageHolder
      title="Xadrez"
      mainSx={{
        position: 'relative'
      }}
    >
      <RankingCard
        titles={[
          {
            name: t('player'),
            value: ranking.player
          },
          {
            name: t('computer'),
            value: ranking.computer
          },
          {
            name: t('draws'),
            value: ranking.draw
          },
          {
            name: t('qtdGames'),
            value: ranking.totalGames
          }
        ]}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'primary.main',
          border: '1px solid black',
          height: 300,
          borderRadius: 1,
          p: 1
        }}
      >
        <Grid
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          sx={{
            bgcolor: 'primary.dark',
            width: '100%',
            height: '100%',
            mb: 1,
            borderRadius: 1
          }}
        >
          <Typography color="primary.contrastText" variant="h5">
            {t('chooseYourWeapon')}:
          </Typography>

          <Stack direction="row" gap={2} mb={3} mt={2}>
            <BaseButton
              title="Papel"
              onClick={() => {
                selectValue('paper');
              }}
            />

            <BaseButton
              title="Pedra"
              onClick={() => {
                selectValue('rock');
              }}
            />

            <BaseButton
              title="Tesoura"
              onClick={() => {
                selectValue('scizor');
              }}
            />
          </Stack>

          <Typography color="primary.contrastText">
            {t('theComputerChose')}:
          </Typography>

          <Typography color="primary.contrastText" variant="h6">
            <b> {gameState.computerChoice && t(gameState.computerChoice)}</b>
          </Typography>

          <Typography color="primary.contrastText" variant="h5">
            <b>{gameState.winner && getWinnerText()}</b>
          </Typography>
        </Grid>
      </Box>

      {modal && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '0%',
            right: '-1%',
            width: '100px',
            height: '100px',
            transition: 'all 1s ease-in-out'
          }}
        >
          <img src="../static/toasty.png" alt="" width="100%" />
        </Box>
      )}
    </PageHolder>
  );
};

export default JokenpoGame;
