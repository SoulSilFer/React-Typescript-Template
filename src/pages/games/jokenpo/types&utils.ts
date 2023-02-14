export type JokenpoGameState = {
  playerChoice: 'scizor' | 'rock' | 'paper' | null;
  computerChoice: 'scizor' | 'rock' | 'paper' | null;
  winner: string;
};

export type JokenpoGameRanking = {
  player: number;
  computer: number;
  draw: number;
  totalGames: number;
};

export const InitialStateJokenpoGameRanking: JokenpoGameRanking = {
  player: 0,
  computer: 0,
  draw: 0,
  totalGames: 0
};

export const InitialStateJokenpoGame: JokenpoGameState = {
  playerChoice: null,
  computerChoice: null,
  winner: ''
};
