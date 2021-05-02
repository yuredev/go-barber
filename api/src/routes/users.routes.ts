import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuth from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createUser = new CreateUserService();

    const user = await createUser.run({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});
// upload de arquivo único, no single passamos o nome do campo, mas pode ser qualquer nome
usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.run({
        avatarFileName: req.file.filename,
        userId: req.user.id,
      });

      delete user.password;

      return res.json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
);

export default usersRouter;
