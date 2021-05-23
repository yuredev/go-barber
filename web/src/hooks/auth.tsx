import React, { createContext, useCallback, useState, useContext } from 'react';
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
  signOut(): void;
}

const AuthContext = createContext({} as AuthContextData);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC = ({ children }) => {

  // podemos passar uma callback para o useState, assim a callback é executada 
  // e o retorno dela é o que vai para o estado
  const [authData, setAuthData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

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
      localStorage.setItem('@GoBarber:user', JSON.stringify(data.user));
      
      setAuthData({ token: data.token, user: data.user});
    } catch (error) {
      console.log(error);
      throw new RequestError('Incorrect email/password combination');
    }
  }, []);


  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:token');
    setAuthData({} as AuthData);
  }, []);


  return (
    <AuthContext.Provider value={{ user: authData.user, signIn, signOut }}>
      {children}      
    </AuthContext.Provider>
  );
};


