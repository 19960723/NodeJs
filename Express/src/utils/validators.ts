import { body, ValidationChain } from 'express-validator';

export const loginValidation: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .trim(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码至少6个字符')
];

export const registerValidation: ValidationChain[] = [
  body('username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .trim(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('密码至少6个字符'),
  body('phone')
    .notEmpty()
    .withMessage('手机号不能为空')
    .matches(/^1[3-9]\d{9}$/)
    .withMessage('请输入有效的手机号')
];

export const updateUserValidation: ValidationChain[] = [
  body('nickname')
    .optional()
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage('昵称长度应在2-20个字符之间'),
  body('phone')
    .optional()
    .matches(/^1[3-9]\d{9}$/)
    .withMessage('请输入有效的手机号'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('请输入有效的邮箱地址')
];
