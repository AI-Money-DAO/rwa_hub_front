import { LoginResponse, User } from '@/types';

// Token storage keys
const TOKEN_KEY = 'rwa_hub_token';
const USER_KEY = 'rwa_hub_user';

// JWT Token management utilities
export class TokenManager {
  // Get token from localStorage
  static getToken(): string | null {
    if (typeof window === 'undefined') return null;

    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }

  // Set token in localStorage
  static setToken(token: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  // Remove token from localStorage
  static removeToken(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  // Check if token exists
  static hasToken(): boolean {
    return !!this.getToken();
  }

  // Validate token format (mock implementation)
  static isValidToken(token: string): boolean {
    if (!token) return false;

    // Mock validation - check if it's our mock token format
    return token.startsWith('mock-jwt-token-');
  }

  // Extract user ID from mock token
  static getUserIdFromToken(token: string): number | null {
    if (!this.isValidToken(token)) return null;

    try {
      const parts = token.split('-');
      const userId = parseInt(parts[3]);
      return isNaN(userId) ? null : userId;
    } catch {
      return null;
    }
  }

  // Check if token is expired (mock implementation)
  static isTokenExpired(token: string): boolean {
    if (!this.isValidToken(token)) return true;

    try {
      const parts = token.split('-');
      const timestamp = parseInt(parts[4]);
      if (isNaN(timestamp)) return true;

      // Mock expiration: 24 hours
      const expirationTime = timestamp + 24 * 60 * 60 * 1000;
      return Date.now() > expirationTime;
    } catch {
      return true;
    }
  }
}

// User data management utilities
export class UserManager {
  // Get user data from localStorage
  static getUser(): User | null {
    if (typeof window === 'undefined') return null;

    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  // Set user data in localStorage
  static setUser(user: User): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  }

  // Remove user data from localStorage
  static removeUser(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  }

  // Update user data
  static updateUser(updates: Partial<User>): User | null {
    const currentUser = this.getUser();
    if (!currentUser) return null;

    const updatedUser = { ...currentUser, ...updates };
    this.setUser(updatedUser);
    return updatedUser;
  }
}

// Authentication utilities
export class AuthUtils {
  // Store login response data
  static storeLoginData(loginResponse: LoginResponse): void {
    const { token, ...userData } = loginResponse;

    TokenManager.setToken(token);
    UserManager.setUser({
      id: userData.userId,
      username: userData.username,
      nickname: userData.nickname,
      email: userData.email,
      avatarUrl: userData.avatarUrl,
      role: userData.role,
      points: userData.points,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Clear all authentication data
  static clearAuthData(): void {
    TokenManager.removeToken();
    UserManager.removeUser();
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const token = TokenManager.getToken();
    if (!token) return false;

    if (TokenManager.isTokenExpired(token)) {
      this.clearAuthData();
      return false;
    }

    return true;
  }

  // Check if user has specific role
  static hasRole(role: string): boolean {
    const user = UserManager.getUser();
    return user?.role === role;
  }

  // Check if user is admin
  static isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Get current user ID
  static getCurrentUserId(): number | null {
    const user = UserManager.getUser();
    return user?.id || null;
  }

  // Prepare authorization header
  static getAuthHeader(): Record<string, string> {
    const token = TokenManager.getToken();
    if (!token) return {};

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

// Auth event types
export type AuthEvent = 'login' | 'logout' | 'token-expired' | 'user-updated';

// Auth event listener
export class AuthEventManager {
  private static listeners: Map<AuthEvent, Set<() => void>> = new Map();

  // Add event listener
  static addEventListener(event: AuthEvent, callback: () => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  // Remove event listener
  static removeEventListener(event: AuthEvent, callback: () => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  // Emit event
  static emit(event: AuthEvent): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback());
    }
  }

  // Clear all listeners
  static clearAllListeners(): void {
    this.listeners.clear();
  }
}
