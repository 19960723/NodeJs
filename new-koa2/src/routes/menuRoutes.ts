import Router from 'koa-router';
import { menuAll } from '../controllers/menuController';

const router = new Router({ prefix: '/api' });

router.post('/menu/all', ...menuAll);

export default router;
