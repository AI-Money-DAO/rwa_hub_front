// Core utilities
export * from './utils';
export * from './config';
export * from './constants';
export * from './validations';
export * from './errors';
export * from './logger';

// API client
export { apiClient } from './api';
export { default as api } from './api';

// Re-export commonly used utilities for convenience
export {
  cn,
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPoints,
  truncateText,
  generateId,
  debounce,
  throttle,
  getFromStorage,
  setToStorage,
  removeFromStorage,
} from './utils';

export {
  config,
  apiConfig,
  authConfig,
  paginationConfig,
  uploadConfig,
  chatConfig,
  taskConfig,
  pointsConfig,
  devConfig,
} from './config';

export {
  TASK_STATUS,
  TASK_STATUS_LABELS,
  USER_ROLES,
  API_CODES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
} from './constants';

export {
  loginSchema,
  registerSchema,
  updateProfileSchema,
  changePasswordSchema,
  createTaskSchema,
  submitTaskSchema,
  chatMessageSchema,
  validatePassword,
  validateUsername,
} from './validations';

export {
  AppError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  NetworkError,
  getErrorMessage,
  getErrorCode,
  logError,
  withRetry,
} from './errors';

export {
  logger,
  apiLogger,
  authLogger,
  taskLogger,
  chatLogger,
  uiLogger,
  logPerformance,
  logUserAction,
  logAuthEvent,
  logTaskOperation,
  logChatEvent,
} from './logger';
