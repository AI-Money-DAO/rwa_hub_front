// User related types
export interface User {
  id: number;
  username: string;
  nickname: string;
  email: string;
  avatarUrl?: string;
  role: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  username: string;
  nickname: string;
  email: string;
  avatarUrl?: string;
  role: string;
  points: number;
}

export interface UpdateProfileRequest {
  username?: string;
  nickname?: string;
  email?: string;
  emailVerificationCode?: string;
}

// Task related types
export interface Task {
  id: number;
  title: string;
  description: string;
  type: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'SUBMITTED' | 'COMPLETED' | 'CLOSED';
  reward: number;
  requirements?: string;
  assignedUserId?: number;
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  points: number;
}

export interface SubmitTaskRequest {
  submissionContent: string;
  attachments?: string[];
}

// Points related types
export interface PointTransaction {
  id: number;
  userId: number;
  amount: number;
  type: 'TASK_REWARD' | 'REDEMPTION' | 'ADJUSTMENT';
  description: string;
  referenceId?: number;
  createdAt: string;
}

export interface PointBalance {
  userId: number;
  balance: number;
  totalEarned: number;
  totalSpent: number;
}

// Chat related types
export interface ChatMessage {
  id: string;
  sessionId: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: string;
  isTyping?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  lastMessage?: string;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error types
export interface ApiError {
  code: number;
  message: string;
  details?: unknown;
}

export interface ValidationError {
  field: string;
  message: string;
}

// Auth related types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordRequest {
  email: string;
  verificationCode?: string;
  newPassword?: string;
}

// Profile related types
export interface ProfileUpdateResult {
  success: boolean;
  message: string;
  updatedFields: string[];
}

// Task filter and pagination types
export interface TaskFilters {
  status?: Task['status'];
  type?: string;
  minReward?: number;
  maxReward?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface TaskListParams extends PaginationParams {
  filters?: TaskFilters;
}

// UI State types
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface FormState<T = unknown> extends LoadingState {
  data?: T;
  isDirty: boolean;
}

// Navigation and Layout types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

// Environment configuration types
export interface AppConfig {
  appName: string;
  apiBaseUrl: string;
  enableMockApi: boolean;
  jwtSecret?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
