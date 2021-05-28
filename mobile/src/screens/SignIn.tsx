import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components/native';

import Input from '../components/Input';
import Button from '../components/Button';

// carrega a imagem logo.png ou logo@2x.png ou logo@3x.png
// depende do tamanho do dispositivo. ele carrega de acordo com o tamanho 
// do disposiivo
import logoImg from '../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Do your login</Title>
      <Input />
      <Input />
      <Button onPress={() => {}}>Entrar </Button>
    </Container>
  );
};

const Container = styled.View`
  flex: 1 ;
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

export default SignIn;
