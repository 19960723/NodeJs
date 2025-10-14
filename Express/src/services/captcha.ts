/**
 * 验证码服务
 * 生成和验证图形验证码
 */

import * as svgCaptcha from "svg-captcha";
import { redisService } from "./redis";
import { logger } from "../utils/logger";

export interface CaptchaResult {
  captchaId: string;
  captchaSvg: string;
}

export class CaptchaService {
  private static readonly CAPTCHA_PREFIX = "captcha:";
  private static readonly CAPTCHA_EXPIRES = 300; // 5分钟过期

  /**
   * 生成验证码
   * @returns 验证码ID和SVG内容
   */
  static async generateCaptcha(): Promise<CaptchaResult> {
    try {
      // 生成验证码
      const captcha = svgCaptcha.create({
        size: 4, // 验证码长度
        ignoreChars: "0o1iIl", // 忽略容易混淆的字符
        noise: 2, // 干扰线数量
        color: true, // 彩色验证码
        background: "#f0f0f0", // 背景色
        width: 120,
        height: 40,
        fontSize: 50,
      });

      // 生成唯一ID
      const captchaId = this.generateCaptchaId();

      // 存储验证码到Redis（转为小写存储，验证时不区分大小写）
      const cacheKey = `${this.CAPTCHA_PREFIX}${captchaId}`;
      await redisService.set(
        cacheKey,
        captcha.text.toLowerCase(),
        this.CAPTCHA_EXPIRES
      );

      logger.info(`验证码生成成功: captchaId=${captchaId}`);

      return {
        captchaId,
        captchaSvg: captcha.data,
      };
    } catch (error) {
      logger.error("验证码生成失败:", error);
      throw new Error("验证码生成失败");
    }
  }

  /**
   * 验证验证码
   * @param captchaId 验证码ID
   * @param inputCode 用户输入的验证码
   * @returns 验证结果
   */
  static async verifyCaptcha(
    captchaId: string,
    inputCode: string
  ): Promise<boolean> {
    try {
      if (!captchaId || !inputCode) {
        return false;
      }

      const cacheKey = `${this.CAPTCHA_PREFIX}${captchaId}`;
      const storedCode = await redisService.get<string>(cacheKey);

      if (!storedCode) {
        logger.warn(`验证码已过期或不存在: captchaId=${captchaId}`);
        return false;
      }

      // 验证通过后删除验证码（一次性使用）
      await redisService.del(cacheKey);

      // 不区分大小写比较
      const isValid = storedCode === inputCode.toLowerCase();

      if (isValid) {
        logger.info(`验证码验证成功: captchaId=${captchaId}`);
      } else {
        logger.warn(
          `验证码验证失败: captchaId=${captchaId}, expected=${storedCode}, actual=${inputCode.toLowerCase()}`
        );
      }

      return isValid;
    } catch (error) {
      logger.error("验证码验证出错:", error);
      return false;
    }
  }

  /**
   * 生成验证码ID
   * @returns 唯一的验证码ID
   */
  private static generateCaptchaId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}_${random}`;
  }

  /**
   * 清理过期的验证码
   */
  static async cleanExpiredCaptchas(): Promise<void> {
    try {
      // Redis的过期机制会自动清理，这里可以添加额外的清理逻辑
      logger.info("验证码清理任务执行完成");
    } catch (error) {
      logger.error("验证码清理失败:", error);
    }
  }
}

// 导出默认实例
export const captchaService = CaptchaService;
