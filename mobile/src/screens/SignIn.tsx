import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import Input from '../components/Input';
import Button from '../components/Button';

// carrega a imagem logo.png ou logo@2x.png ou logo@3x.png
// depende do tamanho do dispositivo. ele carrega de acordo com o tamanho
// do disposiivo
import logoImg from '../assets/logo.png';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  return (
    // no IOS o teclado abre ficando acima dos inputs, para evitar isso
    // podemos usar este componente e usarmos o comportamento de paddin
    // caso a plataforma seja IOS
    // já no Android esse comportamento é padrão, mesmo que não utilizemos este componente
    // por isso podemos declarar o behavior como undefined
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // é necessário fazer o componente ocupar a tela inteira 
      style={{ flex: 1 }}
      // manter o componente habilitado por padrão
      enabled
    >
      <ScrollView
        // numa ScrollView aplicamos os estilos no contentContainerStyle e não no style
        contentContainerStyle={{ flex: 1 }}
        // define o comportamento caso o usuário toque fora do teclado
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logoImg} />
          {/* 
            no ios os componentes de texto apresentam problemas
            na animação ao abrir o teclado
            para resolver basta passar uma View envolvendo o componente
          */}
          <View>
            <Title>Login to your account</Title> 
          </View>
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Password" />
          <Button onPress={() => {}}>Sign in</Button>
          <ForgotPassword>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#FF9000"/>
        <CreateAccountButtonText>Create a account</CreateAccountButtonText>
      </CreateAccountButton>
    </KeyboardAvoidingView>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'Roboto Slab-Regular';
`;

const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: #2c2930;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CreateAccountButtonText = styled.Text`
  margin-left: 16px;
  color: #FF9000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export default SignIn;
