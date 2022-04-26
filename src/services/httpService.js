import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error ocurred');
  }

  return Promise.reject(error);
});

const setJwt = (jwt) => {
  axios.defaults.headers.common['x-auth-token'] = jwt;
};

const httpMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

export default httpMethods;
