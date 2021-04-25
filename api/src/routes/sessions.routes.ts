import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';


const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authUser = new AuthUserService();

    const { user, token } = await authUser.run({ email, password });

    delete user.password;

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

export default sessionsRouter;
