import { Router  } from 'express'
import { getList } from '../controllers/app'
const router = Router();

router.get('/getList', getList)

export default router;