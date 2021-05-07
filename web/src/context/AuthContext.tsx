import React, { createContext, useCallback, useState } from 'react';
import RequestError from '../errors/RequestError';
import { SignInCredentials } from '../interfaces';
import api from '../services/api';

// estado componente Provider que possui o AuthContext
interface AuthData {
  token: string;
  user: object;
}

// arquetipo do AuthContext
// possui apenas o que é disponibilizado
// dos componentes consumirem do estado global, neste caso só: user e a função signIn
interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

  // passar uma callback no useState faz a callback executar toda vez que
  // o setAuthData for executado, como se fosse um setter de um computed no Vue
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:token');

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const { data } = await api.post('/sessions', {
        email,
        password,
      });

      localStorage.setItem('@GoBarber:token', data.token);
      // o user é um objeto, logo salvamos ele na forma de json      
      localStorage.setItem('@GoBarber:token', JSON.stringify(data.user));
      
      // dispara a callback do useState, como se fosse um setter de um computed no Vue
      setAuthData({ token: data.token, user: data.user});
    } catch (error) {
      console.log(error);
      throw new RequestError('Incorrect email/password combination');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user : authData.user, signIn }}>
      {children}      
    </AuthContext.Provider>
  );
};


