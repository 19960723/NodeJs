import Router from 'koa-router';
import { login, register } from '../controllers/userController';
const router = new Router({ prefix: '/api' });

router.post('/user/login', ...login);
router.post('/user/register', ...register);
export default router;
