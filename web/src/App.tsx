import SignIn from './screens/SignIn';
import GlobalStyle from './styles/global';

import { AuthProvider } from './context/AuthContext';

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
