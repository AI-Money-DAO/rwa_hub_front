import { config, apiConfig, devConfig } from './config';
import { logApiRequest, logApiResponse, logErrorWithContext } from './logger';
import { handleHttpError, withRetry, NetworkError } from './errors';
import { buildUrl } from './utils';
import type { ApiResponse, PaginationParams } from '@/types';

// Request configuration interface
interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  requiresAuth?: boolean;
}

// Base API client class
class BaseApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Get auth token from storage
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem('rwa_hub_token');
    } catch {
      return null;
    }
  }

  // Set auth token
  private setAuthHeaders(
    headers: Record<string, string>
  ): Record<string, string> {
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }

  // Make HTTP request
  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = apiConfig.timeout,
      retries = apiConfig.retryAttempts,
      requiresAuth = false,
    } = config;

    const url = buildUrl(this.baseUrl, endpoint);
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (requiresAuth) {
      this.setAuthHeaders(requestHeaders);
    }

    const requestConfig: RequestInit = {
      method,
      headers: requestHeaders,
      ...(body && { body: JSON.stringify(body) }),
    };

    // Log request
    logApiRequest(method, url, body);

    const makeRequestWithTimeout = async (): Promise<Response> => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await fetch(url, {
          ...requestConfig,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          throw new NetworkError('Request timeout');
        }
        throw error;
      }
    };

    try {
      const response = await withRetry(
        makeRequestWithTimeout,
        retries,
        apiConfig.retryDelay,
        (error) => error instanceof NetworkError
      );

      // Log response
      logApiResponse(method, url, response.status);

      if (!response.ok) {
        handleHttpError(response);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      logErrorWithContext(error, `API Request: ${method} ${url}`);
      throw error;
    }
  }

  // HTTP method helpers
  protected async get<T>(
    endpoint: string,
    params?: Record<string, any>,
    requiresAuth = false
  ): Promise<ApiResponse<T>> {
    const url = params ? buildUrl('', endpoint, params) : endpoint;
    return this.makeRequest<T>(url, { method: 'GET', requiresAuth });
  }

  protected async post<T>(
    endpoint: string,
    body?: any,
    requiresAuth = false
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body,
      requiresAuth,
    });
  }

  protected async put<T>(
    endpoint: string,
    body?: any,
    requiresAuth = false
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  protected async delete<T>(
    endpoint: string,
    requiresAuth = false
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE', requiresAuth });
  }

  protected async patch<T>(
    endpoint: string,
    body?: any,
    requiresAuth = false
  ): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body,
      requiresAuth,
    });
  }
}

// Mock API client for development (uses local API routes)
class MockApiClient extends BaseApiClient {
  constructor() {
    super(config.apiBaseUrl);
  }

  // Auth endpoints
  async login(data: {
    loginType: string;
    identifier: string;
    password: string;
    verificationCode?: string;
    authCode?: string;
  }) {
    return this.post<import('@/types').LoginResponse>('/api/auth/login', data);
  }

  async register(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    return this.post('/api/auth/register', userData);
  }

  refreshToken() {
    return this.post('/api/auth/refresh', {}, true);
  }

  async resetPassword(data: any) {
    return this.post('/api/profile/reset-password', data);
  }

