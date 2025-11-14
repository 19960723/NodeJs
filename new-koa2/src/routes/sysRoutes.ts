import Router from 'koa-router';
import {
  getDictList,
  getDictById,
  createDict,
  updateDict,
  deleteDict
} from '../controllers/sysController';
const router = new Router({ prefix: '/api/sys' });

router.get('/dict', ...getDictList); // 获取字典列表
router.get('/dict/:id', ...getDictById); // 获取字典详情
router.post('/dict', ...createDict); // 创建字典
router.put('/dict/:id', ...updateDict); // 更新字典
router.delete('/dict/:id', ...deleteDict); // 删除字典
export default router;
