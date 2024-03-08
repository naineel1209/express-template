import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/auth.middlewares';

const router = Router({ mergeParams: true });

//Path - /auth
router
  .post('/register', registerUser)
  .post('/login', loginUser)
  .get('/logout', isAuthenticated, logoutUser)

export default router;