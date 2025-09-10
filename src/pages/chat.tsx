import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, MessageSquare, Settings, MoreVertical, User, Send, Loader2 } from 'lucide-react';
import AIChat from '@/components/features/AIChat';
import { ChatSessionManager, ChatMessage, StreamData } from '@/lib/coze-api';
import { useAuth } from '@/contexts/AuthContext';

export default function ChatPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [chatSession, setChatSession] = useState<ChatSessionManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 检查登录状态
    if (!user) {
      router.push('/auth/login?redirect=/chat');
      return;
    }

    // 从 sessionStorage 恢复聊天会话
    const savedSession = sessionStorage.getItem('chatSession');
    const pendingMessage = sessionStorage.getItem('pendingMessage');
    
    if (savedSession) {
      try {
        const sessionData = JSON.parse(savedSession);
        const newChatSession = new ChatSessionManager();
        
        // 如果有会话ID，设置到会话管理器中
        if (sessionData.conversationId) {
          newChatSession.setConversationId(sessionData.conversationId);
        }
        
        setChatSession(newChatSession);
        
        // 清理 sessionStorage
        sessionStorage.removeItem('chatSession');
      } catch (error) {
        console.error('Failed to restore chat session:', error);
        setChatSession(new ChatSessionManager());
      }
    } else {
      setChatSession(new ChatSessionManager());
    }
    
    // 处理待发送的消息
    if (pendingMessage) {
      try {
        const messageData = JSON.parse(pendingMessage);
        // 将待发送消息传递给聊天组件
        sessionStorage.setItem('autoSendMessage', messageData.message);
        sessionStorage.removeItem('pendingMessage');
      } catch (error) {
        console.error('Failed to parse pending message:', error);
      }
    }
    
    setIsLoading(false);
  }, [user, router]);

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载聊天...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">

      {/* 主要聊天区域 - 占据剩余空间 */}
      <div className="flex-1 flex flex-col min-h-0">
        <FullScreenAIChat chatSession={chatSession} />
      </div>

      {/* 底部状态栏 */}
      <div className="bg-white px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <span>RWA Hub AI 助手</span>
            <span>•</span>
            <span>基于大语言模型</span>
          </div>
          <div>
            投资有风险，决策需谨慎
          </div>
        </div>
      </div>
    </div>
  );
}

// 全屏聊天组件
interface FullScreenAIChatProps {
  chatSession: ChatSessionManager | null;
}

const FullScreenAIChat: React.FC<FullScreenAIChatProps> = ({ chatSession }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 检查是否有自动发送的消息
  useEffect(() => {
    const autoSendMessage = sessionStorage.getItem('autoSendMessage');
    if (autoSendMessage && chatSession) {
      // 立即显示用户消息
      const userMessage: ChatMessage = {
        role: 'user',
        content: autoSendMessage,
      };
      setMessages([userMessage]);
      
      // 清理 sessionStorage
      sessionStorage.removeItem('autoSendMessage');
      
      // 自动发送消息
      setTimeout(() => {
        handleAutoSendMessage(autoSendMessage);
      }, 100);
    }
  }, [chatSession]);

  // 自动发送消息的处理函数
  const handleAutoSendMessage = async (message: string) => {
    if (!chatSession) return;

    setIsLoading(true);
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const userId = user?.id?.toString() || '213';
      let accumulatedContent = '';
      
      await chatSession.sendStreamMessage(
        message,
        (data: StreamData) => {
          if (data.type === 'message_delta' && data.content) {
            accumulatedContent += data.content;
            setStreamingContent(accumulatedContent);
          } else if (data.type === 'chat_completed') {
            const finalContent = accumulatedContent || data.content || '';
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: finalContent,
            }]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'error') {
            console.error('Stream error:', data.error);
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: '抱歉，发生了错误，请稍后重试。',
            }]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'end') {
            if (accumulatedContent && !isStreaming) {
              setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                  return prev;
                }
                return [...prev, {
                  role: 'assistant',
                  content: accumulatedContent,
                }];
              });
            }
            setStreamingContent('');
            setIsStreaming(false);
          }
        },
        userId
      );
    } catch (error) {
      console.error('Auto send message error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '网络连接出现问题，请检查网络后重试。',
      }]);
      setStreamingContent('');
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 自动滚动到底部
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  // 发送消息
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !chatSession) return;

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
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const userId = user?.id?.toString() || '213';
      let accumulatedContent = '';
      
      await chatSession.sendStreamMessage(
        userMessage,
        (data: StreamData) => {
          if (data.type === 'message_delta' && data.content) {
            accumulatedContent += data.content;
            setStreamingContent(accumulatedContent);
          } else if (data.type === 'chat_completed') {
            const finalContent = accumulatedContent || data.content || '';
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: finalContent,
            }]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'error') {
            console.error('Stream error:', data.error);
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: '抱歉，发生了错误，请稍后重试。',
            }]);
            setStreamingContent('');
            setIsStreaming(false);
          } else if (data.type === 'end') {
            if (accumulatedContent && !isStreaming) {
              setMessages(prev => {
                const lastMessage = prev[prev.length - 1];
                if (lastMessage && lastMessage.role === 'assistant') {
                  return prev;
                }
                return [...prev, {
                  role: 'assistant',
                  content: accumulatedContent,
                }];
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
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '网络连接出现问题，请检查网络后重试。',
      }]);
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
    chatSession?.clearSession();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* 消息列表区域 - 可滚动 */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-16">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">你好！我是 AI 智能助手</h3>
              <p className="text-gray-400 mb-6">专业的RWA投资顾问，为您提供个性化建议</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['RWA是什么？', '如何投资RWA？', '风险评估', '市场趋势'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInputValue(suggestion)}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
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
                } items-start space-x-3`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white ml-3'
                      : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-3'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <MessageSquare className="w-5 h-5" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 rounded-bl-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {/* 流式响应显示 */}
          {isStreaming && streamingContent && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white mr-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-gray-100 text-gray-800">
                  <p className="whitespace-pre-wrap leading-relaxed">{streamingContent}</p>
                  <div className="flex items-center mt-2">
                    <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                    <span className="text-xs text-gray-400 ml-1">正在输入...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 输入区域 - 固定在底部 */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入你的问题..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};
