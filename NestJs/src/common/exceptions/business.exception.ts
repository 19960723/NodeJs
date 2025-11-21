import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ErrorCode,
  ErrorCodeToHttpStatus,
  ErrorCodeToMessage,
} from '../constants/error-codes';

/**
 * 业务异常类
 * 用于抛出业务逻辑相关的异常
 */
export class BusinessException extends HttpException {
  public readonly errorCode: number;

  constructor(
    message: string,
    errorCode: number = ErrorCode.BUSINESS_ERROR,
    httpStatus?: number,
  ) {
    const status =
      httpStatus || ErrorCodeToHttpStatus[errorCode] || HttpStatus.BAD_REQUEST;
    super(
      {
        errorCode,
        message,
      },
      status,
    );
    this.errorCode = errorCode;
  }

  /**
   * 根据错误码创建业务异常
   */
  static fromErrorCode(
    errorCode: number,
    customMessage?: string,
  ): BusinessException {
    const message =
      customMessage || ErrorCodeToMessage[errorCode] || '业务错误';
    return new BusinessException(message, errorCode);
  }
}

/**
 * 常用业务异常快捷方法
 */
export class BusinessError {
  /**
   * 根据错误码抛出异常
   */
  static throw(errorCode: number, customMessage?: string): never {
    throw BusinessException.fromErrorCode(errorCode, customMessage);
  }

  /**
   * 参数错误
   */
  static badRequest(message: string = '请求参数错误'): never {
    throw new BusinessException(message, ErrorCode.INVALID_PARAMS);
  }

  /**
   * 未授权
   */
  static unauthorized(message: string = '未授权，请先登录'): never {
    throw new BusinessException(message, ErrorCode.UNAUTHORIZED);
  }

  /**
   * 禁止访问
   */
  static forbidden(message: string = '禁止访问'): never {
    throw new BusinessException(message, ErrorCode.FORBIDDEN);
  }

  /**
   * 资源不存在
   */
  static notFound(message: string = '资源不存在'): never {
    throw new BusinessException(message, ErrorCode.NOT_FOUND);
  }

  /**
   * 冲突错误（如唯一性冲突）
   */
  static conflict(message: string = '资源冲突'): never {
    throw new BusinessException(message, ErrorCode.CONFLICT);
  }

  /**
   * 服务器内部错误
   */
  static internalError(message: string = '服务器内部错误'): never {
    throw new BusinessException(message, ErrorCode.UNKNOWN_ERROR);
  }

  /**
   * 用户相关错误
   */
  static userNotFound(message?: string): never {
    throw BusinessException.fromErrorCode(ErrorCode.USER_NOT_FOUND, message);
  }

  static userAlreadyExists(message?: string): never {
    throw BusinessException.fromErrorCode(
      ErrorCode.USER_ALREADY_EXISTS,
      message,
    );
  }

  static userDisabled(message?: string): never {
    throw BusinessException.fromErrorCode(ErrorCode.USER_DISABLED, message);
  }

  /**
   * Token 相关错误
   */
  static tokenExpired(message?: string): never {
    throw BusinessException.fromErrorCode(ErrorCode.TOKEN_EXPIRED, message);
  }

  static tokenInvalid(message?: string): never {
    throw BusinessException.fromErrorCode(ErrorCode.TOKEN_INVALID, message);
  }

  static refreshTokenInvalid(message?: string): never {
    throw BusinessException.fromErrorCode(
      ErrorCode.REFRESH_TOKEN_INVALID,
      message,
    );
  }

  /**
   * 权限相关错误
   */
  static insufficientPermissions(message?: string): never {
    throw BusinessException.fromErrorCode(
      ErrorCode.INSUFFICIENT_PERMISSIONS,
      message,
    );
  }

  static roleNotFound(message?: string): never {
    throw BusinessException.fromErrorCode(ErrorCode.ROLE_NOT_FOUND, message);
  }

  static permissionNotFound(message?: string): never {
    throw BusinessException.fromErrorCode(
      ErrorCode.PERMISSION_NOT_FOUND,
      message,
    );
  }
}
