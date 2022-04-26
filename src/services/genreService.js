import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/genres`;

export const getGenres = async () => {
  const { data: genres } = await http.get(apiEndpoint);
  return genres;
};
