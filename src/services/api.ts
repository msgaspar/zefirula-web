import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const api = axios.create({
  baseURL: 'https://zefirula.mgaspar.dev',
  headers: {
    Authorization: `Bearer ${cookies['zf.token']}`,
  },
});

api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.message === 'Invalid token') {
        cookies = parseCookies();

        const { 'zf.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .post('refresh-token', {
              token: refreshToken,
            })
            .then(response => {
              const { token } = response.data;

              setCookie(undefined, 'zf.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/',
              });

              setCookie(
                undefined,
                'zf.refreshToken',
                response.data.refresh_token,
                {
                  maxAge: 60 * 60 * 24 * 30,
                  path: '/',
                }
              );

              api.defaults.headers['Authorization'] = `Bearer ${token}`;

              failedRequestsQueue.forEach(request => request.onSuccess(token));
              failedRequestsQueue = [];
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err));
              failedRequestsQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalConfig));
            },
            onFailure: (err: AxiosError) => {
              reject(err);
            },
          });
        });
      } else {
        const { 'zf.token': token } = parseCookies();
        if (token) {
          signOut();
        }
      }
    }

    return Promise.reject(error);
  }
);
