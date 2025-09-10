import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, MessageCircle, Sparkles } from 'lucide-react';
import { ChatSessionManager } from '@/lib/coze-api';
import { useAuth } from '@/contexts/AuthContext';
import LoginPromptModal from '@/components/auth/LoginPromptModal';

interface AISearchBoxProps {
  placeholder?: string;
  className?: string;
}

export function AISearchBox({
  placeholder = '输入您的问题...',
  className = '',
}: AISearchBoxProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingMessage, setPendingMessage] = useState('');
  const router = useRouter();
  const { user } = useAuth();
  const [chatSession] = useState(() => new ChatSessionManager());

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();

    // 检查登录状态
    if (!user) {
      // 未登录，显示登录提示弹窗
      setPendingMessage(userMessage);
      setShowLoginPrompt(true);
      return;
    }

    setMessage(''); // 清空输入框
    
    // 立即跳转到聊天页面，并传递用户消息
    sessionStorage.setItem('pendingMessage', JSON.stringify({
      message: userMessage,
      timestamp: Date.now()
    }));
    
    router.push('/chat');
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
    setPendingMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-8 ${className}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">AI智能助手</h3>
          <p className="text-gray-600">专业的RWA投资顾问，为您提供个性化建议</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder={placeholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="w-full h-14 pl-4 pr-16 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {['RWA是什么？', '如何投资RWA？', '风险评估', '市场趋势'].map(
            (suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  if (!user) {
                    setPendingMessage(suggestion);
                    setShowLoginPrompt(true);
                    return;
                  }
                  setMessage(suggestion);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
              >
                {suggestion}
              </button>
            )
          )}
        </div>
      </div>

      {/* 登录提示弹窗 */}
      <LoginPromptModal
        isOpen={showLoginPrompt}
        onClose={handleLoginPromptClose}
        redirectPath="/chat"
        message={pendingMessage}
      />
    </div>
  );
}
