import { getRepository } from "typeorm";
import User from "../models/User";
import { join } from 'path';
import uploadConfig from '../config/upload';
// traz as coisas do fs porem tudo com formato de promise
import { promises as fs} from 'fs';
import AppError from "../errors/AppError";

interface Request {
  userId: string;
  avatarFileName: string;
}


export default class UpdateUserAvatarService {
  public async run({userId, avatarFileName}: Request): Promise<User> {
    const userRepo = getRepository(User);

    const userFound = await userRepo.findOne(userId);

    if (!userFound) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (userFound.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, userFound.avatar);
      // o stat traz informações sobre o arquivo, mas só traz as informações se o arquivo existir
      const didTheAvatarFileExists = await fs.stat(userAvatarFilePath);

      // se não existir ele não traz as informações e o result vem undefined assim o if abaixo checa se existe
      if (didTheAvatarFileExists) {
        // unlink deleta arquivos
        await fs.unlink(userAvatarFilePath);
      }
    }
    userFound.avatar = avatarFileName;

    // podemos passar direto pro save um objeto
    // porque o save consegue diferenciar quando é pra salvar e quando é pra atualizar
    // se o user tiver um id é pra atualizar, caso contrário é pra criar um novo
    await userRepo.save(userFound);

    return userFound;
  }
}
