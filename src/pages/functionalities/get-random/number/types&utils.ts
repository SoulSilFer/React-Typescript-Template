export type RandomNumbers = {
  minValue: string;
  maxValue: string;
  qtd: string;
  insertOwnNumbers: string;
};

export type RandomNumbersChecks = {
  insertOwnNumbers: boolean;
};

export const InitialStateRandomNumbers = {
  minValue: '',
  maxValue: '',
  qtd: '',
  insertOwnNumbers: ''
};

export const InitialStateRandomNumbersChecks = {
  insertOwnNumbers: false
};
