export type TicTacToeGameStatus = {
  player1: number;
  player2: number;
  draws: number;
  games: number;
  turn: 'player1' | ('player2' | 'computer');
};

export type TicTacToeSections = {
  A1: string;
  A2: string;
  A3: string;
  B1: string;
  B2: string;
  B3: string;
  C1: string;
  C2: string;
  C3: string;
};

export type TicTacToeEndGame = {
  endGame: 'player1' | 'player2' | 'draw' | null;
};

export const InitialStateTicTacToeGameStatus: TicTacToeGameStatus = {
  player1: 0,
  player2: 0,
  draws: 0,
  games: 0,
  turn: 'player1'
};

export const InitialStateTicTacToeSections: TicTacToeSections = {
  A1: '',
  A2: '',
  A3: '',
  B1: '',
  B2: '',
  B3: '',
  C1: '',
  C2: '',
  C3: ''
};

export const TicTacToeWinConditions = [
  ['A1', 'A2', 'A3'],
  ['B1', 'B2', 'B3'],
  ['C1', 'C2', 'C3'],
  ['A1', 'B1', 'C1'],
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],
  ['A1', 'B2', 'C3'],
  ['A3', 'B2', 'C1']
];

export const InitialStateTicTacToeEndGame: TicTacToeEndGame = {
  endGame: null
};
