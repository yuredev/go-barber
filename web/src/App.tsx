import SignIn from './screens/SignIn';
import GlobalStyle from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}

export default App;
