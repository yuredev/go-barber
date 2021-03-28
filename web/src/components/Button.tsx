import { shade } from 'polished';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <Container type="button" {...rest}>
      <button>{children}</button>
    </Container>
  );
}

const Container = styled.button`
  color: #312e38;
  background: #ff9000;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  button {
    border: 0;
    background: transparent;
  }

  &:hover {
    /* escurecer 20% */
    background: ${shade(0.2, '#ff9000')};
  }
`;
