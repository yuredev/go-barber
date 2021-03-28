import logoImg from '../assets/logo.svg';
import { FiArrowLeft, FiLock, FiUser, FiMail } from 'react-icons/fi';
import Button from '../components/Button';
import Input from '../components/Input';
import styled from 'styled-components';
import { shade } from 'polished';
import signUpBackground from '../assets/sign-up-background.png';
import { FormEvent, useState } from 'react';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <form onSubmit={handleSubmit}>
          <h1>Sign up to GoBarber</h1>
          <Input
            icon={FiUser}
            name="name"
            placeholder="Name"
            onChange={({ target }) => setName(target.value)}
          />
          <Input
            icon={FiMail}
            name="email"
            placeholder="Email"
            onChange={({ target }) => setEmail(target.value)}
          />
          <Input
            icon={FiLock}
            name="password"
            placeholder="Password"
            type="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        <a href="forgot">
          <FiArrowLeft />
          Back to log on
        </a>
      </Content>
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
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
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
