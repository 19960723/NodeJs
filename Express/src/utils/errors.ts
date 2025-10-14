export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, true);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '认证失败') {
    super(401, message, true);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = '没有权限') {
    super(403, message, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源不存在') {
    super(404, message, true);
  }
}
