import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/movies`;

const movieUrl = (id) => {
  return `${apiEndpoint}/${id}`;
};

export const getMovies = async () => {
  const { data: movies } = await http.get(apiEndpoint);
  return movies;
};

export const getMovie = async (id) => {
  const { data: movie } = await http.get(movieUrl(id));
  return movie;
};

export const saveMovie = async (movie) => {
  const movieId = movie._id;
  delete movie._id;
  if (movieId === '') {
    movie = await http.post(apiEndpoint, movie);
  } else {
    movie = await http.put(movieUrl(movieId), movie);
  }

  return movie;
};

export const deleteMovie = async (id) => {
  const { data: movie } = await http.delete(movieUrl(id));
  return movie;
};
