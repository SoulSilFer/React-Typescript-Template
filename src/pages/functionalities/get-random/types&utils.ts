export type RandomNumbers = {
  minValue: string;
  maxValue: string;
  qtd: string;
  insertOwnNumbers: string;
};

export type RandomNumbersChecks = {
  insertOwnNumbers: boolean;
};

export type BlockButton = {
  message: string;
  disabled: boolean;
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

export const InitialStateBlockButton = {
  message: '',
  disabled: false
};

export type RandomText = {
  qtd: string;
  inputText: string;
  result: string;
};

export const InitialStateRandomText: RandomText = {
  qtd: '',
  inputText: '',
  result: ''
};
