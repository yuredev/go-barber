import GlobalStyle from './styles/global';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AppProvider from './hooks/AppProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>      
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
