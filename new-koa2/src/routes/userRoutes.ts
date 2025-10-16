import Router from 'koa-router';
import {
  login,
  register,
  getUser,
  deleteUser,
  updateUser,
  getUserById
} from '../controllers/userController';
import { auth } from '../middleware/auth';
const router = new Router({ prefix: '/api/user' });

router.post('/login', ...login);
router.post('/register', ...register);
router.get('/', auth, ...getUser);
router.get('/:id', auth, ...getUserById);
router.delete('/:id', auth, ...deleteUser);
router.put('/:id', auth, ...updateUser);
export default router;
