import http from './httpService';

const apiEndpoint = `/users `;

export const register = async (user) => {
  const response = await http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });

  return response.headers['x-auth-token'];
};
