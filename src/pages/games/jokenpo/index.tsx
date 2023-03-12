import React, { useState } from 'react';

import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import {
  InitialStateJokenpoGame,
  JokenpoChoices,
  JokenpoGameState
} from './types&utils';
import JokenpoRender from './render';
import { useTranslation } from 'react-i18next';

const JokenpoRenderContainer: React.FC = () => {
  const { t } = useTranslation();

  const [gameState, setGameState] = useState<JokenpoGameState>(
    InitialStateJokenpoGame
  );
  const [endGameMsg, setEndGameMsg] = useState<string>('');

  const handleChoice = (choice: JokenpoChoices) => {
    const randomOneToThree = Math.random() * 3;
    const computerChoice =
      randomOneToThree < 1 ? 'rock' : randomOneToThree < 2 ? 'paper' : 'scizor';

    if (choice === 'rock') {
      if (computerChoice === 'paper') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'computer',
          ranking: {
            ...gameState.ranking,
            computer: gameState.ranking.computer + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else if (computerChoice === 'scizor') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'player',
          ranking: {
            ...gameState.ranking,
            player: gameState.ranking.player + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'draw',
          ranking: {
            ...gameState.ranking,
            draw: gameState.ranking.draw + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      }
    } else if (choice === 'paper') {
      if (computerChoice === 'rock') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'player',
          ranking: {
            ...gameState.ranking,
            player: gameState.ranking.player + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else if (computerChoice === 'scizor') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'computer',
          ranking: {
            ...gameState.ranking,
            computer: gameState.ranking.computer + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'draw',
          ranking: {
            ...gameState.ranking,
            draw: gameState.ranking.draw + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      }
    } else if (choice === 'scizor') {
      if (computerChoice === 'rock') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'computer',
          ranking: {
            ...gameState.ranking,
            computer: gameState.ranking.computer + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else if (computerChoice === 'paper') {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'player',
          ranking: {
            ...gameState.ranking,
            player: gameState.ranking.player + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      } else {
        setGameState({
          playerChoice: choice,
          computerChoice,
          winner: 'draw',
          ranking: {
            ...gameState.ranking,
            draw: gameState.ranking.draw + 1,
            totalGames: gameState.ranking.totalGames + 1
          }
        });
      }
    }
  };

  const handleClick = (choice: JokenpoChoices) => {
    setGameState({
      ...gameState,
      computerChoice: null,
      playerChoice: choice
    });

    setTimeout(() => {
      handleChoice(choice);
    }, 350);
  };

  useEnhancedEffect(() => {
    if (gameState.winner === 'player') {
      setEndGameMsg(t('youWon'));
    } else if (gameState.winner === 'computer') {
      setEndGameMsg(t('youLost'));
    } else {
      setEndGameMsg(t('drawAction'));
    }
  }, [gameState.winner]);

  return (
    <JokenpoRender
      gameState={gameState}
      endGameMsg={endGameMsg}
      handleClick={handleClick}
    />
  );
};

export default JokenpoRenderContainer;
