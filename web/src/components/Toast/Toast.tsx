import { animated } from '@react-spring/web';
import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import styled, { css } from 'styled-components';
import { ToastMessage, useToast } from '../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const toastIcons = {
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    // uma função retornada em um useEffect 
    // é executada quando o componente morrer
    // como se fosse um onDestroy
    return () => {
      clearTimeout(timer);
    }
  }, [message.id, removeToast]);



  return (
    <Container
      hasDescription={!!message.description}
      type={message.type}
      style={style}
    >
      { toastIcons[message.type || 'info'] }
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
}

type ContainerProps = {
  type?: 'success' | 'error' | 'info';
  hasDescription?: boolean;
};

const toastTypes = {
  info: css`
    background-color: #EBf8ff;
    color: #4172b7;
  `,
  success: css`
    background: #E6FFFA;
    color: #2E656A;
  `,
  error: css`
    background: #fddede;
    color: #c53030;
  `,
}

const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  ${props => toastTypes[props.type || 'info']}

  > svg {
    margin: 4px
    12px 0 0
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    background: transparent;
    border: 0;
    color: inherit;
  }

  ${props => !props.hasDescription && css`
    align-items: center;

    svg {
      margin-top: 0;
    }
  `}


  & + div {
    margin-top: 8px;
  }
`;

export default Toast;