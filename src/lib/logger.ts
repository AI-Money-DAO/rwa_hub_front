import { devConfig } from './config';

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

// Logger interface
interface Logger {
  error(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  debug(message: string, ...args: any[]): void;
}

// Logger implementation
class AppLogger implements Logger {
  private level: LogLevel;
  private context?: string;

  constructor(level = LogLevel.INFO, context?: string) {
    this.level = level;
    this.context = context;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.level;
  }

  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = this.context ? `[${this.context}]` : '';
    return `${timestamp} ${level} ${contextStr} ${message}`;
  }

  private log(
    level: LogLevel,
    levelName: string,
    message: string,
    ...args: any[]
  ): void {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(levelName, message);

    switch (level) {
      case LogLevel.ERROR:
        console.error(formattedMessage, ...args);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, ...args);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, ...args);
        break;
      case LogLevel.DEBUG:
        console.debug(formattedMessage, ...args);
        break;
    }
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, 'ERROR', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, 'WARN', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, 'INFO', message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, ...args);
  }

  // Create a child logger with additional context
  child(context: string): AppLogger {
    const childContext = this.context ? `${this.context}:${context}` : context;
    return new AppLogger(this.level, childContext);
  }
}

// Create default logger instance
const getLogLevel = (): LogLevel => {
  if (process.env.NODE_ENV === 'production') {
    return LogLevel.WARN;
  }

  if (devConfig.enableDebugLogs) {
    return LogLevel.DEBUG;
  }

  return LogLevel.INFO;
};

export const logger = new AppLogger(getLogLevel());

// Specialized loggers for different parts of the application
export const apiLogger = logger.child('API');
export const authLogger = logger.child('AUTH');
export const taskLogger = logger.child('TASK');
export const chatLogger = logger.child('CHAT');
export const uiLogger = logger.child('UI');

// Performance logging utilities
export function logPerformance(name: string, fn: () => void): void;
export function logPerformance<T>(name: string, fn: () => T): T;
export function logPerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T>;
export function logPerformance<T>(
  name: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const start = performance.now();

  const logEnd = () => {
    const end = performance.now();
    logger.debug(`Performance: ${name} took ${(end - start).toFixed(2)}ms`);
  };

  try {
    const result = fn();

    if (result instanceof Promise) {
      return result.finally(logEnd);
    } else {
      logEnd();
      return result;
    }
  } catch (error) {
    logEnd();
    throw error;
  }
}

// API request/response logging
export function logApiRequest(method: string, url: string, data?: any): void {
  apiLogger.debug(`${method} ${url}`, data ? { data } : {});
}

export function logApiResponse(
  method: string,
  url: string,
  status: number,
  data?: any
): void {
  const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'debug';
  apiLogger[level](`${method} ${url} - ${status}`, data ? { data } : {});
}

// Error logging with context
export function logErrorWithContext(
  error: any,
  context: string,
  additionalData?: any
): void {
  logger.error(`Error in ${context}:`, {
    message: error?.message || error,
    stack: error?.stack,
    ...additionalData,
  });
}

// User action logging (for analytics/debugging)
export function logUserAction(action: string, data?: any): void {
  uiLogger.info(`User action: ${action}`, data);
}

// Authentication logging
export function logAuthEvent(
  event: string,
  userId?: string | number,
  data?: any
): void {
  authLogger.info(`Auth event: ${event}`, {
    userId,
    ...data,
  });
}

// Task operation logging
export function logTaskOperation(
  operation: string,
  taskId?: string | number,
  userId?: string | number,
  data?: any
): void {
  taskLogger.info(`Task operation: ${operation}`, {
    taskId,
    userId,
    ...data,
  });
}

// Chat logging
export function logChatEvent(
  event: string,
  sessionId?: string,
  data?: any
): void {
  chatLogger.info(`Chat event: ${event}`, {
    sessionId,
    ...data,
  });
}

// Development helpers
export function logComponentRender(componentName: string, props?: any): void {
  if (process.env.NODE_ENV === 'development' && devConfig.enableDebugLogs) {
    uiLogger.debug(`Rendering ${componentName}`, props);
  }
}

export function logHookCall(hookName: string, params?: any): void {
  if (process.env.NODE_ENV === 'development' && devConfig.enableDebugLogs) {
    uiLogger.debug(`Hook call: ${hookName}`, params);
  }
}

// Conditional logging based on environment
export const conditionalLogger = {
  development: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'development') {
      logger.debug(message, ...args);
    }
  },
  production: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV === 'production') {
      logger.info(message, ...args);
    }
  },
};

export default logger;
