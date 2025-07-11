import { Request, Response, NextFunction } from 'express'
import { successResponse } from '../utils/response';
import prisma from '../services/prisma';

/** GET /api/categories/all — 全部分類（不分頁） */
export const getAllCategories = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.category.findMany({
            orderBy: [{ sort: 'asc' }, { id: 'desc' }]
        })
        successResponse(res, data, "查询成功")
    } catch (error) {
        res.status(500).json({ error: '查詢失敗' })
    }
}

/** GET /api/categories — 分頁查詢 page pageSize */
export const getCategoryList = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1
    const pageSize = parseInt(req.query.pageSize as string) || 10
    try {
        const [list, total] = await Promise.all([
            prisma.category.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: [{ sort: 'asc' }, { id: 'desc' }]
            }),
            prisma.category.count()
        ])
        res.json({ list, total, page, pageSize })
    } catch (error) {
        res.status(500).json({ error: '查詢分類失敗' })
    }
}

/** POST /api/categories — 新增分類 */
export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name, sort } = req.body
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: '分類名稱不能為空' })
    }
    try {
        const exists = await prisma.category.findUnique({ where: { name } })
        if (exists) return res.status(409).json({ error: '名稱已存在' })
        const created = await prisma.category.create({
            data: { name: name.trim(), sort: typeof sort === 'number' ? sort : 0 }
        })
        res.status(201).json(created)
    } catch (error) {
        res.status(500).json({ error: '新增分類失敗' })
    }
}

/** PUT /api/categories/:id — 編輯分類 */
export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    const { name, sort } = req.body
    if (isNaN(id)) return res.status(400).json({ error: 'ID 無效' })
    if (name && typeof name !== 'string') {
        return res.status(400).json({ error: '名稱格式錯誤' })
    }
    if (sort !== undefined && typeof sort !== 'number') {
        return res.status(400).json({ error: '排序應為數字' })
    }
    try {
        const existing = await prisma.category.findUnique({ where: { id } })
        if (!existing) return res.status(404).json({ error: '分類不存在' })
        if (name) {
            const duplicate = await prisma.category.findUnique({ where: { name } })
            if (duplicate && duplicate.id !== id) {
                return res.status(409).json({ error: '名稱重複' })
            }
        }
        const updated = await prisma.category.update({
            where: { id },
            data: {
                ...(name ? { name: name.trim() } : {}),
                ...(sort !== undefined ? { sort } : {})
            }
        })
        res.json(updated)
    } catch (error) {
        res.status(500).json({ error: '更新失敗' })
    }
}

/** DELETE /api/categories/:id — 刪除分類 */
export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    if (isNaN(id)) return res.status(400).json({ error: 'ID 無效' })
    try {
        const exist = await prisma.category.findUnique({ where: { id } })
        if (!exist) return res.status(404).json({ error: '分類不存在' })

        await prisma.category.delete({ where: { id } })
        res.json({ message: '刪除成功' })
    } catch (error) {
        res.status(500).json({ error: '刪除分類失敗' })
    }
}