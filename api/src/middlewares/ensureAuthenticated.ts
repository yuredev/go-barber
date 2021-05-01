import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {

    // validar o token enviado
    // se a validação for ok, o verify vai retornar o payload
    const decoded = verify(token, authConfig.jwt.secret) as TokenPayload;
    // printa:
    // iat: quando o token foi gerado
    // exp: quando que o token expira
    // sub: o que identifica o usuário
    console.log(decoded);

    const { exp, iat, sub } = decoded;

    req.user = {
      id: sub,
    }

    return next();
    // no typescript dá pra omitir o parametro recebido do catch
  } catch {
    throw new Error('Invalid JWT token');
  }
}
