import type { AppConfig } from '@/types';

// Environment variable validation and configuration
function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];

  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is required but not set`);
  }

  return value || defaultValue!;
}

function getBooleanEnvVar(name: string, defaultValue = false): boolean {
  const value = process.env[name];

  if (!value) return defaultValue;

  return value.toLowerCase() === 'true' || value === '1';
}

function getNumberEnvVar(name: string, defaultValue?: number): number {
  const value = process.env[name];

  if (!value) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is required but not set`);
    }
    return defaultValue;
  }

  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a valid number`);
  }

  return parsed;
}

// Application configuration
export const config: AppConfig = {
  appName: getEnvVar('NEXT_PUBLIC_APP_NAME', 'RWA Hub'),
  apiBaseUrl: getEnvVar('NEXT_PUBLIC_API_BASE_URL', 'http://127.0.0.1'),
  enableMockApi: getBooleanEnvVar('NEXT_PUBLIC_ENABLE_MOCK_API', false),
  jwtSecret: process.env.JWT_SECRET,
};

// API configuration
export const apiConfig = {
  baseUrl: config.apiBaseUrl,
  timeout: getNumberEnvVar('API_TIMEOUT', 10000), // 10 seconds default
  retryAttempts: getNumberEnvVar('API_RETRY_ATTEMPTS', 3),
  retryDelay: getNumberEnvVar('API_RETRY_DELAY', 1000), // 1 second default
};

// Authentication configuration
export const authConfig = {
  tokenKey: 'rwa_hub_token',
  refreshTokenKey: 'rwa_hub_refresh_token',
  tokenExpiry: getNumberEnvVar('JWT_EXPIRY', 24 * 60 * 60 * 1000), // 24 hours default
  refreshTokenExpiry: getNumberEnvVar(
    'JWT_REFRESH_EXPIRY',
    7 * 24 * 60 * 60 * 1000
  ), // 7 days default
};

// Pagination configuration
export const paginationConfig = {
  defaultPageSize: getNumberEnvVar('DEFAULT_PAGE_SIZE', 10),
  maxPageSize: getNumberEnvVar('MAX_PAGE_SIZE', 100),
  pageSizeOptions: [10, 20, 50, 100],
};

// File upload configuration
export const uploadConfig = {
  maxFileSize: getNumberEnvVar('MAX_FILE_SIZE', 5 * 1024 * 1024), // 5MB default
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'text/plain', 'application/msword'],
  uploadPath: getEnvVar('UPLOAD_PATH', '/uploads'),
};

// Chat configuration
export const chatConfig = {
  maxMessageLength: getNumberEnvVar('MAX_MESSAGE_LENGTH', 1000),
  maxSessionHistory: getNumberEnvVar('MAX_SESSION_HISTORY', 100),
  typingIndicatorDelay: getNumberEnvVar('TYPING_INDICATOR_DELAY', 1000),
  autoSaveInterval: getNumberEnvVar('AUTO_SAVE_INTERVAL', 30000), // 30 seconds
};

// Task configuration
export const taskConfig = {
  maxTasksPerUser: getNumberEnvVar('MAX_TASKS_PER_USER', 10),
  taskSubmissionTimeout: getNumberEnvVar(
    'TASK_SUBMISSION_TIMEOUT',
    7 * 24 * 60 * 60 * 1000
  ), // 7 days
  minTaskReward: getNumberEnvVar('MIN_TASK_REWARD', 1),
  maxTaskReward: getNumberEnvVar('MAX_TASK_REWARD', 10000),
};

// Points configuration
export const pointsConfig = {
  initialPoints: getNumberEnvVar('INITIAL_POINTS', 0),
  maxPointsPerTask: getNumberEnvVar('MAX_POINTS_PER_TASK', 1000),
  pointsHistoryLimit: getNumberEnvVar('POINTS_HISTORY_LIMIT', 1000),
};

// Development configuration
export const devConfig = {
  enableDebugLogs: getBooleanEnvVar(
    'ENABLE_DEBUG_LOGS',
    process.env.NODE_ENV === 'development'
  ),
  enableMockDelay: getBooleanEnvVar('ENABLE_MOCK_DELAY', true),
  mockApiDelay: getNumberEnvVar('MOCK_API_DELAY', 500), // 500ms default
};

// Validation helpers
export function validateConfig(): void {
  const requiredEnvVars = ['NEXT_PUBLIC_APP_NAME', 'NEXT_PUBLIC_API_BASE_URL'];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    );
  }

  // Validate API base URL format
  try {
    new URL(config.apiBaseUrl);
  } catch (error) {
    throw new Error(`Invalid API base URL: ${config.apiBaseUrl}`);
  }
}

// Initialize configuration validation (only in Node.js environment)
if (typeof window === 'undefined') {
  try {
    validateConfig();
  } catch (error) {
    console.error('Configuration validation failed:', error);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

// Export default config
export default config;
