import axios, {AxiosInstance} from 'axios';
import ReduxStore from '../redux/StoreInstance';
import {
  removeToken,
  removeUserLoginData,
  removeUserProfileData,
  removeUserId,
} from '../redux/UserActions';
import NavigationService from '../services/NavigationService';

const initAxios = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || '',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(
    config => {
      const store: any = ReduxStore.getState();
      if (store.user.token) {
        config.headers['Auth-Key'] = store.user.token;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const originalRequest = error.config;
      const store: any = ReduxStore.getState();
      if (error.response.status === 401 && !originalRequest._retry) {
        store.dispatch(removeToken());
        store.dispatch(removeUserLoginData());
        store.dispatch(removeUserProfileData());
        store.dispatch(removeUserId());
        NavigationService.navigate('Login');
      }
      if (error.response.status === 404 && !originalRequest._retry) {
        originalRequest._retry = true;
        NavigationService.navigate('Home');
      }
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const instance = initAxios();

export default instance;
