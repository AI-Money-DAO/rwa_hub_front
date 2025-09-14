import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { logErrorWithContext } from '@/lib/logger';

// Login hook
export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const loginUser = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // 转换为真实API需要的格式
      const loginData = {
        loginType: 'USERNAME',
        identifier: credentials.username,
        password: credentials.password,
      };

      const response = await apiClient.login(loginData);

      if (response.code === 0 || response.code === 200) {
        console.log(
          'Login successful, calling AuthContext.login with:',
          response.data
        );
        login(response.data);
        return { success: true, data: response.data };
      } else {
        console.error('Login failed:', response.code, response.message);
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Login failed';
      logErrorWithContext(error, 'Login attempt');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    loginUser,
    isLoading,
    error,
    clearError,
  };
}

// Register hook
export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerUser = async (userData: {
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
    verificationCode?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      // 转换为真实API需要的格式
      const registerData = {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword || userData.password,
        verificationCode: userData.verificationCode || '',
      };

      const response = await apiClient.register(registerData);

      if (response.code === 0) {
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Registration failed';
      logErrorWithContext(error, 'Registration attempt');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    registerUser,
    isLoading,
    error,
    clearError,
  };
}

// Logout hook
export function useLogout() {
  const { logout } = useAuth();

  const logoutUser = () => {
    try {
      logout();
      return { success: true };
    } catch (error) {
      logErrorWithContext(error, 'Logout attempt');
      return { success: false, error: 'Logout failed' };
    }
  };

  return { logoutUser };
}

// Profile update hook
export function useProfileUpdate() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useAuth();

  const updateProfile = async (updates: {
    username?: string;
    nickname?: string;
    email?: string;
    emailVerificationCode?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.updateProfile(updates);

      if (response.code === 0) {
        // Update local user data
        updateUser(updates);
        return { success: true, data: response.data };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Profile update failed';
      logErrorWithContext(error, 'Profile update attempt');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    updateProfile,
    isLoading,
    error,
    clearError,
  };
}

// Password change hook
export function usePasswordChange() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.changePassword(data);

      if (response.code === 0) {
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Password change failed';
      logErrorWithContext(error, 'Password change attempt');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    changePassword,
    isLoading,
    error,
    clearError,
  };
}

// Password reset hook
export function usePasswordReset() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (data: {
    email: string;
    verificationCode?: string;
    newPassword?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.resetPassword(data);

      if (response.code === 0) {
        return { success: true, message: response.message };
      } else {
        setError(response.message);
        return { success: false, error: response.message };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Password reset failed';
      logErrorWithContext(error, 'Password reset attempt');
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    resetPassword,
    isLoading,
    error,
    clearError,
  };
}

// Token refresh hook
export function useTokenRefresh() {
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  const refreshToken = async () => {
    try {
      setIsLoading(true);

      const response = await apiClient.refreshToken();

      if (response.code === 0) {
        // Token is automatically updated by the API client
        return { success: true };
      } else {
        // If refresh fails, logout user
        logout();
        return { success: false, error: response.message };
      }
    } catch (error) {
      logErrorWithContext(error, 'Token refresh attempt');
      logout();
      return { success: false, error: 'Token refresh failed' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    refreshToken,
    isLoading,
  };
}
