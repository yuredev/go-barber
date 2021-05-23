import logoImg from '../assets/logo.svg';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import Button from '../components/Button';
import Input from '../components/Input';
import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../assets/sign-in-background.png';
import React, { FormEvent, useCallback, useRef, useState } from 'react';
import getValidationErrors from '../utils/getValidationErrors';
import * as Yup from 'yup';
import { Data, SignInCredentials } from '../interfaces';
import { useAuth } from '../hooks/auth';
import RequestError from '../errors/RequestError';
import { useToast } from '../hooks/toast';
import { Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Data | null>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const validateForm = useCallback(async () => {
    setErrors(null);
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email format')
        .required('E-mail is required'),
      password: Yup.string().required('Password is required'),
    });
    const inputs = formRef.current?.querySelectorAll('input');

    const data: Data = {};

    inputs?.forEach((input) => {
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
        await signIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);
          setErrors(validationErrors);
          return;
        } else if (error instanceof RequestError) {
          addToast({
            type: 'error',
            title: 'Authentication error',
            description:
              'An error has occurred during login, check the credentials.',
          });
          return;
        }
        addToast({
          type: 'error',
          title: 'Unexpected error',
          description: 'Sorry, an error has occurred during login.',
        });
      }
    },
    [validateForm, signIn, addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
            <Link to="forgot">Forgot Password?</Link>
          </form>
          <Link to="/signup">
            <FiLogIn />
            Create account
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  /*
    dev: "senhor place-content você alinha na verical ou na horizontal?" 
    place-content: "SIM"
  */
  display: flex;
  flex-direction: column;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromLeftAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromLeftAnimation} 1s;

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
