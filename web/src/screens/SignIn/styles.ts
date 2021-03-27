import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
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

    input {
      color: #FFF;
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;

      /* todo input que seja depois de outro */
      /* o caracter & aponta pra o mesmo seletor usado nele */
      /* neste caso só input */
      & + input {
        margin-top: 8px;
      }
    }

    button {
      color: #312e38;
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0;
      padding: 0 16px;
      width: 100%;
      font-weight: 500;
      margin-top: 16px;
      transition: background-color .2s;

      &:hover {
        /* escurecer 20% */
        background: ${shade(0.2, '#ff9000')}
      }
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color .2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')}
      }
    }
  }
  /* somente <a> que tiver dentro de Content */
  > a {
    color: #ff9000;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color .2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')}
    }

    display: flex;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`
