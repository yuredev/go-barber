import React from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, name, ...rest }) => {
  return (
    <Container>
      <StyledIcon name={icon} size={20} color="#666360" />
      <StyledTextInput {...rest} />
    </Container>
  )
}

const Container = styled.View`
  height: 60px;
  width: 100%;
  padding: 0 16px;
  flex-direction: row;
  align-items: center;
  background: #232126;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  color: #FFF;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

const StyledIcon = styled(Icon)`
  margin-right: 16px;
`;

export default Input;
