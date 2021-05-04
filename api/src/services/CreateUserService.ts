import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async run({ name, email, password }: Request): Promise<User> {
    const repository = getRepository(User);
    const userFound = await repository.findOne({
      where: { email },
    });

    if (userFound) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({
      name,
      email,
      password: hashedPassword,
    });

    await repository.save(user);

    delete user.password;

    return user;
  }
}
