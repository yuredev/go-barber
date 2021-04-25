import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

export default usersRouter;
