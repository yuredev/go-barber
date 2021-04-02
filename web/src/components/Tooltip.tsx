import { ReactChild } from 'react';
import styled from 'styled-components';
import { orange } from '../styles/global';

interface TooltipProps {
  title: string;
  children: ReactChild;
  // é necessário para permitir estilização de um componente pai
  // uma vez que na estilização de componentes filhos 
  // é passada o atributo className para o componente filho
  className?: string;
}

export default function Tooltip({ title, children, className }: TooltipProps) {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  span {
    width: 175px;
    background: ${orange};
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity .4s;
    position: absolute;
    visibility: hidden;

    /* 100% = na mesma linha do topo */
    bottom: calc(100% + 12px);

    /* hack para centralizar */
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;
    &::before {
      content: '';
      border-style: solid;
      border-color: ${orange} transparent;
      border-width: 6px 6px 0px 6px;
      top: 100%;
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
