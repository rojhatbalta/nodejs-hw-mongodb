import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';

const routerAuth = Router();
routerAuth.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
routerAuth.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
routerAuth.post('/refresh', ctrlWrapper(refreshUserSessionController));
routerAuth.post('/logout', ctrlWrapper(logoutUserController));

export default routerAuth;
