import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLogout } from '@/hooks/useAuthApi';

// Auth status component for debugging and testing
export function AuthStatus() {
  const { user, isAuthenticated, isLoading, error } = useAuth();
  const { logoutUser } = useLogout();

  if (isLoading) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">Checking authentication...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Auth Error: {error}</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-800">Not authenticated</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-800 font-medium">
            Welcome, {user?.nickname || user?.username}!
          </p>
          <p className="text-green-600 text-sm">
            Role: {user?.role} | Points: {user?.points}
          </p>
        </div>
        <button
          onClick={logoutUser}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

// Compact auth status for header/navbar
export function CompactAuthStatus() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { logoutUser } = useLogout();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Not logged in</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.nickname || user.username}
            className="w-6 h-6 rounded-full"
          />
        ) : (
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {(user?.nickname || user?.username || '').charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-800">
          {user?.nickname || user?.username}
        </span>
      </div>
      <button
        onClick={logoutUser}
        className="text-sm text-gray-600 hover:text-red-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
