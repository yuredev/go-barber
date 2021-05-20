import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/Toast/ToastContainer';

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'error' | 'success' | 'info';
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

const ToastProvider: React.FC = ({ children }) => {

  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ title, description, type }: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const newMessage = {
      id,
      title,
      description, 
      type,
    };

    // é possível pegar o estado anterior de um dado num setter do useState, para isso usamos
    // uma callback no useState, desta forma o valor ido para o setState é o valor retornado
    // da callback
    setMessages(oldMessages => oldMessages.concat(newMessage));
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages => oldMessages.filter(msg => msg.id !== id))
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
}

export { useToast, ToastProvider };
