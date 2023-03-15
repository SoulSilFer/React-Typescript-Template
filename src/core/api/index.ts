import axios from 'axios';

export const ApiGet = (url: string) => {
  return axios.get(url);
};
