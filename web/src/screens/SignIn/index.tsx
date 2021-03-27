import { Container, Background, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';

function SignIn() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber"/>
        <form>
          <h1>Log in to your account</h1>
          <input placeholder="Email" />
          <input placeholder="Senha" type="Password" />
          <button type="submit">Log In</button>
          <a href="forgot">Forgot Password?</a>
        </form>
        <a href="forgot">
          <FiLogIn />
          Create account
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn;
