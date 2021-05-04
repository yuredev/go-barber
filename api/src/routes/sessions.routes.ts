import { Router } from 'express';
import AuthUserService from '../services/AuthUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authUser = new AuthUserService();

  const { user, token } = await authUser.run({ email, password });

  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