  // Profile endpoints
  async updateProfile(data: any) {
    return this.put('/api/profile/update', data, true);
  }

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.post('/api/profile/change-password', data, true);
  }

  async requestPasswordReset(email: string) {
    return this.post('/api/profile/reset-password', { email });
  }

  async confirmPasswordReset(data: {
    email: string;
    verificationCode: string;
    newPassword: string;
  }) {
    return this.put('/api/profile/reset-password', data);
  }

  // Task endpoints
  async getTasks(params?: PaginationParams & { filters?: any }) {
    return this.get('/api/tasks', params, true);
  }

  async getTask(id: number) {
    return this.get(`/api/tasks/${id}`, {}, true);
  }

  async createTask(data: {
    title: string;
    description: string;
    points: number;
  }) {
    return this.post('/api/tasks', data, true);
  }

  async assignTask(id: number) {
    return this.post(`/api/tasks/${id}/assign`, {}, true);
  }

  async submitTask(
    id: number,
    data: { submissionContent: string; attachments?: string[] }
  ) {
    return this.post(`/api/tasks/${id}/submit`, data, true);
  }

  async closeTask(id: number) {
    return this.post(`/api/tasks/${id}/close`, {}, true);
  }

  // Points endpoints
  async getPointsBalance() {
    return this.get('/api/points/balance', {}, true);
  }

  async getPointsHistory(params?: PaginationParams) {
    return this.get('/api/points/history', params, true);
  }

  // Chat endpoints (如果需要的话)
  sendMessage(data: { message: string; sessionId?: string }) {
    return this.post('/api/chat/message', data, true);
  }

  getChatHistory(sessionId: string) {
    return this.get(`/api/chat/history/${sessionId}`, {}, true);
  }

  getChatSessions() {
    return this.get('/api/chat/sessions', {}, true);
  }

  createChatSession() {
    return this.post('/api/chat/sessions', {}, true);
  }
}

// Real API client
class RealApiClient extends BaseApiClient {
  constructor() {
    super(config.apiBaseUrl);
  }

  // User Profile Management
  updateProfile(data: any) {
    return this.post('/api/profile/update', data, true);
  }

  sendResetCode(email: string) {
    return this.post(`/api/profile/send-reset-code?email=${email}`, {}, false);
  }

  resetPassword(data: any) {
    return this.post('/api/profile/reset-password', data, false);
  }

  changePassword(data: any) {
    return this.post('/api/profile/change-password', data, true);
  }

  getPasswordStrength() {
    return this.get('/api/profile/password-strength', {}, false);
  }

  // User Authentication
  sendSmsCode(phone: string) {
    return this.post(`/api/auth/send-sms-code?phone=${phone}`, {}, false);
  }

  sendEmailCode(email: string) {
    return this.post(`/api/auth/send-email-code?email=${email}`, {}, false);
  }

  register(data: any) {
    return this.post('/api/auth/register', data, false);
  }

  login(data: {
    loginType: string;
    identifier: string;
    password: string;
    verificationCode?: string;
    authCode?: string;
  }) {
    return this.post<import('@/types').LoginResponse>(
      '/api/auth/login',
      data,
      false
    );
  }

  githubCallback(code: string) {
    return this.get(`/api/auth/github/callback?code=${code}`, {}, false);
  }

  // Points Management
  getPointsHistory(params?: PaginationParams) {
    return this.get('/api/points/history', params, true);
  }

  getPointsBalance() {
    return this.get('/api/points/balance', {}, true);
  }

  // Task Management
  getTasks(params?: PaginationParams & { status?: string }) {
    return this.get('/api/tasks', params, true);
  }

  createTask(data: any) {
    return this.post('/api/tasks', data, true);
  }

  getTask(id: number) {
    return this.get(`/api/tasks/${id}`, {}, true);
  }

  closeTask(taskId: number) {
    return this.post(`/api/tasks/${taskId}/close`, {}, true);
  }

  submitTask(data: any) {
    return this.post('/api/tasks/submit', data, true);
  }

  reviewSubmission(submissionId: number, status: string) {
    return this.post(
      `/api/tasks/review/${submissionId}?status=${status}`,
      {},
      true
    );
  }

  getPendingSubmissions(params?: PaginationParams) {
    return this.get('/api/tasks/pending-submissions', params, true);
  }

  getMySubmissions(params?: PaginationParams) {
    return this.get('/api/tasks/my-submissions', params, true);
  }

  refreshToken() {
    return Promise.resolve({ code: 0, message: 'Not implemented', data: null });
  }
}

// Export the appropriate client based on environment
console.log('API Configuration:', {
  enableMockApi: config.enableMockApi,
  apiBaseUrl: config.apiBaseUrl,
});

export const apiClient = config.enableMockApi
  ? new MockApiClient()
  : new RealApiClient();

// Export a simple api object for easier usage
export const api = apiClient;

export default apiClient;
