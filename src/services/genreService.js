import http from './httpService';

const apiEndpoint = `/genres`;

export const getGenres = async () => {
  const { data: genres } = await http.get(apiEndpoint);
  return genres;
};
