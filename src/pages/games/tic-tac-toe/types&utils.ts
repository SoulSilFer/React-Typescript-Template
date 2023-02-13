export type TicTacToeGameStatus = {
  player1: number;
  player2: number;
  draws: number;
  games: number;
  turn: 'player1' | 'player2';
};

export type TicTacToeSections = {
  A1: {
    value: string;
  };
  A2: {
    value: string;
  };
  A3: {
    value: string;
  };
  B1: {
    value: string;
  };
  B2: {
    value: string;
  };
  B3: {
    value: string;
  };
  C1: {
    value: string;
  };
  C2: {
    value: string;
  };
  C3: {
    value: string;
  };
};

export type TicTacToePlayersNames = {
  player1: string;
  player2: string;
};

export type TicTacToeEndGame = {
  winner: 'player1' | 'player2' | 'draw' | null;
};

export const InitialStateTicTacToeGameStatus: TicTacToeGameStatus = {
  player1: 0,
  player2: 0,
  draws: 0,
  games: 0,
  turn: 'player1'
};

export const InitialStateTicTacToeSections: TicTacToeSections = {
  A1: {
    value: ''
  },
  A2: {
    value: ''
  },
  A3: {
    value: ''
  },
  B1: {
    value: ''
  },
  B2: {
    value: ''
  },
  B3: {
    value: ''
  },
  C1: {
    value: ''
  },
  C2: {
    value: ''
  },
  C3: {
    value: ''
  }
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

export const InitialStateTicTacToePlayersNames: TicTacToePlayersNames = {
  player1: 'Player 1',
  player2: 'Player 2'
};

export const InitialStateTicTacToeEndGame: TicTacToeEndGame = {
  winner: null
};
