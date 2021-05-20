import SignIn from './screens/SignIn';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastProvider>
          <SignIn />
        </ToastProvider>
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
