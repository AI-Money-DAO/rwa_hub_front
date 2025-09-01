import { API_CODES, ERROR_MESSAGES } from './constants';
import type { ApiError } from '@/types';

// Custom error classes
export class AppError extends Error {
  public readonly code: number;
  public readonly details?: any;

  constructor(message: string, code: number = API_CODES.ERROR, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, API_CODES.VALIDATION_ERROR, details);
    this.name = 'ValidationError';
  }
}

export class AuthenticationError extends AppError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, API_CODES.UNAUTHORIZED);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends AppError {
  constructor(message = ERROR_MESSAGES.FORBIDDEN) {
    super(message, API_CODES.FORBIDDEN);
    this.name = 'AuthorizationError';
  }
}

export class NotFoundError extends AppError {
  constructor(message = ERROR_MESSAGES.NOT_FOUND) {
    super(message, API_CODES.NOT_FOUND);
    this.name = 'NotFoundError';
  }
}

export class NetworkError extends AppError {
  constructor(message: string = ERROR_MESSAGES.NETWORK_ERROR) {
    super(message, API_CODES.SERVER_ERROR);
    this.name = 'NetworkError';
  }
}

// Error handling utilities
export function isAppError(error: any): error is AppError {
  return error instanceof AppError;
}

export function isNetworkError(error: any): boolean {
  return (
    error instanceof NetworkError ||
    error?.name === 'NetworkError' ||
    error?.code === 'NETWORK_ERROR' ||
    !navigator.onLine
  );
}

export function isAuthError(error: any): boolean {
  return (
    error instanceof AuthenticationError ||
    error instanceof AuthorizationError ||
    error?.code === API_CODES.UNAUTHORIZED ||
    error?.code === API_CODES.FORBIDDEN
  );
}

export function getErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.data?.message) {
    return error.data.message;
  }

  // Handle different error types
  if (isNetworkError(error)) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  if (error?.code === API_CODES.UNAUTHORIZED) {
    return ERROR_MESSAGES.UNAUTHORIZED;
  }

  if (error?.code === API_CODES.FORBIDDEN) {
    return ERROR_MESSAGES.FORBIDDEN;
  }

  if (error?.code === API_CODES.NOT_FOUND) {
    return ERROR_MESSAGES.NOT_FOUND;
  }

  if (error?.code === API_CODES.VALIDATION_ERROR) {
    return ERROR_MESSAGES.VALIDATION_ERROR;
  }

  if (error?.code === API_CODES.SERVER_ERROR) {
    return ERROR_MESSAGES.SERVER_ERROR;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function getErrorCode(error: any): number {
  if (error?.code && typeof error.code === 'number') {
    return error.code;
  }

  if (error?.status && typeof error.status === 'number') {
    return error.status;
  }

  if (isNetworkError(error)) {
    return API_CODES.SERVER_ERROR;
  }

  return API_CODES.ERROR;
}

export function createApiError(
  message: string,
  code: number = API_CODES.ERROR,
  details?: any
): ApiError {
  return {
    code,
    message,
    details,
  };
}

// Error logging utility
export function logError(error: any, context?: string): void {
  const errorInfo = {
    message: getErrorMessage(error),
    code: getErrorCode(error),
    context,
    timestamp: new Date().toISOString(),
    stack: error?.stack,
    details: error?.details,
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.error('Error logged:', errorInfo);
  }

  // In production, you might want to send to an error tracking service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    // sendToErrorTrackingService(errorInfo);
  }
}

// Retry utility for handling transient errors
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxAttempts = 3,
  delay = 1000,
  shouldRetry?: (error: any) => boolean
): Promise<T> {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on the last attempt
      if (attempt === maxAttempts) {
        break;
      }

      // Check if we should retry this error
      if (shouldRetry && !shouldRetry(error)) {
        break;
      }

      // Default retry logic: retry on network errors and 5xx status codes
      const shouldRetryDefault =
        isNetworkError(error) ||
        (error &&
          typeof error === 'object' &&
          'status' in error &&
          typeof error.status === 'number' &&
          error.status >= 500 &&
          error.status < 600);

      if (!shouldRetryDefault) {
        break;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError;
}

// Error boundary helper
export function handleErrorBoundary(error: Error, errorInfo: any): void {
  logError(error, 'ErrorBoundary');

  // You can also report to error tracking service here
  console.error('Error Boundary caught an error:', error, errorInfo);
}

// Form error handling
export function formatValidationErrors(errors: any): Record<string, string> {
  const formattedErrors: Record<string, string> = {};

  if (Array.isArray(errors)) {
    errors.forEach((error, index) => {
      formattedErrors[index.toString()] = error.message || error;
    });
  } else if (typeof errors === 'object' && errors !== null) {
    Object.keys(errors).forEach((key) => {
      const error = errors[key];
      if (Array.isArray(error)) {
        formattedErrors[key] = error[0]?.message || error[0] || 'Invalid value';
      } else {
        formattedErrors[key] = error?.message || error || 'Invalid value';
      }
    });
  }

  return formattedErrors;
}

// HTTP error handling
export function handleHttpError(response: Response): never {
  const status = response.status;

  switch (status) {
    case 400:
      throw new ValidationError('请求参数错误');
    case 401:
      throw new AuthenticationError();
    case 403:
      throw new AuthorizationError();
    case 404:
      throw new NotFoundError();
    case 422:
      throw new ValidationError('数据验证失败');
    case 500:
      throw new AppError(ERROR_MESSAGES.SERVER_ERROR, API_CODES.SERVER_ERROR);
    default:
      if (status >= 400 && status < 500) {
        throw new AppError(`客户端错误 (${status})`, status);
      } else if (status >= 500) {
        throw new AppError(`服务器错误 (${status})`, status);
      } else {
        throw new AppError(`未知错误 (${status})`, status);
      }
  }
}

// Safe async wrapper
export async function safeAsync<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<{ data?: T; error?: any }> {
  try {
    const data = await fn();
    return { data };
  } catch (error) {
    logError(error, 'safeAsync');
    return { error, data: fallback };
  }
}

// Safe sync wrapper
export function safeSync<T>(
  fn: () => T,
  fallback?: T
): { data?: T; error?: any } {
  try {
    const data = fn();
    return { data };
  } catch (error) {
    logError(error, 'safeSync');
    return { error, data: fallback };
  }
}
