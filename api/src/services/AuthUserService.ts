import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import User from '../models/User';

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
    // primeiro parametro: permissões e os dados do payload
    // segundo parametro: hash única que deve ser conhecida apenas pelo backend
    // hash gerada no md5 online
    // terceiro parametro: configuraçẽos do token
    const token = sign({}, '0357457da27598df2f1796e0bfeb0920', {
      // subject tem de ser o que identifica o usuário
      subject: user.id,
      // tempo de expiração do token, ou seja o tempo que o user ficará logado
      expiresIn: '1d',
    });

    return {
      user,
      token,
    }

  }
}

export default AuthUserService;
