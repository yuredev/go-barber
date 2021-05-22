import React from 'react';
import styled from 'styled-components';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';
import { useTransition } from 'react-spring';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, {
    // posição inicial
    from: {
      right: '-120%',
      opacity: 0,
    },
    // quando o elemento entrar na tela
    enter: {
      right: '0%',
      opacity: 1,
    },
    // quando o elemento sair
    leave: {
      right: '-120%',
      opacity: 0,
    },
  });

  return (
    <Container>
      {messagesWithTransitions((style, item, { key }) => (
        <Toast key={key} message={item} style={style} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px;
  overflow: hidden;
`;

export default ToastContainer;
