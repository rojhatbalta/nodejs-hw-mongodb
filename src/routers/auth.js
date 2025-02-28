import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registerUserSchema,
  resetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  resetEmailController,
  resetPasswordController,
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
routerAuth.post(
  '/send-reset-email',
  validateBody(resetEmailSchema),
  ctrlWrapper(resetEmailController),
);
routerAuth.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default routerAuth;
