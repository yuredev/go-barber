import { IconType } from 'react-icons';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: IconType;
}

// o react não permite usar icon no minisculo ja que ele é um componente
// assim o icon: Icon converte
export default function Input({ icon: Icon, ...rest }: InputProps) {
  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  );
}

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  /* todo input que seja depois de outro */
  /* o caracter & aponta pra o mesmo seletor usado nele */
  /* neste caso só input */
  input {
    color: #f4ede8;
    flex: 1;
    border: 0;
    background: transparent;
    
    ::placeholder {
      color: #666360;
    }
  }
  & + & {
    margin-top: 8px;
  }
  svg {
    color: #666360;
    margin-right: 16px;
  }
`;
