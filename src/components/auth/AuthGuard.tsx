import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';

// AuthGuard props interface
interface AuthGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireRole?: string;
  redirectTo?: string;
  fallback?: ReactNode;
}

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Unauthorized component
const UnauthorizedMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="text-6xl mb-4">🔒</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-4">{message}</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Go Back
      </button>
    </div>
  </div>
);

// AuthGuard component
export function AuthGuard({
  children,
  requireAuth = true,
  requireRole,
  redirectTo = '/auth/login',
  fallback,
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect during initial loading
    if (isLoading) return;

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      // Store the current path for redirect after login
      const returnUrl = router.asPath;
      const loginUrl = `${redirectTo}?returnUrl=${encodeURIComponent(returnUrl)}`;
      router.replace(loginUrl);
      return;
    }

    // If specific role is required but user doesn't have it
    if (requireRole && user && user.role !== requireRole) {
      // Don't redirect, just show unauthorized message
      return;
    }
  }, [
    isAuthenticated,
    isLoading,
    user,
    requireAuth,
    requireRole,
    router,
    redirectTo,
  ]);

  // Show loading spinner during authentication check
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return fallback || <LoadingSpinner />;
  }

  // If specific role is required but user doesn't have it
  if (requireRole && user && user.role !== requireRole) {
    const message = `This page requires ${requireRole} access. Your current role is ${user.role}.`;
    return fallback || <UnauthorizedMessage message={message} />;
  }

  // If user is authenticated and has required role (if any), render children
  return <>{children}</>;
}

// Higher-order component for protecting pages
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, 'children'> = {}
) {
  const WrappedComponent = (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );

  WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name})`;

  return WrappedComponent;
}

// Specific guard components for common use cases

// Requires authentication
export function RequireAuth({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true} fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

// Requires admin role
export function RequireAdmin({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true} requireRole="admin" fallback={fallback}>
      {children}
    </AuthGuard>
  );
}

// Only for guests (not authenticated users)
export function GuestOnly({
  children,
  redirectTo = '/dashboard',
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
