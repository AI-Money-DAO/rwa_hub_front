import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { X, Lock, UserPlus } from 'lucide-react';

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
  message?: string;
}

export default function LoginPromptModal({
  isOpen,
  onClose,
  redirectPath = '/chat',
  message,
}: LoginPromptModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    router.push(`/auth/login?redirect=${encodeURIComponent(redirectPath)}`);
  };

  const handleRegister = () => {
    onClose();
    router.push(`/auth/register?redirect=${encodeURIComponent(redirectPath)}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 图标 */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 标题和描述 */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">需要登录</h3>
          <p className="text-gray-600">
            {message ? `要使用"${message}"功能，` : '要使用AI聊天功能，'}
            请先登录您的账户
          </p>
        </div>

        {/* 按钮组 */}
        <div className="space-y-3">
          <Button
            onClick={handleLogin}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            登录账户
          </Button>

          <Button
            onClick={handleRegister}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:border-blue-300 text-gray-700 font-medium rounded-xl flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            注册新账户
          </Button>
        </div>

        {/* 底部提示 */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            登录后即可享受完整的AI聊天体验
          </p>
        </div>
      </div>
    </div>
  );
}
