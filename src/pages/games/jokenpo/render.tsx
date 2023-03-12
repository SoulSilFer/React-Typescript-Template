import React from 'react';

import { Box, Stack, Typography, styled } from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import { JokenpoChoices, JokenpoGameState } from './types&utils';
import { useTranslation } from 'react-i18next';

const ImgContainer = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  cursor: 'pointer',
  animation: '$pulse 0.2s',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    transform: 'scale(1.1)'
  }
}));

type Props = {
  gameState: JokenpoGameState;
  endGameMsg: string;
  handleClick: (choice: JokenpoChoices) => void;
};

const JokenpoRender: React.FC<Props> = ({
  gameState,
  endGameMsg,
  handleClick
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('jokenpo')}>
      <Box
        bgcolor="primary.light"
        borderRadius={1}
        p={1}
        color="primary.contrastText"
        sx={{
          '& .MuiFormLabel-root': {
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
          {t('player')}: <b>{gameState.ranking.player}</b>
        </Typography>

        <Typography variant="body1">
          {t('computer')}: <b>{gameState.ranking.computer}</b>
        </Typography>

        <Typography variant="body1">
          {t('Draw')}: <b>{gameState.ranking.draw}</b>
        </Typography>

        <Typography variant="body1">
          {t('matches')}: <b>{gameState.ranking.totalGames}</b>
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={3}
        flexDirection="column"
      >
        <Typography variant="h6" mb={2}>
          {`${t('chooseAnOption')}:`}
        </Typography>

        <Stack direction="row" gap={3}>
          <ImgContainer
            sx={{
              opacity:
                !gameState.playerChoice ||
                (gameState.playerChoice && gameState.playerChoice === 'rock')
                  ? 1
                  : 0.5
            }}
          >
            <img
              src="/static/rock.png"
              alt="Pedra"
              style={{
                width: '100%'
              }}
              onClick={() => handleClick('rock')}
            />
          </ImgContainer>

          <ImgContainer
            sx={{
              opacity:
                !gameState.playerChoice ||
                (gameState.playerChoice && gameState.playerChoice === 'paper')
                  ? 1
                  : 0.5
            }}
          >
            <img
              src="/static/paper.png"
              alt="Papel"
              style={{
                width: '100%'
              }}
              onClick={() => handleClick('paper')}
            />
          </ImgContainer>

          <ImgContainer
            sx={{
              opacity:
                !gameState.playerChoice ||
                (gameState.playerChoice && gameState.playerChoice === 'scizor')
                  ? 1
                  : 0.5
            }}
          >
            <img
              src="/static/scizor.png"
              alt="Tesoura"
              style={{
                width: '100%'
              }}
              onClick={() => handleClick('scizor')}
            />
          </ImgContainer>
        </Stack>

        <Typography variant="h6" mb={2} mt={2}>
          {`${t('theComputerChose')}:`}
        </Typography>

        <ImgContainer
          sx={{
            opacity: gameState && gameState.computerChoice ? 1 : 0.5
          }}
        >
          {gameState && gameState.computerChoice ? (
            <img
              src={`/static/${gameState.computerChoice}.png`}
              alt="Pedra"
              style={{
                width: '100%',
                transform: 'scale(-1, 1)'
              }}
            />
          ) : (
            <></>
          )}
        </ImgContainer>

        <Typography
          variant="h6"
          mb={2}
          mt={2}
          sx={{
            color:
              gameState.winner === 'player'
                ? 'success.main'
                : gameState.winner === 'computer'
                ? 'error.main'
                : 'warning.main',
            opacity: gameState && gameState.computerChoice ? 1 : 0
          }}
        >
          {endGameMsg}
        </Typography>
      </Box>
    </PageHolder>
  );
};

export default JokenpoRender;
