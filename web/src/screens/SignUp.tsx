import logoImg from '../assets/logo.svg';
import { FiArrowLeft, FiLock, FiUser, FiMail } from 'react-icons/fi';
import Button from '../components/Button';
import Input from '../components/Input';
import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackground from '../assets/sign-up-background.png';
import { FormEvent, useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Errors } from '../interfaces';
import getValidationErrors from '../utils/getValidationErrors';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors | null>(null);

  const validateForm = useCallback(async () => {
    setErrors(null);
    const schema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('E-mail is required'),
      password: Yup.string().min(6, 'Minimum of 6 characters'),
    });
    const inputs = formRef.current?.querySelectorAll('input');

    const data: Errors = {};

    inputs?.forEach((input) => {
      data[input.name] = input.value;
    });

    await schema.validate(data, {
      // retorna todos os erros de uma vez ao inves de retornar o primeiro erro
      abortEarly: false,
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      try {
        await validateForm();
      } catch (error) {
        const validationErrors = getValidationErrors(error);
        setErrors(validationErrors);
      }
    },
    [validateForm]
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <form onSubmit={handleSubmit} ref={formRef}>
            <h1>Sign up to GoBarber</h1>
            <Input
              icon={FiUser}
              name="name"
              placeholder="Name"
              error={errors?.name}
            />
            <Input
              icon={FiMail}
              name="email"
              placeholder="Email"
              error={errors?.email}
            />
            <Input
              error={errors?.password}
              icon={FiLock}
              name="password"
              placeholder="Password"
              type="Password"
            />
            <Button type="submit">Sign Up</Button>
          </form>
          <Link to="/">
            <FiArrowLeft />
            Back to logon
          </Link>
        </AnimationContainer>
      </Content>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRightAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
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

  animation: ${appearFromRightAnimation} 1s;

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
  a {
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
  background: url(${signUpBackground}) no-repeat center;
  background-size: cover;
`;

export default SignUp;
