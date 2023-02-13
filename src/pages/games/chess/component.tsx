import { PageHolder } from 'components/PageHolder';
import React, { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import {
  ChessFillField,
  ChessGameState,
  ChessGameStatus,
  InitialStateChess,
  InitialStateChessGameStatus,
  ChessGameMove
} from './types&utils';

const ChessGame: React.FC = () => {
  const [gameState, setGameState] = useState<ChessGameState>(InitialStateChess);
  const [gameStatus, setGameStatus] = useState<ChessGameStatus>(
    InitialStateChessGameStatus
  );

  const confirm = (value: string, i: number) => {
    const { table, copy, selected, turn } = gameState;

    if (table[i] === 'x') {
      table[i] = table[selected];
      table[selected] = ' ';
      copy[i] = table[i];
      copy[selected] = ' ';
    }

    table.forEach((value, i) => {
      if (value === 'x') {
        table[i] = copy[i];
      }
    });

    setGameState({
      ...gameState,
      table,
      clicked: false,
      turn: value === 'x' ? (turn === 'white' ? 'black' : 'white') : turn
    });
  };

  const renderTable = () => {
    const { table, clicked } = gameState;
    let count = 0;

    return table.map((value, i) => {
      let piece = ChessFillField(value);
      count++;
      const player = gameState.turn;

      if (i % 8 === 0) {
        count--;
        return (
          <Box
            key={i}
            sx={{
              border: '1px solid black',
              width: '56px',
              height: '56px',
              color: 'grey',
              display: 'flex',
              float: 'left',
              lineHeight: '32px',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor:
                count % 2
                  ? value !== 'x'
                    ? 'black'
                    : 'blue'
                  : value !== 'x'
                  ? 'white'
                  : 'blue'
            }}
            onClick={() => {
              !clicked
                ? ChessGameMove(value, i, gameState, setGameState)
                : confirm(value, i);
            }}
          >
            <Typography variant="h3">{piece}</Typography>
            <br />
          </Box>
        );
      } else {
        return (
          <Box
            key={i}
            sx={{
              border: '1px solid black',
              width: '56px',
              height: '56px',
              color: 'grey',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              float: 'left',
              lineHeight: '32px',
              backgroundColor:
                count % 2
                  ? value !== 'x'
                    ? 'black'
                    : 'blue'
                  : value !== 'x'
                  ? 'white'
                  : 'blue'
            }}
            onClick={() => {
              !clicked
                ? ChessGameMove(value, i, gameState, setGameState)
                : confirm(value, i);
            }}
          >
            <Typography variant="h3">{piece}</Typography>
            <br />
          </Box>
        );
      }
    });
  };

  return (
    <PageHolder
      title="Xadrez"
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

        <Typography color="primary.contrastText">
          Player 1: {gameStatus.player1}
        </Typography>

        <Typography color="primary.contrastText">
          Player 2: {gameStatus.player2}
        </Typography>

        <Typography color="primary.contrastText">
          Rodada: {gameState.turn}
        </Typography>

        <Typography color="primary.contrastText">
          QTD jogos: {gameStatus.qtdGame}
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
          gridTemplateColumns="repeat(8, 0fr)"
          display="grid"
          justifyContent="center"
          alignItems="center"
        >
          {renderTable()}
        </Grid>
      </Box>
    </PageHolder>
  );
};

export default ChessGame;
