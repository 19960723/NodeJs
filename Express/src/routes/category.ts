/**
 * @swagger
 * tags:
 *   name: Category
 *   description: 分類管理接口
 */

/**
 * @swagger
 * /api/category/all:
 *   get:
 *     summary: 獲取所有分類（不分頁）
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: 成功返回全部分類列表
 */

/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: 分頁獲取分類列表
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: 頁碼（默認 1）
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: 每頁數量（默認 10）
 *     responses:
 *       200:
 *         description: 分頁結果
 */

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: 新增分類
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               sort:
 *                 type: integer
 *     responses:
 *       201:
 *         description: 創建成功
 *       400:
 *         description: 請求資料錯誤
 *       409:
 *         description: 名稱已存在
 */

/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     summary: 修改分類
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要修改的分類 ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               sort:
 *                 type: integer
 *     responses:
 *       200:
 *         description: 修改成功
 *       404:
 *         description: 找不到分類
 */

/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     summary: 刪除分類
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: 要刪除的分類 ID
 *     responses:
 *       200:
 *         description: 刪除成功
 *       404:
 *         description: 分類不存在
 */

import express from 'express'
import {
    getAllCategories,
    getCategoryList,
    createCategory,
    updateCategory,
    deleteCategory
} from '../controllers/category'

const router = express.Router()

router.get('/all', getAllCategories)         // 無分頁全部列表
router.get('/', getCategoryList)             // 分頁列表
router.post('/', createCategory)             // 新增
router.put('/:id', updateCategory)           // 修改
router.delete('/:id', deleteCategory)        // 刪除

export default router