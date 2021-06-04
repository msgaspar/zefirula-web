import Router from 'next/router';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { Spinner, Flex } from '@chakra-ui/react';
import { api } from '../services/api';

type User = {
  name: string;
  username: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut() {
  destroyCookie(undefined, 'zf.token');
  destroyCookie(undefined, 'zf.refreshToken');

  authChannel.postMessage('signOut');

  Router.reload();
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  // useEffect(() => {
  //   authChannel = new BroadcastChannel('auth');
  //   authChannel.onmessage = message => {
  //     switch (message.data) {
  //       case 'signOut':
  //         signOut();
  //         break;
  //       default:
  //         break;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const { 'zf.token': token } = parseCookies();

    if (token) {
      if (Router.pathname === '/') {
        Router.push('/leagues').then(() => setIsLoading(false));
      } else {
        setIsLoading(false);
        console.log('authcontext chamando api');
        api
          .get('/me')
          .then(response => {
            const { username, name } = response.data;
            setUser({
              username,
              name,
            });
          })
          .catch(() => {
            signOut();
          });
      }
    } else {
      Router.push('/').then(() => setIsLoading(false));
    }
  }, []);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        username,
        password,
      });

      const { token, refresh_token } = response.data;

      setCookie(undefined, 'zf.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setCookie(undefined, 'zf.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        username,
        name: response.data.user.name,
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      Router.push('/leagues');
    } catch (err) {
      if (err.response.status === 401 || 403) {
        throw new Error('Invalid credentials');
      } else {
        console.log(err);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {isLoading ? (
        <Flex align="center" justify="center" flex="1" h="100%">
          <Spinner size="lg" color="orange.logo" />
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
