// Application constants

// Task status constants
export const TASK_STATUS = {
  AVAILABLE: 'AVAILABLE',
  ASSIGNED: 'ASSIGNED',
  SUBMITTED: 'SUBMITTED',
  COMPLETED: 'COMPLETED',
  CLOSED: 'CLOSED',
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.AVAILABLE]: '可领取',
  [TASK_STATUS.ASSIGNED]: '已领取',
  [TASK_STATUS.SUBMITTED]: '已提交',
  [TASK_STATUS.COMPLETED]: '已完成',
  [TASK_STATUS.CLOSED]: '已关闭',
} as const;

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.AVAILABLE]: 'bg-green-100 text-green-800',
  [TASK_STATUS.ASSIGNED]: 'bg-blue-100 text-blue-800',
  [TASK_STATUS.SUBMITTED]: 'bg-yellow-100 text-yellow-800',
  [TASK_STATUS.COMPLETED]: 'bg-purple-100 text-purple-800',
  [TASK_STATUS.CLOSED]: 'bg-gray-100 text-gray-800',
} as const;

// Point transaction types
export const POINT_TRANSACTION_TYPES = {
  TASK_REWARD: 'TASK_REWARD',
  REDEMPTION: 'REDEMPTION',
  ADJUSTMENT: 'ADJUSTMENT',
} as const;

export const POINT_TRANSACTION_LABELS = {
  [POINT_TRANSACTION_TYPES.TASK_REWARD]: '任务奖励',
  [POINT_TRANSACTION_TYPES.REDEMPTION]: '积分兑换',
  [POINT_TRANSACTION_TYPES.ADJUSTMENT]: '积分调整',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
} as const;

export const USER_ROLE_LABELS = {
  [USER_ROLES.USER]: '普通用户',
  [USER_ROLES.ADMIN]: '管理员',
  [USER_ROLES.MODERATOR]: '版主',
} as const;

// Chat message roles
export const CHAT_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
} as const;

// API response codes
export const API_CODES = {
  SUCCESS: 0,
  ERROR: 1,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  SERVER_ERROR: 500,
} as const;

// Navigation items
export const NAV_ITEMS = [
  {
    label: '首页',
    href: '/',
    icon: 'Home',
    requiresAuth: false,
  },
  {
    label: '关于',
    href: '/about',
    icon: 'Info',
    requiresAuth: false,
  },
  {
    label: '合作伙伴',
    href: '/partners',
    icon: 'Users',
    requiresAuth: false,
  },
  {
    label: '社区',
    href: '/community',
    icon: 'MessageCircle',
    requiresAuth: false,
  },
] as const;

export const DASHBOARD_NAV_ITEMS = [
  {
    label: '仪表板',
    href: '/dashboard',
    icon: 'LayoutDashboard',
    requiresAuth: true,
  },
  {
    label: '个人资料',
    href: '/dashboard/profile',
    icon: 'User',
    requiresAuth: true,
  },
  {
    label: '任务管理',
    href: '/dashboard/tasks',
    icon: 'CheckSquare',
    requiresAuth: true,
  },
  {
    label: '积分管理',
    href: '/dashboard/points',
    icon: 'Coins',
    requiresAuth: true,
  },
  {
    label: 'AI对话',
    href: '/chat',
    icon: 'MessageSquare',
    requiresAuth: true,
  },
] as const;

export const ADMIN_NAV_ITEMS = [
  {
    label: '创建任务',
    href: '/dashboard/tasks/create',
    icon: 'Plus',
    requiresAuth: true,
    adminOnly: true,
  },
  {
    label: '用户管理',
    href: '/dashboard/users',
    icon: 'Users',
    requiresAuth: true,
    adminOnly: true,
  },
] as const;

// Form field limits
export const FIELD_LIMITS = {
  USERNAME: { min: 3, max: 20 },
  NICKNAME: { min: 1, max: 50 },
  PASSWORD: { min: 6, max: 128 },
  EMAIL: { max: 254 },
  TASK_TITLE: { min: 1, max: 100 },
  TASK_DESCRIPTION: { min: 1, max: 1000 },
  TASK_SUBMISSION: { min: 1, max: 2000 },
  CHAT_MESSAGE: { min: 1, max: 1000 },
  POINTS: { min: 1, max: 10000 },
} as const;

// File upload limits
export const FILE_LIMITS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'text/plain'],
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

// Time constants
export const TIME_CONSTANTS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'rwa_hub_token',
  REFRESH_TOKEN: 'rwa_hub_refresh_token',
  USER_PREFERENCES: 'rwa_hub_preferences',
  CHAT_HISTORY: 'rwa_hub_chat_history',
  THEME: 'rwa_hub_theme',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查网络设置',
  UNAUTHORIZED: '登录已过期，请重新登录',
  FORBIDDEN: '权限不足，无法执行此操作',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '输入数据格式错误',
  SERVER_ERROR: '服务器内部错误，请稍后重试',
  UNKNOWN_ERROR: '未知错误，请联系技术支持',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '登录成功',
  REGISTER_SUCCESS: '注册成功，请查收验证邮件',
  PROFILE_UPDATED: '个人资料更新成功',
  PASSWORD_CHANGED: '密码修改成功',
  TASK_CREATED: '任务创建成功',
  TASK_SUBMITTED: '任务提交成功',
  TASK_COMPLETED: '任务完成',
  EMAIL_SENT: '邮件发送成功',
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
  PHONE: /^1[3-9]\d{9}$/,
  PASSWORD_STRENGTH: {
    LOWERCASE: /[a-z]/,
    UPPERCASE: /[A-Z]/,
    NUMBERS: /\d/,
    SPECIAL_CHARS: /[!@#$%^&*(),.?":{}|<>]/,
  },
} as const;

// Theme configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: 'blue',
    SECONDARY: 'gray',
    SUCCESS: 'green',
    WARNING: 'yellow',
    ERROR: 'red',
    INFO: 'blue',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
    '2XL': '1536px',
  },
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Notification configuration
export const NOTIFICATION_CONFIG = {
  DEFAULT_DURATION: 5000,
  POSITION: 'top-right',
  MAX_NOTIFICATIONS: 5,
} as const;
