import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Stack = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
    // o stack navigator é como se fosse o Switch no React Router DOM
    <Stack.Navigator
      screenOptions={{
        // ocultar o header do aplicativo. o header é o que aparece no topo da tela e abaixo da status bar
        headerShown: false,
        // aplicar estilo em cada uma das rotas
        cardStyle: {
          backgroundColor: '#312e28',
        },
      }}
    >
      {/* as stack screens é como se fossem as rotas do react router dom */}
      <Stack.Screen component={SignIn} name="SignIn" />
      <Stack.Screen component={SignUp} name="SignUp" />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
