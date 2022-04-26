import http from './httpService';
import jwtDecode from 'jwt-decode';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/auth`;
const tokenKey = 'token';

http.setJwt(getJwt());

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};
export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};
export const logout = () => {
  localStorage.removeItem(tokenKey);
};
export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
};
