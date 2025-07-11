import { Router  } from 'express'
import { login, getAllUsers, createUser } from '../controllers/user'
const router = Router();

router.post('/login', login)
router.get('/getAllUsers', getAllUsers)
router.post('/createUser', createUser)

export default router;