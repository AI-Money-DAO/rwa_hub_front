import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AIChat from './AIChat';
import { useAuth } from '@/contexts/AuthContext';
import LoginPromptModal from '@/components/auth/LoginPromptModal';

export const AIChatWidget: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleToggleMinimize = () => {
    // 检查登录状态
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      <AIChat
        className={isMinimized ? '' : 'fixed bottom-4 right-4 w-96 z-50'}
        isMinimized={isMinimized}
        onToggleMinimize={handleToggleMinimize}
      />

      {/* 登录提示弹窗 */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        redirectPath="/chat"
      />
    </>
  );
};

export default AIChatWidget;
