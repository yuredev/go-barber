import 'react-native-gesture-handler';
import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './routes';

const App: React.FC = () => {
  return (
    // Para a navegação funcionar é obrigatório por volta da aplicação conter um NavigationContainer
    // o NavigationContainer é o Provider da biblioteca do react-navigation que 
    // faz com que seja possível a navegação acontecer
    // ele utilizar a Context API do React por debaixo dos panos
    // sendo assim seria possível fazer tudo que o react-navigation faz 
    // de forma pura no React, sem precisar de lib externa
    <NavigationContainer>
      {/* a status bar é a barra de cima da tela que aparece as notificações, nivel bateria etc. */}
      <StatusBar barStyle="light-content" backgroundColor="#2c2930" />
      <View style={{ backgroundColor: '#312E38', flex: 1 }} >
        <AuthRoutes />
      </View>
    </NavigationContainer>
  )
};

export default App;
