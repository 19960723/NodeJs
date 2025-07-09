import { Router  } from 'express'
import { login } from '../controllers/user'
const router = Router();

router.post('/login', login)

export default router;