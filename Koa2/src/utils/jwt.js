const jwt = require('jsonwebtoken');
const logger = require('./logger');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * 生成访问令牌
 * @param {Object} payload - 用户信息
 * @returns {string} JWT token
 */
const generateAccessToken = payload => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
      issuer: 'koa2-app'
    });
  } catch (error) {
    logger.error('生成访问令牌失败:', error);
    throw error;
  }
};

/**
 * 生成刷新令牌
 * @param {Object} payload - 用户信息
 * @returns {string} JWT refresh token
 */
const generateRefreshToken = payload => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_REFRESH_EXPIRES_IN,
      issuer: 'koa2-app'
    });
  } catch (error) {
    logger.error('生成刷新令牌失败:', error);
    throw error;
  }
};

/**
 * 验证令牌
 * @param {string} token - JWT token
 * @returns {Object} 解码后的用户信息
 */
const verifyToken = token => {
  try {
    return jwt.verify(token, JWT_SECRET, { issuer: 'koa2-app' });
  } catch (error) {
    logger.warn('令牌验证失败:', error.message);
    throw error;
  }
};

/**
 * 解码令牌（不验证签名）
 * @param {string} token - JWT token
 * @returns {Object} 解码后的信息
 */
const decodeToken = token => {
  try {
    return jwt.decode(token);
  } catch (error) {
    logger.warn('令牌解码失败:', error.message);
    throw error;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken
};
