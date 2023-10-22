import axios from 'axios';
import axiosIntance from './axiosIntance';

export const signup = async newUser => {
  try {
    const res = await axios.post(
      'http://localhost:9000/api/v1/users/auth/signup',
      newUser
    );
    return res?.data;
  } catch (err) {
    // console.error(err?.response?.data?.message);
    throw Error(err.response?.data?.message);
  }
};

export const login = async ({ email, password }) => {
  try {
    const res = await axiosIntance.post('/api/v1/users/auth/login', {
      email,
      password,
    });
    localStorage.setItem('token', res.data.token);
  } catch (err) {
    // console.error('ERROR: ', err);
    throw Error(err.response?.data?.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axiosIntance('/api/v1/users/current-user');
    const user = res?.data?.data;
    return user;
  } catch (err) {
    // console.log(err);
    throw Error(err?.response?.data?.message);
  }
};

export const logout = async () => {
  try {
    await axios('http://localhost:9000/api/v1/users/auth/logout');
    localStorage.removeItem('token');
  } catch (err) {
    // console.error(err);
    throw Error(err.response?.data?.message);
  }
};

export const updateUserData = async newUser => {
  try {
    const formData = new FormData();

    for (let key in newUser) {
      if (key === 'avatar' && typeof key !== 'string')
        formData.append(key, newUser[key][0]);
      else if (key === 'avatar' && typeof key === 'string')
        formData.append(key, newUser[key]);
      else formData.append(key, newUser[key]);
    }

    const res = await axiosIntance.patch('/api/v1/users/update-user', formData);
    return res?.data;
  } catch (err) {
    // console.error(err?.response);
    throw Error(err?.response?.data?.message);
  }
};

export const updateUserPassword = async newPassword => {
  try {
    const res = await axiosIntance.patch(
      '/api/v1/users/update-password',
      newPassword
    );
    return res?.data;
  } catch (err) {
    console.log(err);
    throw Error(err?.response?.data?.message);
  }
};
