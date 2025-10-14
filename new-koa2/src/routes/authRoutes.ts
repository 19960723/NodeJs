import Router from 'koa-router';
import { login, refresh, logout, codes } from '../controllers/authController';

const router = new Router({ prefix: '/api' });

router.post('/auth/login', ...login);
router.post('/auth/refresh', ...refresh);
router.post('/auth/logout', ...logout);
router.post('/auth/codes', ...codes);

export default router;
