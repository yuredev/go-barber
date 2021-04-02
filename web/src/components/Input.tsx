import { useCallback, useState } from 'react';
import { IconType } from 'react-icons';
import styled, { css } from 'styled-components';
import { orange } from '../styles/global';
import { FiAlertCircle } from 'react-icons/fi';
import Tooltip from './Tooltip';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: IconType;
  error?: string;
}

// o react não permite usar icon no minisculo ja que ele é um componente
// assim o icon: Icon converte
export default function Input({ icon: Icon, error, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // o useCallback deve sempre ser utilizado para a função não precisar ser
  // redeclarada toda vez que o estado for atualizado
  // o segundo parametro do useCallback são
  // valores onde a função vai ser redeclarada caso
  // um desses valores seja mudado, parecido com o useEffect
  const handleInputBlur = useCallback(({ target }) => {
    setIsFocused(false);
    // o !! transforma em boleano
    // ou seja, se tiver texto vira true, senao vira false
    setIsFilled(!!target.value);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container hasError={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        {...rest}
        onFocus={handleInputFocus}
        // quando desfoca
        onBlur={handleInputBlur}
      />
      {error && (
				<Error title={error}>
					<FiAlertCircle  color='#c53030' size={20} />
				</Error>
			)}
    </Container>
  );
}

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
  isFilled: boolean;
}

const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;

  /* o seletor & aponta pra o seletor pai de onde ele está */
  /* neste caso a div, ou seja a div que for depois de outra */
  & + & {
    margin-top: 8px;
  }
  svg {
    color: #666360;
    margin-right: 16px;
  }

	${({ hasError }) =>
    hasError &&
    css`
      border-color: #c53030;
    `}	

  /* só renderiza o component caso a prop isFocused seja true */
  ${(props) =>
    props.isFocused &&
    css`
      color: ${orange};
      border-color: ${orange};
    `}

  ${({ isFilled, isFocused }) =>
    (isFilled || isFocused) &&
    css`
      svg {
        color: ${orange};
      }
    `}
	
	input {
    color: #f4ede8;
    flex: 1;
    border: 0;
    background: transparent;

    ::placeholder {
      color: #666360;
    }
  }
`;

// estilizando componentes que foram importados...
const Error = styled(Tooltip)`
	height: 20px;
	margin-left: 16px;
	svg {
		margin: 0;
	}

	span {
		background: #c53030;
		color: #fff;
		&::before {
			border-color: #c53030 transparent;
		}
	}

`;
