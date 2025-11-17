import Router from 'koa-router';
import {
  getDictList,
  getDictById,
  createDict,
  updateDict,
  deleteDict,
  getDictDataList,
  getDictDataById,
  createDictData,
  updateDictData,
  deleteDictData
} from '../controllers/sysController';
const router = new Router({ prefix: '/api/sys' });

router.get('/dict', ...getDictList); // 获取字典列表
router.get('/dict/:id', ...getDictById); // 获取字典详情
router.post('/dict', ...createDict); // 创建字典
router.put('/dict/:id', ...updateDict); // 更新字典
router.delete('/dict/:id', ...deleteDict); // 删除字典

router.get('/dict-data', ...getDictDataList); // 获取字典数据列表
router.get('/dict-data/:id', ...getDictDataById); // 获取字典数据详情
router.post('/dict-data', ...createDictData); // 创建字典数据
router.put('/dict-data/:id', ...updateDictData); // 更新字典数据
router.delete('/dict-data/:id', ...deleteDictData); // 删除字典数据
export default router;
