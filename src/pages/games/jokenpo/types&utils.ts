export type JokenpoChoices = 'paper' | 'rock' | 'scizor' | null;

export type JokenpoGameState = {
  playerChoice: JokenpoChoices | null;
  computerChoice: JokenpoChoices | null;
  winner: string;

  ranking: {
    player: number;
    computer: number;
    draw: number;
    totalGames: number;
  };
};

export const InitialStateJokenpoGame: JokenpoGameState = {
  playerChoice: null,
  computerChoice: null,
  winner: '',
  ranking: {
    player: 0,
    computer: 0,
    draw: 0,
    totalGames: 0
  }
};
