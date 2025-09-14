import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, MessageSquare, X } from 'lucide-react';
import { ChatSessionManager, StreamData, ChatMessage } from '@/lib/coze-api';
import { useAuth } from '@/contexts/AuthContext';

interface AIChatProps {
  className?: string;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({
  className = '',
  isMinimized = false,
  onToggleMinimize,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [chatSession] = useState(() => new ChatSessionManager());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    // 添加用户消息到界面
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const userId = user?.id?.toString() || '213';
      let accumulatedContent = ''; // 用于累积流式内容

      await chatSession.sendStreamMessage(
        userMessage,
        (data: StreamData) => {
          if (data.type === 'message_delta' && data.content) {
            accumulatedContent += data.content;
            setStreamingContent(accumulatedContent);
          } else if (data.type === 'chat_completed') {
            // 流式响应完成，添加完整的助手回复
            const finalContent = accumulatedContent || data.content || '';
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content: finalContent,
              },
            ]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'error') {
            console.error('Stream error:', data.error);
            setMessages((prev) => [
              ...prev,
              {
                role: 'assistant',
                content: '抱歉，发生了错误，请稍后重试。',
              },
            ]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'end') {
            // 如果是 end 事件且还有累积内容，也要保存到消息历史
            if (accumulatedContent && !isStreaming) {
              setMessages((prev) => {
                // 检查最后一条消息是否已经是助手回复
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                  return prev; // 已经添加过了，不重复添加
                }
                return [
                  ...prev,
                  {
                    role: 'assistant',
                    content: accumulatedContent,
                  },
                ];
              });
            }
            setStreamingContent('');
            setIsStreaming(false);
          }
        },
        userId
      );
    } catch (error) {
      console.error('Send message error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '网络连接出现问题，请检查网络后重试。',
        },
      ]);
      setStreamingContent('');
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理键盘事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 清空对话
  const handleClearChat = () => {
    setMessages([]);
    setStreamingContent('');
    chatSession.clearSession();
  };

  // 如果最小化，显示简化界面
  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <button
          onClick={onToggleMinimize}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-xl border border-gray-200 ${className}`}
    >
      {/* 聊天头部 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">AI 智能助手</h3>
          {chatSession.getConversationId() && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              会话ID: {chatSession.getConversationId()?.slice(-8)}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="text-white/80 hover:text-white text-sm px-2 py-1 rounded hover:bg-white/10 transition-colors"
          >
            清空
          </button>
          {onToggleMinimize && (
            <button
              onClick={onToggleMinimize}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 消息列表 */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Bot className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>你好！我是 AI 智能助手</p>
            <p className="text-sm">有什么可以帮助你的吗？</p>
          </div>
        )}

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start space-x-2`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white ml-2'
                    : 'bg-gray-200 text-gray-600 mr-2'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* 流式响应显示 */}
        {isStreaming && streamingContent && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] flex-row items-start space-x-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 mr-2">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
                <p className="whitespace-pre-wrap">{streamingContent}</p>
                <div className="flex items-center mt-1">
                  <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                  <span className="text-xs text-gray-400 ml-1">
                    正在输入...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入你的问题..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          按 Enter 发送，Shift + Enter 换行
        </p>
      </div>
    </div>
  );
};

export default AIChat;
