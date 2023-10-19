import axios from './axiosIntance';

const API_HOST = '/api/v1/users/auth';

export const login = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_HOST}/login`, { email, password });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    console.error('ERROR:', err.response.data);
    throw Error(err.response.data.message);
  }
};
