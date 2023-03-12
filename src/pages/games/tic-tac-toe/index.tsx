import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import {
  InitialStateTicTacToeEndGame,
  InitialStateTicTacToeGameStatus,
  TicTacToeEndGame,
  TicTacToeGameStatus,
  TicTacToeSections,
  InitialStateTicTacToeSections,
  TicTacToeWinConditions
} from './types&utils';

import TicTacToeRender from './render';

const TicTacToeRenderContainer: React.FC = () => {
  const { t } = useTranslation();

  const [endGameModal, setEndGameModal] = useState<boolean>(false);
  const [blockPlayer, setBlockPlayer] = useState<boolean>(false);
  const [against, setAgainst] = useState<'player' | 'computer'>('player');
  const [gameStatus, setGameStatus] = useState<TicTacToeGameStatus>(
    InitialStateTicTacToeGameStatus
  );
  const [endGameStatus, setEndGameStatus] = useState<TicTacToeEndGame>(
    InitialStateTicTacToeEndGame
  );
  const [sections, setSections] = useState<TicTacToeSections>(
    InitialStateTicTacToeSections
  );

  const handleSectionClick = (
    section: 'A1' | 'A2' | 'A3' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3'
  ) => {
    if (blockPlayer) return;

    if (against === 'player') {
      if (sections[section] === 'X' || sections[section] === 'O') return;

      setSections((prevState) => ({
        ...prevState,
        [section]: gameStatus.turn === 'player1' ? 'X' : 'O'
      }));

      setGameStatus((prevState) => ({
        ...prevState,
        turn: prevState.turn === 'player1' ? 'player2' : 'player1'
      }));
    } else if (against === 'computer') {
      if (sections[section] === 'X' || sections[section] === 'O') return;

      setSections((prevState) => ({
        ...prevState,
        [section]: 'X'
      }));

      setGameStatus((prevState) => ({
        ...prevState,
        turn: 'computer'
      }));
    }
  };

  const xImg = (
    <img
      src="/static/x.png"
      alt="X"
      width="50%"
      style={{ filter: 'invert(1)' }}
    />
  );

  const oImg = (
    <img
      src="/static/o.png"
      alt="O"
      width="50%"
      style={{ filter: 'invert(1)' }}
    />
  );

  useEnhancedEffect(() => {
    TicTacToeWinConditions.forEach((condition: string[]) => {
      const sectionsAny = sections as any;

      if (
        sectionsAny[condition[0]] === 'X' &&
        sectionsAny[condition[1]] === 'X' &&
        sectionsAny[condition[2]] === 'X'
      ) {
        setGameStatus({
          ...gameStatus,
          player1: gameStatus.player1 + 1,
          games: gameStatus.games + 1,
          turn: 'player1'
        });

        setEndGameStatus({
          endGame: 'player1'
        });
      } else if (
        sectionsAny[condition[0]] === 'O' &&
        sectionsAny[condition[1]] === 'O' &&
        sectionsAny[condition[2]] === 'O'
      ) {
        setGameStatus({
          ...gameStatus,
          player2: gameStatus.player2 + 1,
          games: gameStatus.games + 1,
          turn: 'player2'
        });

        setEndGameStatus({
          endGame: 'player2'
        });
      } else {
        let draw = true;

        Object.keys(sections).forEach((section: string) => {
          if (sectionsAny[section] === '') {
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
            endGame: 'draw'
          });
        }
      }
    });
  }, [sections]);

  useEnhancedEffect(() => {
    if (endGameStatus.endGame !== null) {
      setEndGameModal(true);
    }
  }, [endGameStatus]);

  const closeEndGameModal: () => void = () => {
    setEndGameModal(false);
    setEndGameStatus(InitialStateTicTacToeEndGame);
    setSections(InitialStateTicTacToeSections);
  };

  const getWinPlayerName = () => {
    if (endGameStatus.endGame === 'player1') {
      return `X ${t('won')}`;
    } else if (endGameStatus.endGame === 'player2') {
      return `O ${t('won')}`;
    } else {
      return t('draw');
    }
  };

  useEnhancedEffect(() => {
    if (endGameStatus.endGame === null && gameStatus.turn === 'computer') {
      setBlockPlayer(true);
      const sectionsAny = sections as any;

      const availableSections = Object.keys(sections).filter(
        (section: string) => sectionsAny[section] === ''
      );

      const randomSection =
        availableSections[Math.floor(Math.random() * availableSections.length)];

      setTimeout(() => {
        setSections((prevState) => ({
          ...prevState,
          [randomSection]: 'O'
        }));

        setGameStatus((prevState) => ({
          ...prevState,
          turn: 'player1'
        }));

        setBlockPlayer(false);
      }, 200);
    }
  }, [gameStatus.turn]);

  return (
    <TicTacToeRender
      gameStatus={gameStatus}
      closeEndGameModal={closeEndGameModal}
      setAgainst={setAgainst}
      against={against}
      handleSectionClick={handleSectionClick}
      sections={sections}
      xImg={xImg}
      oImg={oImg}
      endGameModal={endGameModal}
      getWinPlayerName={getWinPlayerName}
    />
  );
};

export default TicTacToeRenderContainer;
