export type ChessTable = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export type ChessGameState = {
  table: ChessTable;
  copy: ChessTable;
  turn: 'white' | 'black';
  selected: number;
  clicked: boolean;
};

export type ChessGameStatus = {
  player1: number;
  player2: number;
  qtdGame: number;
  turn: 'white' | 'black';
};

export const ChessTableInitial: ChessTable = [
  't',
  'c',
  'b',
  'q',
  'k',
  'b',
  'c',
  't',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  'p',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  ' ',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'P',
  'T',
  'C',
  'B',
  'K',
  'Q',
  'B',
  'C',
  'T'
];

export const InitialStateChess: ChessGameState = {
  table: [
    't',
    'c',
    'b',
    'q',
    'k',
    'b',
    'c',
    't',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'T',
    'C',
    'B',
    'K',
    'Q',
    'B',
    'C',
    'T'
  ],
  copy: [
    't',
    'c',
    'b',
    'q',
    'k',
    'b',
    'c',
    't',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    'p',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'P',
    'T',
    'C',
    'B',
    'K',
    'Q',
    'B',
    'C',
    'T'
  ],
  turn: 'white',
  selected: 0,
  clicked: false
};

export const InitialStateChessGameStatus: ChessGameStatus = {
  player1: 0,
  player2: 0,
  qtdGame: 0,
  turn: 'white'
};

export const ChessFillField = (piece: string) => {
  switch (piece) {
    case 't':
      return '♜';
    case 'c':
      return '♞';
    case 'b':
      return '♝';
    case 'q':
      return '♛';
    case 'k':
      return '♚';
    case 'p':
      return '♟';
    case 'T':
      return '♖';
    case 'C':
      return '♘';
    case 'B':
      return '♗';
    case 'Q':
      return '♕';
    case 'K':
      return '♔';
    case 'P':
      return '♙';
    default:
      return piece;
  }
};

const checkCavaloB = (value: string) => {
  if (
    value === ' ' ||
    value === 't' ||
    value === 'c' ||
    value === 'b' ||
    value === 'q' ||
    value === 'k' ||
    value === 'p'
  ) {
    return true;
  }
  return false;
};

const checkCavaloP = (value: string) => {
  if (
    value === ' ' ||
    value === 'T' ||
    value === 'C' ||
    value === 'B' ||
    value === 'Q' ||
    value === 'K' ||
    value === 'P'
  ) {
    return true;
  }
  return false;
};

