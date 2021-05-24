import Router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { api } from "../services/api";

type User = {
  name: string
  username: string
}

type SignInCredentials = {
  username: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  user: User
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel 

export function signOut() {
  destroyCookie(undefined, 'zf.token')
  destroyCookie(undefined, 'zf.refreshToken')

  authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'zf.token': token } = parseCookies()

    if (token) {
      api.get('/me')
        .then(response => {
          const { username, name } = response.data
          setUser({
            username,
            name
          })
        })
        .catch(() => {
          signOut()
        })
    } else {
      Router.push('/')
    }
  }, [])

  async function signIn({username, password}: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
      username,
      password
      })

      const { token, refresh_token } = response.data;

      setCookie(undefined, 'zf.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setCookie(undefined, 'zf.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      })

      setUser({
        username,
        name: response.data.user.name
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      Router.push('/leagues')

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}