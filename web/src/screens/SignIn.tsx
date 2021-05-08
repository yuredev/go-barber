import logoImg from '../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Button from '../components/Button';
import Input from '../components/Input';
import styled from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../assets/sign-in-background.png';
import { FormEvent, useCallback, useRef, useState } from 'react';
import getValidationErrors from '../utils/getValidationErrors';
import * as Yup from 'yup';
import { Errors, SignInCredentials } from '../interfaces';
import  { useAuth } from '../hooks/AuthContext';
import RequestError from '../errors/RequestError';

function SignIn() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors | null>(null) ;
  const { signIn } = useAuth();

  const validateForm = useCallback(async () => {
    setErrors(null);
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .required('E-mail is required'),
      password: Yup.string().required('Password is required'),
    });
    const inputs = formRef.current?.querySelectorAll('input');

    const data: Errors = {};

    inputs?.forEach(input => {
      data[input.name] = input.value;
    });

    await schema.validate(data, {
      // retorna todos os erros de uma vez ao inves de retornar o primeiro erro
      abortEarly: false,
    });

    const credentials = { ...data } as any as SignInCredentials;
    return credentials;
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        const { email, password } = await validateForm();
        await signIn({email, password});
      } catch (error) {
        if (error instanceof RequestError) {
          alert(error.message);
          return;
        }
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    },
    [validateForm, signIn]
  );

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form onSubmit={handleSubmit} ref={formRef}>
          <h1>Log in to your account</h1>
          <Input
            icon={FiMail}
            name="email"
            placeholder="Email"
            error={errors?.email}
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Password"
            type="Password"
            error={errors?.password}
          />
          <Button type="submit">Sign In</Button>
          <a href="forgot">Forgot Password?</a>
        </form>
        <a href="forgot">
          <FiLogIn />
          Create account
        </a>
      </Content>
      <Background />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /*
    dev: "senhor place-content você alinha na verical ou na horizontal?" 
    place-content: "SIM"
  */
  place-content: center;
  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  /* somente <a> que tiver dentro de Content */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }

    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }
`;

const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;

export default SignIn;