export const ChessGameMove = (
  value: string,
  indexFrom: number,
  gameState: ChessGameState,
  setGameState: React.Dispatch<React.SetStateAction<ChessGameState>>
) => {
  const { table, turn } = gameState;

  // 'P' 'T' 'C' 'B' 'K' 'Q'

  if (turn === 'black') {
    if (
      value === 'P' ||
      value === 'C' ||
      value === 'B' ||
      value === 'T' ||
      value === 'Q' ||
      value === 'K'
    ) {
      return;
    }
  } else if (turn === 'white') {
    if (
      value === 'p' ||
      value === 'c' ||
      value === 'b' ||
      value === 't' ||
      value === 'q' ||
      value === 'k'
    ) {
      return;
    }
  }

  let counter = 0;
  let counter2 = 0;
  let coluna = indexFrom % 8;
  let linha = Math.floor(indexFrom / 8);
  let beginLine = linha * 8;
  let endLine = beginLine + 7;
  let checkBegin = true;
  let checkEnd = true;
  let i = 0;

  switch (value) {
    case 'p':
      table[indexFrom + 8] = 'x';
      table[indexFrom + 16] = 'x';
      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;
    case 'P':
      table[indexFrom - 8] = 'x';
      table[indexFrom - 16] = 'x';
      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;

    case 't':
      for (i = 0; i < 8; i++) {
        if (indexFrom - i >= beginLine && checkBegin) {
          if (table[indexFrom - i] === ' ') {
            table[indexFrom - i] = 'x';
          } else {
            if (
              table[indexFrom - i] === 'T' ||
              table[indexFrom - i] === 'C' ||
              table[indexFrom - i] === 'B' ||
              table[indexFrom - i] === 'Q' ||
              table[indexFrom - i] === 'K' ||
              table[indexFrom - i] === 'P'
            ) {
              table[indexFrom - i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - i] !== ' ' &&
                table[indexFrom - i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }

        if (indexFrom + i <= endLine && checkEnd) {
          if (table[indexFrom + i] === ' ') {
            table[indexFrom + i] = 'x';
          } else {
            if (
              table[indexFrom + i] === 'T' ||
              table[indexFrom + i] === 'C' ||
              table[indexFrom + i] === 'B' ||
              table[indexFrom + i] === 'Q' ||
              table[indexFrom + i] === 'K' ||
              table[indexFrom + i] === 'P'
            ) {
              table[indexFrom + i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + i] !== ' ' &&
                table[indexFrom + i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      checkBegin = true;
      checkEnd = true;

      for (i = 1; i <= 8; i++) {
        if (indexFrom - 8 * i >= linha && checkBegin) {
          if (table[indexFrom - 8 * i] === ' ') {
            table[indexFrom - 8 * i] = 'x';
          } else {
            if (
              table[indexFrom - 8 * i] === 'T' ||
              table[indexFrom - 8 * i] === 'C' ||
              table[indexFrom - 8 * i] === 'B' ||
              table[indexFrom - 8 * i] === 'Q' ||
              table[indexFrom - 8 * i] === 'K' ||
              table[indexFrom - 8 * i] === 'P'
            ) {
              table[indexFrom - 8 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }
        if (indexFrom + 8 * i <= 64 && checkEnd) {
          if (table[indexFrom + 8 * i] === ' ') {
            table[indexFrom + 8 * i] = 'x';
          } else {
            if (
              table[indexFrom + 8 * i] === 'T' ||
              table[indexFrom + 8 * i] === 'C' ||
              table[indexFrom + 8 * i] === 'B' ||
              table[indexFrom + 8 * i] === 'Q' ||
              table[indexFrom + 8 * i] === 'K' ||
              table[indexFrom + 8 * i] === 'P'
            ) {
              table[indexFrom + 8 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;
    case 'T':
      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;
      for (i = 0; i < 8; i++) {
        if (indexFrom - i >= beginLine && checkBegin) {
          if (table[indexFrom - i] === ' ') {
            table[indexFrom - i] = 'x';
          } else {
            if (
              table[indexFrom - i] === 't' ||
              table[indexFrom - i] === 'c' ||
              table[indexFrom - i] === 'b' ||
              table[indexFrom - i] === 'q' ||
              table[indexFrom - i] === 'k' ||
              table[indexFrom - i] === 'p'
            ) {
              table[indexFrom - i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - i] !== ' ' &&
                table[indexFrom - i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }
        if (indexFrom + i <= endLine && checkEnd) {
          if (table[indexFrom + i] === ' ') {
            table[indexFrom + i] = 'x';
          } else {
            if (
              table[indexFrom + i] === 't' ||
              table[indexFrom + i] === 'c' ||
              table[indexFrom + i] === 'b' ||
              table[indexFrom + i] === 'q' ||
              table[indexFrom + i] === 'k' ||
              table[indexFrom + i] === 'p'
            ) {
              table[indexFrom + i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + i] !== ' ' &&
                table[indexFrom + i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }
      //checkVertical
      checkBegin = true;
      checkEnd = true;
      for (i = 1; i <= 8; i++) {
        if (indexFrom - 8 * i >= linha && checkBegin) {
          if (table[indexFrom - 8 * i] === ' ') {
            table[indexFrom - 8 * i] = 'x';
          } else {
            if (
              table[indexFrom - 8 * i] === 't' ||
              table[indexFrom - 8 * i] === 'c' ||
              table[indexFrom - 8 * i] === 'b' ||
              table[indexFrom - 8 * i] === 'q' ||
              table[indexFrom - 8 * i] === 'k' ||
              table[indexFrom - 8 * i] === 'p'
            ) {
              table[indexFrom - 8 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }
        if (indexFrom + 8 * i <= 64 && checkEnd) {
          if (table[indexFrom + 8 * i] === ' ') {
            table[indexFrom + 8 * i] = 'x';
          } else {
            if (
              table[indexFrom + 8 * i] === 't' ||
              table[indexFrom + 8 * i] === 'c' ||
              table[indexFrom + 8 * i] === 'b' ||
              table[indexFrom + 8 * i] === 'q' ||
              table[indexFrom + 8 * i] === 'k' ||
              table[indexFrom + 8 * i] === 'p'
            ) {
              table[indexFrom + 8 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;

    case 'c':
      if (indexFrom % 8 === 7) {
        if (
          checkCavaloP(table[indexFrom + 15]) &&
          indexFrom + 15 > 0 &&
          indexFrom + 15 < 64
        ) {
          table[indexFrom + 15] = 'x';
        }
        if (
          checkCavaloP(table[indexFrom - 17]) &&
          indexFrom + 15 > 0 &&
          indexFrom - 17 < 64
        ) {
          table[indexFrom - 17] = 'x';
        }
        if (
          checkCavaloP(table[indexFrom + 6]) &&
          indexFrom + 15 > 0 &&
          indexFrom + 6 < 64
        ) {
          table[indexFrom + 6] = 'x';
        }
        if (
          checkCavaloP(table[indexFrom - 10]) &&
          indexFrom + 15 > 0 &&
          indexFrom - 10 < 64
        ) {
          table[indexFrom - 10] = 'x';
        }
      } else {
        if (indexFrom % 8 === 6) {
          if (
            checkCavaloP(table[indexFrom + 15]) &&
            indexFrom + 15 > 0 &&
            indexFrom + 15 < 64
          ) {
            table[indexFrom + 15] = 'x';
          }
          if (
            checkCavaloP(table[indexFrom + 17]) &&
            indexFrom + 15 > 0 &&
            indexFrom + 17 < 64
          ) {
            table[indexFrom + 17] = 'x';
          }
          if (
            checkCavaloP(table[indexFrom - 15]) &&
            indexFrom + 15 > 0 &&
            indexFrom - 15 < 64
          ) {
            table[indexFrom - 15] = 'x';
          }
          if (
            checkCavaloP(table[indexFrom - 17]) &&
            indexFrom + 15 > 0 &&
            indexFrom - 17 < 64
          ) {
            table[indexFrom - 17] = 'x';
          }
          if (
            checkCavaloP(table[indexFrom + 6]) &&
            indexFrom + 15 > 0 &&
            indexFrom + 6 < 64
          ) {
            table[indexFrom + 6] = 'x';
          }
          if (
            checkCavaloP(table[indexFrom - 10]) &&
            indexFrom + 15 > 0 &&
            indexFrom - 10 < 64
          ) {
            table[indexFrom - 10] = 'x';
          }
        } else {
          if (indexFrom % 8 === 1) {
            if (
              checkCavaloP(table[indexFrom + 15]) &&
              indexFrom + 15 > 0 &&
              indexFrom + 15 < 64
            ) {
              table[indexFrom + 15] = 'x';
            }
            if (
              checkCavaloP(table[indexFrom + 17]) &&
              indexFrom + 15 > 0 &&
              indexFrom + 17 < 64
            ) {
              table[indexFrom + 17] = 'x';
            }
            if (
              checkCavaloP(table[indexFrom - 15]) &&
              indexFrom + 15 > 0 &&
              indexFrom - 15 < 64
            ) {
              table[indexFrom - 15] = 'x';
            }
            if (
              checkCavaloP(table[indexFrom - 17]) &&
              indexFrom + 15 > 0 &&
              indexFrom - 17 < 64
            ) {
              table[indexFrom - 17] = 'x';
            }
            if (
              checkCavaloP(table[indexFrom + 10]) &&
              indexFrom + 15 > 0 &&
              indexFrom + 10 < 64
            ) {
              table[indexFrom + 10] = 'x';
            }
            if (
              checkCavaloP(table[indexFrom - 6]) &&
              indexFrom + 15 > 0 &&
              indexFrom - 6 < 64
            ) {
              table[indexFrom - 6] = 'x';
            }
          } else {
            if (indexFrom % 8 === 0) {
              if (
                checkCavaloP(table[indexFrom + 17]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 17 < 64
              ) {
                table[indexFrom + 17] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 15]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 15 < 64
              ) {
                table[indexFrom - 15] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom + 10]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 10 < 64
              ) {
                table[indexFrom + 10] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 6]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 6 < 64
              ) {
                table[indexFrom - 6] = 'x';
              }
            } else {
              if (
                checkCavaloP(table[indexFrom + 15]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 15 < 64
              ) {
                table[indexFrom + 15] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom + 17]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 17 < 64
              ) {
                table[indexFrom + 17] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 15]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 15 < 64
              ) {
                table[indexFrom - 15] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 17]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 17 < 64
              ) {
                table[indexFrom - 17] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom + 6]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 6 < 64
              ) {
                table[indexFrom + 6] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom + 10]) &&
                indexFrom + 15 > 0 &&
                indexFrom + 10 < 64
              ) {
                table[indexFrom + 10] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 6]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 6 < 64
              ) {
                table[indexFrom - 6] = 'x';
              }
              if (
                checkCavaloP(table[indexFrom - 10]) &&
                indexFrom + 15 > 0 &&
                indexFrom - 10 < 64
              ) {
                table[indexFrom - 10] = 'x';
              }
            }
          }
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;
    case 'C':
      if (
        checkCavaloB(table[indexFrom + 15]) &&
        indexFrom + 15 > 0 &&
        indexFrom + 15 < 64
      ) {
        table[indexFrom + 15] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom + 17]) &&
        indexFrom + 15 > 0 &&
        indexFrom + 17 < 64
      ) {
        table[indexFrom + 17] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom - 15]) &&
        indexFrom + 15 > 0 &&
        indexFrom - 15 < 64
      ) {
        table[indexFrom - 15] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom - 17]) &&
        indexFrom + 15 > 0 &&
        indexFrom - 17 < 64
      ) {
        table[indexFrom - 17] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom + 6]) &&
        indexFrom + 15 > 0 &&
        indexFrom + 6 < 64
      ) {
        table[indexFrom + 6] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom + 10]) &&
        indexFrom + 15 > 0 &&
        indexFrom + 10 < 64
      ) {
        table[indexFrom + 10] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom - 6]) &&
        indexFrom + 15 > 0 &&
        indexFrom - 6 < 64
      ) {
        table[indexFrom - 6] = 'x';
      }
      if (
        checkCavaloB(table[indexFrom - 10]) &&
        indexFrom + 15 > 0 &&
        indexFrom - 10 < 64
      ) {
        table[indexFrom - 10] = 'x';
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;

    case 'b':
      for (i = 0; i < 8; i++) {
        if (counter <= coluna && checkBegin) {
          if (table[indexFrom - 9 * i] === ' ') {
            table[indexFrom - 9 * i] = 'x';
          } else {
            if (
              table[indexFrom - 9 * i] === 'T' ||
              table[indexFrom - 9 * i] === 'C' ||
              table[indexFrom - 9 * i] === 'B' ||
              table[indexFrom - 9 * i] === 'Q' ||
              table[indexFrom - 9 * i] === 'K' ||
              table[indexFrom - 9 * i] === 'P'
            ) {
              table[indexFrom - 9 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 9 * i] !== ' ' &&
                table[indexFrom - 9 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < 8 - coluna && checkEnd) {
          if (table[indexFrom + 9 * i] === ' ') {
            table[indexFrom + 9 * i] = 'x';
          } else {
            if (
              table[indexFrom + 9 * i] === 'T' ||
              table[indexFrom + 9 * i] === 'C' ||
              table[indexFrom + 9 * i] === 'B' ||
              table[indexFrom + 9 * i] === 'Q' ||
              table[indexFrom + 9 * i] === 'K' ||
              table[indexFrom + 9 * i] === 'P'
            ) {
              table[indexFrom + 9 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 9 * i] !== ' ' &&
                table[indexFrom + 9 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 1; i <= 8; i++) {
        if (counter < 7 - coluna && checkBegin) {
          if (table[indexFrom - 7 * i] === ' ') {
            table[indexFrom - 7 * i] = 'x';
          } else {
            if (
              table[indexFrom - 7 * i] === 'T' ||
              table[indexFrom - 7 * i] === 'C' ||
              table[indexFrom - 7 * i] === 'B' ||
              table[indexFrom - 7 * i] === 'Q' ||
              table[indexFrom - 7 * i] === 'K' ||
              table[indexFrom - 7 * i] === 'P'
            ) {
              table[indexFrom - 7 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 7 * i] !== ' ' &&
                table[indexFrom - 7 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }

        if (counter2 < coluna && checkEnd) {
          if (table[indexFrom + 7 * i] === ' ') {
            table[indexFrom + 7 * i] = 'x';
          } else {
            if (
              table[indexFrom + 7 * i] === 'T' ||
              table[indexFrom + 7 * i] === 'C' ||
              table[indexFrom + 7 * i] === 'B' ||
              table[indexFrom + 7 * i] === 'Q' ||
              table[indexFrom + 7 * i] === 'K' ||
              table[indexFrom + 7 * i] === 'P'
            ) {
              table[indexFrom + 7 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 7 * i] !== ' ' &&
                table[indexFrom + 7 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });
      break;
    case 'B':
      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 0; i < 8; i++) {
        if (counter <= coluna && checkBegin) {
          if (table[indexFrom - 9 * i] === ' ') {
            table[indexFrom - 9 * i] = 'x';
          } else {
            if (
              table[indexFrom - 9 * i] === 't' ||
              table[indexFrom - 9 * i] === 'c' ||
              table[indexFrom - 9 * i] === 'b' ||
              table[indexFrom - 9 * i] === 'q' ||
              table[indexFrom - 9 * i] === 'k' ||
              table[indexFrom - 9 * i] === 'p'
            ) {
              table[indexFrom - 9 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 9 * i] !== ' ' &&
                table[indexFrom - 9 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < 8 - coluna && checkEnd) {
          if (table[indexFrom + 9 * i] === ' ') {
            table[indexFrom + 9 * i] = 'x';
          } else {
            if (
              table[indexFrom + 9 * i] === 't' ||
              table[indexFrom + 9 * i] === 'c' ||
              table[indexFrom + 9 * i] === 'b' ||
              table[indexFrom + 9 * i] === 'q' ||
              table[indexFrom + 9 * i] === 'k' ||
              table[indexFrom + 9 * i] === 'p'
            ) {
              table[indexFrom + 9 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 9 * i] !== ' ' &&
                table[indexFrom + 9 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }
      //checkVertical
      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;
      for (i = 1; i <= 8; i++) {
        if (counter < 7 - coluna && checkBegin) {
          if (table[indexFrom - 7 * i] === ' ') {
            table[indexFrom - 7 * i] = 'x';
          } else {
            if (
              table[indexFrom - 7 * i] === 't' ||
              table[indexFrom - 7 * i] === 'c' ||
              table[indexFrom - 7 * i] === 'b' ||
              table[indexFrom - 7 * i] === 'q' ||
              table[indexFrom - 7 * i] === 'k' ||
              table[indexFrom - 7 * i] === 'p'
            ) {
              table[indexFrom - 7 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 7 * i] !== ' ' &&
                table[indexFrom - 7 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < coluna && checkEnd) {
          if (table[indexFrom + 7 * i] === ' ') {
            table[indexFrom + 7 * i] = 'x';
          } else {
            if (
              table[indexFrom + 7 * i] === 't' ||
              table[indexFrom + 7 * i] === 'c' ||
              table[indexFrom + 7 * i] === 'b' ||
              table[indexFrom + 7 * i] === 'q' ||
              table[indexFrom + 7 * i] === 'k' ||
              table[indexFrom + 7 * i] === 'p'
            ) {
              table[indexFrom + 7 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 7 * i] !== ' ' &&
                table[indexFrom + 7 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });

      break;

    case 'q':
      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;

      for (i = 0; i < 8; i++) {
        if (indexFrom - i >= beginLine && checkBegin) {
          if (table[indexFrom - i] === ' ') {
            table[indexFrom - i] = 'x';
          } else {
            if (
              table[indexFrom - i] === 'T' ||
              table[indexFrom - i] === 'C' ||
              table[indexFrom - i] === 'B' ||
              table[indexFrom - i] === 'Q' ||
              table[indexFrom - i] === 'K' ||
              table[indexFrom - i] === 'P'
            ) {
              table[indexFrom - i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - i] !== ' ' &&
                table[indexFrom - i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }

        if (indexFrom + i <= endLine && checkEnd) {
          if (table[indexFrom + i] === ' ') {
            table[indexFrom + i] = 'x';
          } else {
            if (
              table[indexFrom + i] === 'T' ||
              table[indexFrom + i] === 'C' ||
              table[indexFrom + i] === 'B' ||
              table[indexFrom + i] === 'Q' ||
              table[indexFrom + i] === 'K' ||
              table[indexFrom + i] === 'P'
            ) {
              table[indexFrom + i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + i] !== ' ' &&
                table[indexFrom + i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      checkBegin = true;
      checkEnd = true;

      for (i = 1; i <= 8; i++) {
        if (indexFrom - 8 * i >= linha && checkBegin) {
          if (table[indexFrom - 8 * i] === ' ') {
            table[indexFrom - 8 * i] = 'x';
          } else {
            if (
              table[indexFrom - 8 * i] === 'T' ||
              table[indexFrom - 8 * i] === 'C' ||
              table[indexFrom - 8 * i] === 'B' ||
              table[indexFrom - 8 * i] === 'Q' ||
              table[indexFrom - 8 * i] === 'K' ||
              table[indexFrom - 8 * i] === 'P'
            ) {
              table[indexFrom - 8 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }
        if (indexFrom + 8 * i <= 64 && checkEnd) {
          if (table[indexFrom + 8 * i] === ' ') {
            table[indexFrom + 8 * i] = 'x';
          } else {
            if (
              table[indexFrom + 8 * i] === 'T' ||
              table[indexFrom + 8 * i] === 'C' ||
              table[indexFrom + 8 * i] === 'B' ||
              table[indexFrom + 8 * i] === 'Q' ||
              table[indexFrom + 8 * i] === 'K' ||
              table[indexFrom + 8 * i] === 'P'
            ) {
              table[indexFrom + 8 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 0; i < 8; i++) {
        if (counter <= coluna && checkBegin) {
          if (table[indexFrom - 9 * i] === ' ') {
            table[indexFrom - 9 * i] = 'x';
          } else {
            if (
              table[indexFrom - 9 * i] === 'T' ||
              table[indexFrom - 9 * i] === 'C' ||
              table[indexFrom - 9 * i] === 'B' ||
              table[indexFrom - 9 * i] === 'Q' ||
              table[indexFrom - 9 * i] === 'K' ||
              table[indexFrom - 9 * i] === 'P'
            ) {
              table[indexFrom - 9 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 9 * i] !== ' ' &&
                table[indexFrom - 9 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < 8 - coluna && checkEnd) {
          if (table[indexFrom + 9 * i] === ' ') {
            table[indexFrom + 9 * i] = 'x';
          } else {
            if (
              table[indexFrom + 9 * i] === 'T' ||
              table[indexFrom + 9 * i] === 'C' ||
              table[indexFrom + 9 * i] === 'B' ||
              table[indexFrom + 9 * i] === 'Q' ||
              table[indexFrom + 9 * i] === 'K' ||
              table[indexFrom + 9 * i] === 'P'
            ) {
              table[indexFrom + 9 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 9 * i] !== ' ' &&
                table[indexFrom + 9 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 1; i <= 8; i++) {
        if (counter < 7 - coluna && checkBegin) {
          if (table[indexFrom - 7 * i] === ' ') {
            table[indexFrom - 7 * i] = 'x';
          } else {
            if (
              table[indexFrom - 7 * i] === 'T' ||
              table[indexFrom - 7 * i] === 'C' ||
              table[indexFrom - 7 * i] === 'B' ||
              table[indexFrom - 7 * i] === 'Q' ||
              table[indexFrom - 7 * i] === 'K' ||
              table[indexFrom - 7 * i] === 'P'
            ) {
              table[indexFrom - 7 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 7 * i] !== ' ' &&
                table[indexFrom - 7 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < coluna && checkEnd) {
          if (table[indexFrom + 7 * i] === ' ') {
            table[indexFrom + 7 * i] = 'x';
          } else {
            if (
              table[indexFrom + 7 * i] === 'T' ||
              table[indexFrom + 7 * i] === 'C' ||
              table[indexFrom + 7 * i] === 'B' ||
              table[indexFrom + 7 * i] === 'Q' ||
              table[indexFrom + 7 * i] === 'K' ||
              table[indexFrom + 7 * i] === 'P'
            ) {
              table[indexFrom + 7 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 7 * i] !== ' ' &&
                table[indexFrom + 7 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });

      break;
    case 'Q':
      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;

      for (i = 0; i < 8; i++) {
        if (indexFrom - i >= beginLine && checkBegin) {
          if (table[indexFrom - i] === ' ') {
            table[indexFrom - i] = 'x';
          } else {
            if (
              table[indexFrom - i] === 't' ||
              table[indexFrom - i] === 'c' ||
              table[indexFrom - i] === 'b' ||
              table[indexFrom - i] === 'q' ||
              table[indexFrom - i] === 'k' ||
              table[indexFrom - i] === 'p'
            ) {
              table[indexFrom - i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - i] !== ' ' &&
                table[indexFrom - i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }

        if (indexFrom + i <= endLine && checkEnd) {
          if (table[indexFrom + i] === ' ') {
            table[indexFrom + i] = 'x';
          } else {
            if (
              table[indexFrom + i] === 't' ||
              table[indexFrom + i] === 'c' ||
              table[indexFrom + i] === 'b' ||
              table[indexFrom + i] === 'q' ||
              table[indexFrom + i] === 'k' ||
              table[indexFrom + i] === 'p'
            ) {
              table[indexFrom + i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + i] !== ' ' &&
                table[indexFrom + i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      checkBegin = true;
      checkEnd = true;

      for (i = 1; i <= 8; i++) {
        if (indexFrom - 8 * i >= linha && checkBegin) {
          if (table[indexFrom - 8 * i] === ' ') {
            table[indexFrom - 8 * i] = 'x';
          } else {
            if (
              table[indexFrom - 8 * i] === 't' ||
              table[indexFrom - 8 * i] === 'c' ||
              table[indexFrom - 8 * i] === 'b' ||
              table[indexFrom - 8 * i] === 'q' ||
              table[indexFrom - 8 * i] === 'k' ||
              table[indexFrom - 8 * i] === 'p'
            ) {
              table[indexFrom - 8 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
        }

        if (indexFrom + 8 * i <= 64 && checkEnd) {
          if (table[indexFrom + 8 * i] === ' ') {
            table[indexFrom + 8 * i] = 'x';
          } else {
            if (
              table[indexFrom + 8 * i] === 't' ||
              table[indexFrom + 8 * i] === 'c' ||
              table[indexFrom + 8 * i] === 'b' ||
              table[indexFrom + 8 * i] === 'q' ||
              table[indexFrom + 8 * i] === 'k' ||
              table[indexFrom + 8 * i] === 'p'
            ) {
              table[indexFrom + 8 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 8 * i] !== ' ' &&
                table[indexFrom - 8 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
        }
      }

      coluna = indexFrom % 8;
      linha = Math.floor(indexFrom / 8);
      beginLine = linha * 8;
      endLine = beginLine + 7;
      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 0; i < 8; i++) {
        if (counter <= coluna && checkBegin) {
          if (table[indexFrom - 9 * i] === ' ') {
            table[indexFrom - 9 * i] = 'x';
          } else {
            if (
              table[indexFrom - 9 * i] === 't' ||
              table[indexFrom - 9 * i] === 'c' ||
              table[indexFrom - 9 * i] === 'b' ||
              table[indexFrom - 9 * i] === 'q' ||
              table[indexFrom - 9 * i] === 'k' ||
              table[indexFrom - 9 * i] === 'p'
            ) {
              table[indexFrom - 9 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 9 * i] !== ' ' &&
                table[indexFrom - 9 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }

        if (counter2 < 8 - coluna && checkEnd) {
          if (table[indexFrom + 9 * i] === ' ') {
            table[indexFrom + 9 * i] = 'x';
          } else {
            if (
              table[indexFrom + 9 * i] === 't' ||
              table[indexFrom + 9 * i] === 'c' ||
              table[indexFrom + 9 * i] === 'b' ||
              table[indexFrom + 9 * i] === 'q' ||
              table[indexFrom + 9 * i] === 'k' ||
              table[indexFrom + 9 * i] === 'p'
            ) {
              table[indexFrom + 9 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 9 * i] !== ' ' &&
                table[indexFrom + 9 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      checkBegin = true;
      checkEnd = true;
      counter = 0;
      counter2 = 0;

      for (i = 1; i <= 8; i++) {
        if (counter < 7 - coluna && checkBegin) {
          if (table[indexFrom - 7 * i] === ' ') {
            table[indexFrom - 7 * i] = 'x';
          } else {
            if (
              table[indexFrom - 7 * i] === 't' ||
              table[indexFrom - 7 * i] === 'c' ||
              table[indexFrom - 7 * i] === 'b' ||
              table[indexFrom - 7 * i] === 'q' ||
              table[indexFrom - 7 * i] === 'k' ||
              table[indexFrom - 7 * i] === 'p'
            ) {
              table[indexFrom - 7 * i] = 'x';
              checkBegin = false;
            } else {
              if (
                table[indexFrom - 7 * i] !== ' ' &&
                table[indexFrom - 7 * i] !== value
              ) {
                checkBegin = false;
              }
            }
          }
          counter++;
        }
        if (counter2 < coluna && checkEnd) {
          if (table[indexFrom + 7 * i] === ' ') {
            table[indexFrom + 7 * i] = 'x';
          } else {
            if (
              table[indexFrom + 7 * i] === 't' ||
              table[indexFrom + 7 * i] === 'c' ||
              table[indexFrom + 7 * i] === 'b' ||
              table[indexFrom + 7 * i] === 'q' ||
              table[indexFrom + 7 * i] === 'k' ||
              table[indexFrom + 7 * i] === 'p'
            ) {
              table[indexFrom + 7 * i] = 'x';
              checkEnd = false;
            } else {
              if (
                table[indexFrom + 7 * i] !== ' ' &&
                table[indexFrom + 7 * i] !== value
              ) {
                checkEnd = false;
              }
            }
          }
          counter2++;
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });

      break;

    case 'k':
      if (indexFrom === 56) {
        if (
          table[indexFrom + 1] === ' ' ||
          table[indexFrom + 1] === 'T' ||
          table[indexFrom + 1] === 'C' ||
          table[indexFrom + 1] === 'B' ||
          table[indexFrom + 1] === 'Q' ||
          table[indexFrom + 1] === 'P' ||
          indexFrom + 1 > 64
        ) {
          table[indexFrom + 1] = 'x';
        }
        if (
          table[indexFrom - 8] === ' ' ||
          table[indexFrom - 8] === 'T' ||
          table[indexFrom - 8] === 'C' ||
          table[indexFrom - 8] === 'B' ||
          table[indexFrom - 8] === 'Q' ||
          table[indexFrom - 8] === 'P' ||
          indexFrom - 8 > 64
        ) {
          table[indexFrom - 8] = 'x';
        }
        if (
          table[indexFrom - 7] === ' ' ||
          table[indexFrom - 7] === 'T' ||
          table[indexFrom - 7] === 'C' ||
          table[indexFrom - 7] === 'B' ||
          table[indexFrom - 7] === 'Q' ||
          table[indexFrom - 7] === 'P' ||
          indexFrom - 7 > 64
        ) {
          table[indexFrom - 7] = 'x';
        }
      } else {
        if (indexFrom === 63) {
          if (
            table[indexFrom - 9] === ' ' ||
            table[indexFrom - 9] === 'T' ||
            table[indexFrom - 9] === 'C' ||
            table[indexFrom - 9] === 'B' ||
            table[indexFrom - 9] === 'Q' ||
            table[indexFrom - 9] === 'P' ||
            indexFrom - 9 > 64
          ) {
            table[indexFrom - 9] = 'x';
          }
          if (
            table[indexFrom - 1] === ' ' ||
            table[indexFrom - 1] === 'T' ||
            table[indexFrom - 1] === 'C' ||
            table[indexFrom - 1] === 'B' ||
            table[indexFrom - 1] === 'Q' ||
            table[indexFrom - 1] === 'P' ||
            indexFrom - 1 > 64
          ) {
            table[indexFrom - 1] = 'x';
          }
          if (
            table[indexFrom - 8] === ' ' ||
            table[indexFrom - 8] === 'T' ||
            table[indexFrom - 8] === 'C' ||
            table[indexFrom - 8] === 'B' ||
            table[indexFrom - 8] === 'Q' ||
            table[indexFrom - 8] === 'P' ||
            indexFrom - 8 > 64
          ) {
            table[indexFrom - 8] = 'x';
          }
        } else {
          if (indexFrom === 0) {
            if (
              table[indexFrom + 9] === ' ' ||
              table[indexFrom + 9] === 'T' ||
              table[indexFrom + 9] === 'C' ||
              table[indexFrom + 9] === 'B' ||
              table[indexFrom + 9] === 'Q' ||
              table[indexFrom + 9] === 'P' ||
              indexFrom + 9 > 64
            ) {
              table[indexFrom + 9] = 'x';
            }
            if (
              table[indexFrom + 1] === ' ' ||
              table[indexFrom + 1] === 'T' ||
              table[indexFrom + 1] === 'C' ||
              table[indexFrom + 1] === 'B' ||
              table[indexFrom + 1] === 'Q' ||
              table[indexFrom + 1] === 'P' ||
              indexFrom + 1 > 64
            ) {
              table[indexFrom + 1] = 'x';
            }
            if (
              table[indexFrom + 8] === ' ' ||
              table[indexFrom + 8] === 'T' ||
              table[indexFrom + 8] === 'C' ||
              table[indexFrom + 8] === 'B' ||
              table[indexFrom + 8] === 'Q' ||
              table[indexFrom + 8] === 'P' ||
              indexFrom + 8 > 64
            ) {
              table[indexFrom + 8] = 'x';
            }
          } else {
            if (indexFrom === 7) {
              if (
                table[indexFrom + 8] === ' ' ||
                table[indexFrom + 8] === 'T' ||
                table[indexFrom + 8] === 'C' ||
                table[indexFrom + 8] === 'B' ||
                table[indexFrom + 8] === 'Q' ||
                table[indexFrom + 8] === 'P' ||
                indexFrom + 8 > 64
              ) {
                table[indexFrom + 8] = 'x';
              }
              if (
                table[indexFrom + 7] === ' ' ||
                table[indexFrom + 7] === 'T' ||
                table[indexFrom + 7] === 'C' ||
                table[indexFrom + 7] === 'B' ||
                table[indexFrom + 7] === 'Q' ||
                table[indexFrom + 7] === 'P' ||
                indexFrom + 7 > 64
              ) {
                table[indexFrom + 7] = 'x';
              }
              if (
                table[indexFrom - 1] === ' ' ||
                table[indexFrom - 1] === 'T' ||
                table[indexFrom - 1] === 'C' ||
                table[indexFrom - 1] === 'B' ||
                table[indexFrom - 1] === 'Q' ||
                table[indexFrom - 1] === 'P' ||
                indexFrom - 1 > 64
              ) {
                table[indexFrom - 1] = 'x';
              }
            } else {
              if (indexFrom % 8 === 7) {
                if (
                  table[indexFrom + 8] === ' ' ||
                  table[indexFrom + 8] === 'T' ||
                  table[indexFrom + 8] === 'C' ||
                  table[indexFrom + 8] === 'B' ||
                  table[indexFrom + 8] === 'Q' ||
                  table[indexFrom + 8] === 'P' ||
                  indexFrom + 8 > 64
                ) {
                  table[indexFrom + 8] = 'x';
                }
                if (
                  table[indexFrom + 7] === ' ' ||
                  table[indexFrom + 7] === 'T' ||
                  table[indexFrom + 7] === 'C' ||
                  table[indexFrom + 7] === 'B' ||
                  table[indexFrom + 7] === 'Q' ||
                  table[indexFrom + 7] === 'P' ||
                  indexFrom + 7 > 64
                ) {
                  table[indexFrom + 7] = 'x';
                }
                if (
                  table[indexFrom - 9] === ' ' ||
                  table[indexFrom - 9] === 'T' ||
                  table[indexFrom - 9] === 'C' ||
                  table[indexFrom - 9] === 'B' ||
                  table[indexFrom - 9] === 'Q' ||
                  table[indexFrom - 9] === 'P' ||
                  indexFrom - 9 > 64
                ) {
                  table[indexFrom - 9] = 'x';
                }
                if (
                  table[indexFrom - 1] === ' ' ||
                  table[indexFrom - 1] === 'T' ||
                  table[indexFrom - 1] === 'C' ||
                  table[indexFrom - 1] === 'B' ||
                  table[indexFrom - 1] === 'Q' ||
                  table[indexFrom - 1] === 'P' ||
                  indexFrom - 1 > 64
                ) {
                  table[indexFrom - 1] = 'x';
                }
                if (
                  table[indexFrom - 8] === ' ' ||
                  table[indexFrom - 8] === 'T' ||
                  table[indexFrom - 8] === 'C' ||
                  table[indexFrom - 8] === 'B' ||
                  table[indexFrom - 8] === 'Q' ||
                  table[indexFrom - 8] === 'P' ||
                  indexFrom - 8 > 64
                ) {
                  table[indexFrom - 8] = 'x';
                }
              } else {
                if (indexFrom % 8 === 0) {
                  if (
                    table[indexFrom + 9] === ' ' ||
                    table[indexFrom + 9] === 'T' ||
                    table[indexFrom + 9] === 'C' ||
                    table[indexFrom + 9] === 'B' ||
                    table[indexFrom + 9] === 'Q' ||
                    table[indexFrom + 9] === 'P' ||
                    indexFrom + 9 > 64
                  ) {
                    table[indexFrom + 9] = 'x';
                  }
                  if (
                    table[indexFrom + 1] === ' ' ||
                    table[indexFrom + 1] === 'T' ||
                    table[indexFrom + 1] === 'C' ||
                    table[indexFrom + 1] === 'B' ||
                    table[indexFrom + 1] === 'Q' ||
                    table[indexFrom + 1] === 'P' ||
                    indexFrom + 1 > 64
                  ) {
                    table[indexFrom + 1] = 'x';
                  }
                  if (
                    table[indexFrom + 8] === ' ' ||
                    table[indexFrom + 8] === 'T' ||
                    table[indexFrom + 8] === 'C' ||
                    table[indexFrom + 8] === 'B' ||
                    table[indexFrom + 8] === 'Q' ||
                    table[indexFrom + 8] === 'P' ||
                    indexFrom + 8 > 64
                  ) {
                    table[indexFrom + 8] = 'x';
                  }
                  if (
                    table[indexFrom - 8] === ' ' ||
                    table[indexFrom - 8] === 'T' ||
                    table[indexFrom - 8] === 'C' ||
                    table[indexFrom - 8] === 'B' ||
                    table[indexFrom - 8] === 'Q' ||
                    table[indexFrom - 8] === 'P' ||
                    indexFrom - 8 > 64
                  ) {
                    table[indexFrom - 8] = 'x';
                  }
                  if (
                    table[indexFrom - 7] === ' ' ||
                    table[indexFrom - 7] === 'T' ||
                    table[indexFrom - 7] === 'C' ||
                    table[indexFrom - 7] === 'B' ||
                    table[indexFrom - 7] === 'Q' ||
                    table[indexFrom - 7] === 'P' ||
                    indexFrom - 7 > 64
                  ) {
                    table[indexFrom - 7] = 'x';
                  }
                } else {
                  if (indexFrom > 56) {
                    if (
                      table[indexFrom + 1] === ' ' ||
                      table[indexFrom + 1] === 'T' ||
                      table[indexFrom + 1] === 'C' ||
                      table[indexFrom + 1] === 'B' ||
                      table[indexFrom + 1] === 'Q' ||
                      table[indexFrom + 1] === 'P' ||
                      indexFrom + 1 > 64
                    ) {
                      table[indexFrom + 1] = 'x';
                    }
                    if (
                      table[indexFrom - 9] === ' ' ||
                      table[indexFrom - 9] === 'T' ||
                      table[indexFrom - 9] === 'C' ||
                      table[indexFrom - 9] === 'B' ||
                      table[indexFrom - 9] === 'Q' ||
                      table[indexFrom - 9] === 'P' ||
                      indexFrom - 9 > 64
                    ) {
                      table[indexFrom - 9] = 'x';
                    }
                    if (
                      table[indexFrom - 1] === ' ' ||
                      table[indexFrom - 1] === 'T' ||
                      table[indexFrom - 1] === 'C' ||
                      table[indexFrom - 1] === 'B' ||
                      table[indexFrom - 1] === 'Q' ||
                      table[indexFrom - 1] === 'P' ||
                      indexFrom - 1 > 64
                    ) {
                      table[indexFrom - 1] = 'x';
                    }
                    if (
                      table[indexFrom - 8] === ' ' ||
                      table[indexFrom - 8] === 'T' ||
                      table[indexFrom - 8] === 'C' ||
                      table[indexFrom - 8] === 'B' ||
                      table[indexFrom - 8] === 'Q' ||
                      table[indexFrom - 8] === 'P' ||
                      indexFrom - 8 > 64
                    ) {
                      table[indexFrom - 8] = 'x';
                    }
                    if (
                      table[indexFrom - 7] === ' ' ||
                      table[indexFrom - 7] === 'T' ||
                      table[indexFrom - 7] === 'C' ||
                      table[indexFrom - 7] === 'B' ||
                      table[indexFrom - 7] === 'Q' ||
                      table[indexFrom - 7] === 'P' ||
                      indexFrom - 7 > 64
                    ) {
                      table[indexFrom - 7] = 'x';
                    }
                  } else {
                    if (indexFrom < 7) {
                      if (
                        table[indexFrom + 9] === ' ' ||
                        table[indexFrom + 9] === 'T' ||
                        table[indexFrom + 9] === 'C' ||
                        table[indexFrom + 9] === 'B' ||
                        table[indexFrom + 9] === 'Q' ||
                        table[indexFrom + 9] === 'P' ||
                        indexFrom + 9 > 64
                      ) {
                        table[indexFrom + 9] = 'x';
                      }
                      if (
                        table[indexFrom + 1] === ' ' ||
                        table[indexFrom + 1] === 'T' ||
                        table[indexFrom + 1] === 'C' ||
                        table[indexFrom + 1] === 'B' ||
                        table[indexFrom + 1] === 'Q' ||
                        table[indexFrom + 1] === 'P' ||
                        indexFrom + 1 > 64
                      ) {
                        table[indexFrom + 1] = 'x';
                      }
                      if (
                        table[indexFrom + 8] === ' ' ||
                        table[indexFrom + 8] === 'T' ||
                        table[indexFrom + 8] === 'C' ||
                        table[indexFrom + 8] === 'B' ||
                        table[indexFrom + 8] === 'Q' ||
                        table[indexFrom + 8] === 'P' ||
                        indexFrom + 8 > 64
                      ) {
                        table[indexFrom + 8] = 'x';
                      }
                      if (
                        table[indexFrom + 7] === ' ' ||
                        table[indexFrom + 7] === 'T' ||
                        table[indexFrom + 7] === 'C' ||
                        table[indexFrom + 7] === 'B' ||
                        table[indexFrom + 7] === 'Q' ||
                        table[indexFrom + 7] === 'P' ||
                        indexFrom + 7 > 64
                      ) {
                        table[indexFrom + 7] = 'x';
                      }
                      if (
                        table[indexFrom - 1] === ' ' ||
                        table[indexFrom - 1] === 'T' ||
                        table[indexFrom - 1] === 'C' ||
                        table[indexFrom - 1] === 'B' ||
                        table[indexFrom - 1] === 'Q' ||
                        table[indexFrom - 1] === 'P' ||
                        indexFrom - 1 > 64
                      ) {
                        table[indexFrom - 1] = 'x';
                      }
                    } else {
                      if (
                        table[indexFrom + 9] === ' ' ||
                        table[indexFrom + 9] === 'T' ||
                        table[indexFrom + 9] === 'C' ||
                        table[indexFrom + 9] === 'B' ||
                        table[indexFrom + 9] === 'Q' ||
                        table[indexFrom + 9] === 'P' ||
                        indexFrom + 9 > 64
                      ) {
                        table[indexFrom + 9] = 'x';
                      }
                      if (
                        table[indexFrom + 1] === ' ' ||
                        table[indexFrom + 1] === 'T' ||
                        table[indexFrom + 1] === 'C' ||
                        table[indexFrom + 1] === 'B' ||
                        table[indexFrom + 1] === 'Q' ||
                        table[indexFrom + 1] === 'P' ||
                        indexFrom + 1 > 64
                      ) {
                        table[indexFrom + 1] = 'x';
                      }
                      if (
                        table[indexFrom + 8] === ' ' ||
                        table[indexFrom + 8] === 'T' ||
                        table[indexFrom + 8] === 'C' ||
                        table[indexFrom + 8] === 'B' ||
                        table[indexFrom + 8] === 'Q' ||
                        table[indexFrom + 8] === 'P' ||
                        indexFrom + 8 > 64
                      ) {
                        table[indexFrom + 8] = 'x';
                      }
                      if (
                        table[indexFrom + 7] === ' ' ||
                        table[indexFrom + 7] === 'T' ||
                        table[indexFrom + 7] === 'C' ||
                        table[indexFrom + 7] === 'B' ||
                        table[indexFrom + 7] === 'Q' ||
                        table[indexFrom + 7] === 'P' ||
                        indexFrom + 7 > 64
                      ) {
                        table[indexFrom + 7] = 'x';
                      }
                      if (
                        table[indexFrom - 9] === ' ' ||
                        table[indexFrom - 9] === 'T' ||
                        table[indexFrom - 9] === 'C' ||
                        table[indexFrom - 9] === 'B' ||
                        table[indexFrom - 9] === 'Q' ||
                        table[indexFrom - 9] === 'P' ||
                        indexFrom - 9 > 64
                      ) {
                        table[indexFrom - 9] = 'x';
                      }
                      if (
                        table[indexFrom - 1] === ' ' ||
                        table[indexFrom - 1] === 'T' ||
                        table[indexFrom - 1] === 'C' ||
                        table[indexFrom - 1] === 'B' ||
                        table[indexFrom - 1] === 'Q' ||
                        table[indexFrom - 1] === 'P' ||
                        indexFrom - 1 > 64
                      ) {
                        table[indexFrom - 1] = 'x';
                      }
                      if (
                        table[indexFrom - 8] === ' ' ||
                        table[indexFrom - 8] === 'T' ||
                        table[indexFrom - 8] === 'C' ||
                        table[indexFrom - 8] === 'B' ||
                        table[indexFrom - 8] === 'Q' ||
                        table[indexFrom - 8] === 'P' ||
                        indexFrom - 8 > 64
                      ) {
                        table[indexFrom - 8] = 'x';
                      }
                      if (
                        table[indexFrom - 7] === ' ' ||
                        table[indexFrom - 7] === 'T' ||
                        table[indexFrom - 7] === 'C' ||
                        table[indexFrom - 7] === 'B' ||
                        table[indexFrom - 7] === 'Q' ||
                        table[indexFrom - 7] === 'P' ||
                        indexFrom - 7 > 64
                      ) {
                        table[indexFrom - 7] = 'x';
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });

      break;
    case 'K':
      if (indexFrom === 56) {
        if (
          table[indexFrom + 1] === ' ' ||
          table[indexFrom + 1] === 't' ||
          table[indexFrom + 1] === 'c' ||
          table[indexFrom + 1] === 'b' ||
          table[indexFrom + 1] === 'q' ||
          table[indexFrom + 1] === 'p' ||
          indexFrom + 1 > 64
        ) {
          table[indexFrom + 1] = 'x';
        }
        if (
          table[indexFrom - 8] === ' ' ||
          table[indexFrom - 8] === 't' ||
          table[indexFrom - 8] === 'c' ||
          table[indexFrom - 8] === 'b' ||
          table[indexFrom - 8] === 'q' ||
          table[indexFrom - 8] === 'p' ||
          indexFrom - 8 > 64
        ) {
          table[indexFrom - 8] = 'x';
        }
        if (
          table[indexFrom - 7] === ' ' ||
          table[indexFrom - 7] === 't' ||
          table[indexFrom - 7] === 'c' ||
          table[indexFrom - 7] === 'b' ||
          table[indexFrom - 7] === 'q' ||
          table[indexFrom - 7] === 'p' ||
          indexFrom - 7 > 64
        ) {
          table[indexFrom - 7] = 'x';
        }
      } else {
        if (indexFrom === 63) {
          if (
            table[indexFrom - 9] === ' ' ||
            table[indexFrom - 9] === 't' ||
            table[indexFrom - 9] === 'c' ||
            table[indexFrom - 9] === 'b' ||
            table[indexFrom - 9] === 'q' ||
            table[indexFrom - 9] === 'p' ||
            indexFrom - 9 > 64
          ) {
            table[indexFrom - 9] = 'x';
          }
          if (
            table[indexFrom - 1] === ' ' ||
            table[indexFrom - 1] === 't' ||
            table[indexFrom - 1] === 'c' ||
            table[indexFrom - 1] === 'b' ||
            table[indexFrom - 1] === 'q' ||
            table[indexFrom - 1] === 'p' ||
            indexFrom - 1 > 64
          ) {
            table[indexFrom - 1] = 'x';
          }
          if (
            table[indexFrom - 8] === ' ' ||
            table[indexFrom - 8] === 't' ||
            table[indexFrom - 8] === 'c' ||
            table[indexFrom - 8] === 'b' ||
            table[indexFrom - 8] === 'q' ||
            table[indexFrom - 8] === 'p' ||
            indexFrom - 8 > 64
          ) {
            table[indexFrom - 8] = 'x';
          }
        } else {
          if (indexFrom === 0) {
            if (
              table[indexFrom + 9] === ' ' ||
              table[indexFrom + 9] === 't' ||
              table[indexFrom + 9] === 'c' ||
              table[indexFrom + 9] === 'b' ||
              table[indexFrom + 9] === 'q' ||
              table[indexFrom + 9] === 'p' ||
              indexFrom + 9 > 64
            ) {
              table[indexFrom + 9] = 'x';
            }
            if (
              table[indexFrom + 1] === ' ' ||
              table[indexFrom + 1] === 't' ||
              table[indexFrom + 1] === 'c' ||
              table[indexFrom + 1] === 'b' ||
              table[indexFrom + 1] === 'q' ||
              table[indexFrom + 1] === 'p' ||
              indexFrom + 1 > 64
            ) {
              table[indexFrom + 1] = 'x';
            }
            if (
              table[indexFrom + 8] === ' ' ||
              table[indexFrom + 8] === 't' ||
              table[indexFrom + 8] === 'c' ||
              table[indexFrom + 8] === 'b' ||
              table[indexFrom + 8] === 'q' ||
              table[indexFrom + 8] === 'p' ||
              indexFrom + 8 > 64
            ) {
              table[indexFrom + 8] = 'x';
            }
          } else {
            if (indexFrom === 7) {
              if (
                table[indexFrom + 8] === ' ' ||
                table[indexFrom + 8] === 't' ||
                table[indexFrom + 8] === 'c' ||
                table[indexFrom + 8] === 'b' ||
                table[indexFrom + 8] === 'q' ||
                table[indexFrom + 8] === 'p' ||
                indexFrom + 8 > 64
              ) {
                table[indexFrom + 8] = 'x';
              }
              if (
                table[indexFrom + 7] === ' ' ||
                table[indexFrom + 7] === 't' ||
                table[indexFrom + 7] === 'c' ||
                table[indexFrom + 7] === 'b' ||
                table[indexFrom + 7] === 'q' ||
                table[indexFrom + 7] === 'p' ||
                indexFrom + 7 > 64
              ) {
                table[indexFrom + 7] = 'x';
              }
              if (
                table[indexFrom - 1] === ' ' ||
                table[indexFrom - 1] === 't' ||
                table[indexFrom - 1] === 'c' ||
                table[indexFrom - 1] === 'b' ||
                table[indexFrom - 1] === 'q' ||
                table[indexFrom - 1] === 'p' ||
                indexFrom - 1 > 64
              ) {
                table[indexFrom - 1] = 'x';
              }
            } else {
              if (indexFrom % 8 === 7) {
                if (
                  table[indexFrom + 8] === ' ' ||
                  table[indexFrom + 8] === 't' ||
                  table[indexFrom + 8] === 'c' ||
                  table[indexFrom + 8] === 'b' ||
                  table[indexFrom + 8] === 'q' ||
                  table[indexFrom + 8] === 'p' ||
                  indexFrom + 8 > 64
                ) {
                  table[indexFrom + 8] = 'x';
                }
                if (
                  table[indexFrom + 7] === ' ' ||
                  table[indexFrom + 7] === 't' ||
                  table[indexFrom + 7] === 'c' ||
                  table[indexFrom + 7] === 'b' ||
                  table[indexFrom + 7] === 'q' ||
                  table[indexFrom + 7] === 'p' ||
                  indexFrom + 7 > 64
                ) {
                  table[indexFrom + 7] = 'x';
                }
                if (
                  table[indexFrom - 9] === ' ' ||
                  table[indexFrom - 9] === 't' ||
                  table[indexFrom - 9] === 'c' ||
                  table[indexFrom - 9] === 'b' ||
                  table[indexFrom - 9] === 'q' ||
                  table[indexFrom - 9] === 'p' ||
                  indexFrom - 9 > 64
                ) {
                  table[indexFrom - 9] = 'x';
                }
                if (
                  table[indexFrom - 1] === ' ' ||
                  table[indexFrom - 1] === 't' ||
                  table[indexFrom - 1] === 'c' ||
                  table[indexFrom - 1] === 'b' ||
                  table[indexFrom - 1] === 'q' ||
                  table[indexFrom - 1] === 'p' ||
                  indexFrom - 1 > 64
                ) {
                  table[indexFrom - 1] = 'x';
                }
                if (
                  table[indexFrom - 8] === ' ' ||
                  table[indexFrom - 8] === 't' ||
                  table[indexFrom - 8] === 'c' ||
                  table[indexFrom - 8] === 'b' ||
                  table[indexFrom - 8] === 'q' ||
                  table[indexFrom - 8] === 'p' ||
                  indexFrom - 8 > 64
                ) {
                  table[indexFrom - 8] = 'x';
                }
              } else {
                if (indexFrom % 8 === 0) {
                  if (
                    table[indexFrom + 9] === ' ' ||
                    table[indexFrom + 9] === 't' ||
                    table[indexFrom + 9] === 'c' ||
                    table[indexFrom + 9] === 'b' ||
                    table[indexFrom + 9] === 'q' ||
                    table[indexFrom + 9] === 'p' ||
                    indexFrom + 9 > 64
                  ) {
                    table[indexFrom + 9] = 'x';
                  }
                  if (
                    table[indexFrom + 1] === ' ' ||
                    table[indexFrom + 1] === 't' ||
                    table[indexFrom + 1] === 'c' ||
                    table[indexFrom + 1] === 'b' ||
                    table[indexFrom + 1] === 'q' ||
                    table[indexFrom + 1] === 'p' ||
                    indexFrom + 1 > 64
                  ) {
                    table[indexFrom + 1] = 'x';
                  }
                  if (
                    table[indexFrom + 8] === ' ' ||
                    table[indexFrom + 8] === 't' ||
                    table[indexFrom + 8] === 'c' ||
                    table[indexFrom + 8] === 'b' ||
                    table[indexFrom + 8] === 'q' ||
                    table[indexFrom + 8] === 'p' ||
                    indexFrom + 8 > 64
                  ) {
                    table[indexFrom + 8] = 'x';
                  }
                  if (
                    table[indexFrom - 8] === ' ' ||
                    table[indexFrom - 8] === 't' ||
                    table[indexFrom - 8] === 'c' ||
                    table[indexFrom - 8] === 'b' ||
                    table[indexFrom - 8] === 'q' ||
                    table[indexFrom - 8] === 'p' ||
                    indexFrom - 8 > 64
                  ) {
                    table[indexFrom - 8] = 'x';
                  }
                  if (
                    table[indexFrom - 7] === ' ' ||
                    table[indexFrom - 7] === 't' ||
                    table[indexFrom - 7] === 'c' ||
                    table[indexFrom - 7] === 'b' ||
                    table[indexFrom - 7] === 'q' ||
                    table[indexFrom - 7] === 'p' ||
                    indexFrom - 7 > 64
                  ) {
                    table[indexFrom - 7] = 'x';
                  }
                } else {
                  if (indexFrom > 56) {
                    if (
                      table[indexFrom + 1] === ' ' ||
                      table[indexFrom + 1] === 't' ||
                      table[indexFrom + 1] === 'c' ||
                      table[indexFrom + 1] === 'b' ||
                      table[indexFrom + 1] === 'q' ||
                      table[indexFrom + 1] === 'p' ||
                      indexFrom + 1 > 64
                    ) {
                      table[indexFrom + 1] = 'x';
                    }
                    if (
                      table[indexFrom - 9] === ' ' ||
                      table[indexFrom - 9] === 't' ||
                      table[indexFrom - 9] === 'c' ||
                      table[indexFrom - 9] === 'b' ||
                      table[indexFrom - 9] === 'q' ||
                      table[indexFrom - 9] === 'p' ||
                      indexFrom - 9 > 64
                    ) {
                      table[indexFrom - 9] = 'x';
                    }
                    if (
                      table[indexFrom - 1] === ' ' ||
                      table[indexFrom - 1] === 't' ||
                      table[indexFrom - 1] === 'c' ||
                      table[indexFrom - 1] === 'b' ||
                      table[indexFrom - 1] === 'q' ||
                      table[indexFrom - 1] === 'p' ||
                      indexFrom - 1 > 64
                    ) {
                      table[indexFrom - 1] = 'x';
                    }
                    if (
                      table[indexFrom - 8] === ' ' ||
                      table[indexFrom - 8] === 't' ||
                      table[indexFrom - 8] === 'c' ||
                      table[indexFrom - 8] === 'b' ||
                      table[indexFrom - 8] === 'q' ||
                      table[indexFrom - 8] === 'p' ||
                      indexFrom - 8 > 64
                    ) {
                      table[indexFrom - 8] = 'x';
                    }
                    if (
                      table[indexFrom - 7] === ' ' ||
                      table[indexFrom - 7] === 't' ||
                      table[indexFrom - 7] === 'c' ||
                      table[indexFrom - 7] === 'b' ||
                      table[indexFrom - 7] === 'q' ||
                      table[indexFrom - 7] === 'p' ||
                      indexFrom - 7 > 64
                    ) {
                      table[indexFrom - 7] = 'x';
                    }
                  } else {
                    if (indexFrom < 7) {
                      if (
                        table[indexFrom + 9] === ' ' ||
                        table[indexFrom + 9] === 't' ||
                        table[indexFrom + 9] === 'c' ||
                        table[indexFrom + 9] === 'b' ||
                        table[indexFrom + 9] === 'q' ||
                        table[indexFrom + 9] === 'p' ||
                        indexFrom + 9 > 64
                      ) {
                        table[indexFrom + 9] = 'x';
                      }
                      if (
                        table[indexFrom + 1] === ' ' ||
                        table[indexFrom + 1] === 't' ||
                        table[indexFrom + 1] === 'c' ||
                        table[indexFrom + 1] === 'b' ||
                        table[indexFrom + 1] === 'q' ||
                        table[indexFrom + 1] === 'p' ||
                        indexFrom + 1 > 64
                      ) {
                        table[indexFrom + 1] = 'x';
                      }
                      if (
                        table[indexFrom + 8] === ' ' ||
                        table[indexFrom + 8] === 't' ||
                        table[indexFrom + 8] === 'c' ||
                        table[indexFrom + 8] === 'b' ||
                        table[indexFrom + 8] === 'q' ||
                        table[indexFrom + 8] === 'p' ||
                        indexFrom + 8 > 64
                      ) {
                        table[indexFrom + 8] = 'x';
                      }
                      if (
                        table[indexFrom + 7] === ' ' ||
                        table[indexFrom + 7] === 't' ||
                        table[indexFrom + 7] === 'c' ||
                        table[indexFrom + 7] === 'b' ||
                        table[indexFrom + 7] === 'q' ||
                        table[indexFrom + 7] === 'p' ||
                        indexFrom + 7 > 64
                      ) {
                        table[indexFrom + 7] = 'x';
                      }
                      if (
                        table[indexFrom - 1] === ' ' ||
                        table[indexFrom - 1] === 't' ||
                        table[indexFrom - 1] === 'c' ||
                        table[indexFrom - 1] === 'b' ||
                        table[indexFrom - 1] === 'q' ||
                        table[indexFrom - 1] === 'p' ||
                        indexFrom - 1 > 64
                      ) {
                        table[indexFrom - 1] = 'x';
                      }
                    } else {
                      if (
                        table[indexFrom + 9] === ' ' ||
                        table[indexFrom + 9] === 't' ||
                        table[indexFrom + 9] === 'c' ||
                        table[indexFrom + 9] === 'b' ||
                        table[indexFrom + 9] === 'q' ||
                        table[indexFrom + 9] === 'p' ||
                        indexFrom + 9 > 64
                      ) {
                        table[indexFrom + 9] = 'x';
                      }
                      if (
                        table[indexFrom + 1] === ' ' ||
                        table[indexFrom + 1] === 't' ||
                        table[indexFrom + 1] === 'c' ||
                        table[indexFrom + 1] === 'b' ||
                        table[indexFrom + 1] === 'q' ||
                        table[indexFrom + 1] === 'p' ||
                        indexFrom + 1 > 64
                      ) {
                        table[indexFrom + 1] = 'x';
                      }
                      if (
                        table[indexFrom + 8] === ' ' ||
                        table[indexFrom + 8] === 't' ||
                        table[indexFrom + 8] === 'c' ||
                        table[indexFrom + 8] === 'b' ||
                        table[indexFrom + 8] === 'q' ||
                        table[indexFrom + 8] === 'p' ||
                        indexFrom + 8 > 64
                      ) {
                        table[indexFrom + 8] = 'x';
                      }
                      if (
                        table[indexFrom + 7] === ' ' ||
                        table[indexFrom + 7] === 't' ||
                        table[indexFrom + 7] === 'c' ||
                        table[indexFrom + 7] === 'b' ||
                        table[indexFrom + 7] === 'q' ||
                        table[indexFrom + 7] === 'p' ||
                        indexFrom + 7 > 64
                      ) {
                        table[indexFrom + 7] = 'x';
                      }
                      if (
                        table[indexFrom - 9] === ' ' ||
                        table[indexFrom - 9] === 't' ||
                        table[indexFrom - 9] === 'c' ||
                        table[indexFrom - 9] === 'b' ||
                        table[indexFrom - 9] === 'q' ||
                        table[indexFrom - 9] === 'p' ||
                        indexFrom - 9 > 64
                      ) {
                        table[indexFrom - 9] = 'x';
                      }
                      if (
                        table[indexFrom - 1] === ' ' ||
                        table[indexFrom - 1] === 't' ||
                        table[indexFrom - 1] === 'c' ||
                        table[indexFrom - 1] === 'b' ||
                        table[indexFrom - 1] === 'q' ||
                        table[indexFrom - 1] === 'p' ||
                        indexFrom - 1 > 64
                      ) {
                        table[indexFrom - 1] = 'x';
                      }
                      if (
                        table[indexFrom - 8] === ' ' ||
                        table[indexFrom - 8] === 't' ||
                        table[indexFrom - 8] === 'c' ||
                        table[indexFrom - 8] === 'b' ||
                        table[indexFrom - 8] === 'q' ||
                        table[indexFrom - 8] === 'p' ||
                        indexFrom - 8 > 64
                      ) {
                        table[indexFrom - 8] = 'x';
                      }
                      if (
                        table[indexFrom - 7] === ' ' ||
                        table[indexFrom - 7] === 't' ||
                        table[indexFrom - 7] === 'c' ||
                        table[indexFrom - 7] === 'b' ||
                        table[indexFrom - 7] === 'q' ||
                        table[indexFrom - 7] === 'p' ||
                        indexFrom - 7 > 64
                      ) {
                        table[indexFrom - 7] = 'x';
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      setGameState({
        ...gameState,
        table,
        selected: indexFrom,
        clicked: true
      });

      break;

    default:
      return ' ';
  }
};
