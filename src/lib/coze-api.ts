import { config } from './config';

// Coze API 配置
const COZE_API_BASE = 'http://127.0.0.1:2026';

// 消息类型定义
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  content_type?: 'text';
}

// 聊天请求参数
export interface ChatRequest {
  user_id: string;
  messages: ChatMessage[];
  conversation_id?: string;
  stream?: boolean;
}

// 聊天响应数据
export interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    content: string;
    timestamp: string;
    bot_id?: string;
    user_id: string;
  };
  conversation_id?: string;
}

// 流式响应数据类型
export interface StreamData {
  type: 'message_delta' | 'chat_completed' | 'error' | 'end';
  content?: string;
  conversation_id?: string;
  error?: string;
  timestamp?: string;
}

// Coze API 客户端类
export class CozeAPIClient {
  private baseURL: string;

  constructor(baseURL: string = COZE_API_BASE) {
    this.baseURL = baseURL;
  }

  // 发送普通聊天消息
  async chat(request: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Chat API error:', error);
      throw error;
    }
  }

  // 发送流式聊天消息
  async chatStream(
    request: ChatRequest,
    onMessage: (data: StreamData) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Response body is not readable');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // 保留不完整的行

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data.trim() === '') continue;

              try {
                const parsed: StreamData = JSON.parse(data);
                onMessage(parsed);

                if (parsed.type === 'end') {
                  return;
                }
              } catch (e) {
                console.error('Parse stream data error:', e);
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (error) {
      console.error('Stream chat API error:', error);
      throw error;
    }
  }

  // 测试连接
  async testConnection(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/test/connection`);
      return await response.json();
    } catch (error) {
      console.error('Connection test error:', error);
      throw error;
    }
  }

  // 获取配置
  async getConfig(): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/api/v1/config`);
      return await response.json();
    } catch (error) {
      console.error('Get config error:', error);
      throw error;
    }
  }
}

// 默认实例
export const cozeAPI = new CozeAPIClient();

// 聊天会话管理器
export class ChatSessionManager {
  private conversationId: string | null = null;
  private messages: ChatMessage[] = [];

  constructor(private apiClient: CozeAPIClient = cozeAPI) {}

  // 设置会话ID（用于恢复会话）
  setConversationId(conversationId: string): void {
    this.conversationId = conversationId;
  }

  // 发送消息
  async sendMessage(
    content: string,
    userId: string = '213'
  ): Promise<ChatResponse> {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      content_type: 'text',
    };

    this.messages.push(userMessage);

    const response = await this.apiClient.chat({
      user_id: userId,
      messages: [userMessage], // 只发送当前消息，让服务端管理上下文
      conversation_id: this.conversationId || undefined,
    });

    if (response.success && response.conversation_id) {
      this.conversationId = response.conversation_id;
    }

    // 添加助手回复到消息历史
    if (response.success && response.data.content) {
      this.messages.push({
        role: 'assistant',
        content: response.data.content,
      });
    }

    return response;
  }

  // 发送流式消息
  async sendStreamMessage(
    content: string,
    onMessage: (data: StreamData) => void,
    userId: string = '213'
  ): Promise<void> {
    const userMessage: ChatMessage = {
      role: 'user',
      content,
      content_type: 'text',
    };

    this.messages.push(userMessage);
    let assistantContent = '';

    await this.apiClient.chatStream(
      {
        user_id: userId,
        messages: [userMessage],
        conversation_id: this.conversationId || undefined,
      },
      (data) => {
        if (data.type === 'message_delta' && data.content) {
          assistantContent += data.content;
        } else if (data.type === 'chat_completed' && data.conversation_id) {
          this.conversationId = data.conversation_id;
          // 添加完整的助手回复到消息历史
          this.messages.push({
            role: 'assistant',
            content: assistantContent,
          });
        }
        onMessage(data);
      }
    );
  }

  // 获取消息历史
  getMessages(): ChatMessage[] {
    return [...this.messages];
  }

  // 清空会话
  clearSession(): void {
    this.conversationId = null;
    this.messages = [];
  }

  // 获取会话ID
  getConversationId(): string | null {
    return this.conversationId;
  }
}
