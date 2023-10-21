import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:9000',
  timeout: 1000,
  //   headers: { 'X-Custom-Header': 'foobar' },
});

instance.interceptors.request.use(
  config => {
    // Do something before request is sent
    // console.log(config);
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
