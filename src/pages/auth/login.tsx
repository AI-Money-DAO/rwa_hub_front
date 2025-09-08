import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useAuthApi';
import { GuestOnly } from '@/components/auth/AuthGuard';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, isLoading, error, clearError } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const watchedFields = watch();

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted with data:', data);
    const result = await loginUser(data);
    console.log('Login result:', result);

    if (result.success) {
      console.log('Login successful, redirecting...');
      // Redirect to return URL or dashboard
      const returnUrl = router.query.returnUrl as string;
      const targetUrl = returnUrl || '/dashboard';
      console.log('Redirecting to:', targetUrl);
      router.push(targetUrl);
    } else {
      console.log('Login failed:', result.error);
    }
  };

  // Pre-fill demo credentials
  const fillDemoCredentials = (role: 'admin' | 'user') => {
    if (role === 'admin') {
      setValue('username', 'admin');
      setValue('password', 'admin123');
    } else {
      setValue('username', 'user1');
      setValue('password', 'user123');
    }
  };

  // Clear API error when user starts typing
  React.useEffect(() => {
    if (error && (watchedFields.username || watchedFields.password)) {
      clearError();
    }
  }, [watchedFields.username, watchedFields.password, error, clearError]);

  return (
    <GuestOnly>
      <Head>
        <title>登录 - RWA Hub</title>
        <meta name="description" content="登录到RWA Hub平台" />
      </Head>

      <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-black rounded flex items-center justify-center mb-8">
              <span className="text-white font-medium text-xl">R</span>
            </div>
            <h2 className="text-3xl font-light text-black mb-2">登录</h2>
            <p className="text-gray-600 font-light">
              还没有账户？{' '}
              <Link
                href="/auth/register"
                className="text-black hover:text-gray-600 transition-colors"
              >
                立即注册
              </Link>
            </p>
          </div>

          <form className="mt-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <Input
                  id="username"
                  type="text"
                  placeholder="用户名"
                  {...register('username')}
                  className={`h-12 border-gray-200 focus:border-black ${
                    errors.username
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }`}
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600 font-light">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="密码"
                    {...register('password')}
                    className={`h-12 pr-10 border-gray-200 focus:border-black ${
                      errors.password
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-gray-400 hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600 font-light">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-gray-50 border border-gray-200 rounded p-4">
                <p className="text-sm text-gray-700 font-light">{error}</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading || !isValid}
                className="w-full h-12 bg-black text-white hover:bg-gray-800 font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    登录中...
                  </div>
                ) : (
                  '登录'
                )}
              </Button>
            </div>

            <div className="text-center pt-4">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-gray-500 hover:text-black transition-colors font-light"
              >
                忘记密码？
              </Link>
            </div>
          </form>

          {/* Demo credentials for testing */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center mb-4 font-light">
              测试账户
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => fillDemoCredentials('admin')}
                className="flex-1 py-3 px-4 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors font-light"
              >
                管理员
              </button>
              <button
                onClick={() => fillDemoCredentials('user')}
                className="flex-1 py-3 px-4 text-sm bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors font-light"
              >
                普通用户
              </button>
            </div>
          </div>
        </div>
      </div>
    </GuestOnly>
  );
}