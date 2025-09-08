import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from 'react';
import { User, LoginResponse } from '@/types';
import {
  AuthUtils,
  TokenManager,
  UserManager,
  AuthEventManager,
} from '@/lib/auth';
import { logErrorWithContext } from '@/lib/logger';

// Auth state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Auth actions
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_UPDATE_USER'; payload: Partial<User> }
  | { type: 'AUTH_CLEAR_ERROR' };

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case 'AUTH_UPDATE_USER':
      if (!state.user) return state;

      const updatedUser = { ...state.user, ...action.payload };
      return {
        ...state,
        user: updatedUser,
      };

    case 'AUTH_CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
}

// Auth context interface
interface AuthContextType extends AuthState {
  login: (loginResponse: LoginResponse) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  clearError: () => void;
  checkAuth: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    checkAuthState();
  }, []);

  // Set up auth event listeners
  useEffect(() => {
    const handleTokenExpired = () => {
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Session expired. Please login again.',
      });
      AuthUtils.clearAuthData();
    };

    const handleUserUpdated = () => {
      const user = UserManager.getUser();
      if (user) {
        dispatch({ type: 'AUTH_UPDATE_USER', payload: user });
      }
    };

    AuthEventManager.addEventListener('token-expired', handleTokenExpired);
    AuthEventManager.addEventListener('user-updated', handleUserUpdated);

    return () => {
      AuthEventManager.removeEventListener('token-expired', handleTokenExpired);
      AuthEventManager.removeEventListener('user-updated', handleUserUpdated);
    };
  }, []);

  // Check authentication state
  const checkAuthState = async () => {
    try {
      dispatch({ type: 'AUTH_START' });

      const token = TokenManager.getToken();
      const user = UserManager.getUser();

      console.log('Checking auth state - token:', !!token, 'user:', !!user);

      if (!token || !user) {
        console.log('No token or user found, logging out');
        dispatch({ type: 'AUTH_LOGOUT' });
        return;
      }

      if (TokenManager.isTokenExpired(token)) {
        console.log('Token expired, clearing auth data');
        AuthUtils.clearAuthData();
        dispatch({
          type: 'AUTH_ERROR',
          payload: 'Session expired. Please login again.',
        });
        return;
      }

      console.log('Auth state valid, setting user:', user);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      console.error('Error in checkAuthState:', error);
      logErrorWithContext(error, 'Auth state check');
      dispatch({
        type: 'AUTH_ERROR',
        payload: 'Failed to verify authentication',
      });
    }
  };

  // Login function
  const login = (loginResponse: LoginResponse) => {
    try {
      AuthUtils.storeLoginData(loginResponse);

      const user: User = {
        id: loginResponse.userId,
        username: loginResponse.username,
        nickname: loginResponse.nickname,
        email: loginResponse.email,
        avatarUrl: loginResponse.avatarUrl,
        role: loginResponse.role,
        points: loginResponse.points,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      dispatch({ type: 'AUTH_SUCCESS', payload: user });
      AuthEventManager.emit('login');
    } catch (error) {
      console.error('Error in AuthContext.login:', error);
      logErrorWithContext(error, 'Login process');
      dispatch({ type: 'AUTH_ERROR', payload: 'Failed to process login' });
    }
  };

  // Logout function
  const logout = () => {
    try {
      AuthUtils.clearAuthData();
      dispatch({ type: 'AUTH_LOGOUT' });
      AuthEventManager.emit('logout');
    } catch (error) {
      logErrorWithContext(error, 'Logout process');
    }
  };

  // Update user function
  const updateUser = (updates: Partial<User>) => {
    try {
      const updatedUser = UserManager.updateUser(updates);
      if (updatedUser) {
        dispatch({ type: 'AUTH_UPDATE_USER', payload: updates });
        AuthEventManager.emit('user-updated');
      }
    } catch (error) {
      logErrorWithContext(error, 'User update');
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'AUTH_CLEAR_ERROR' });
  };

  // Check auth function (for manual refresh)
  const checkAuth = async () => {
    await checkAuthState();
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    updateUser,
    clearError,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// Hook for checking if user has specific role
export function useRole(role: string): boolean {
  const { user } = useAuth();
  return user?.role === role;
}

// Hook for checking if user is admin
export function useIsAdmin(): boolean {
  return useRole('admin');
}

// Hook for getting current user ID
export function useUserId(): number | null {
  const { user } = useAuth();
  return user?.id || null;
}
