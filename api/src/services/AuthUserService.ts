import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';
import authConfig from '../config/auth';

interface Auth {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthUserService {
  public async run({ email, password }: Auth): Promise<Response> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    // password é a senha não criptografada
    // user.password é a senha criptografada
    const didThePasswordsMatch = await compare(password, user.password);

    if (!didThePasswordsMatch) {
      throw new Error('Incorrect email/password combination.');
    }

    // gerar JWT
    // primeiro parametro: permissões do usuário e os dados do payload (fica criptografado, mas não é seguro)
    // segundo parametro: hash única que deve ser conhecida apenas pelo backend, podemos por exemplo usar o md5 online que é um site que gera hashs
    // terceiro parametro: configuraçẽos do token
    const token = sign({}, authConfig.jwt.secret, {
      // subject tem de ser o que identifica o usuário
      subject: user.id,
      // tempo de expiração do token, ou seja o tempo que o user ficará logado
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    }

  }
}

export default AuthUserService;
