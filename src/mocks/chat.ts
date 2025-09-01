import { ChatMessage, ChatSession } from '@/types';

export const mockChatSessions: ChatSession[] = [
  {
    id: 'session-1',
    title: 'RWA基础概念咨询',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:30:00Z',
    messageCount: 6,
    lastMessage: '感谢您的详细解答，我对RWA有了更清晰的认识。',
  },
  {
    id: 'session-2',
    title: '投资策略讨论',
    createdAt: '2024-01-02T14:00:00Z',
    updatedAt: '2024-01-02T14:45:00Z',
    messageCount: 8,
    lastMessage: '请问在当前市场环境下，RWA投资有哪些需要注意的风险？',
  },
];

const mockChatMessagesData: Record<string, ChatMessage[]> = {
  'session-1': [
    {
      id: 'msg-1',
      sessionId: 'session-1',
      content: '你好，我想了解一下什么是RWA？',
      role: 'user',
      timestamp: '2024-01-01T10:00:00Z',
    },
    {
      id: 'msg-2',
      sessionId: 'session-1',
      content:
        'RWA是Real World Assets的缩写，即现实世界资产。它指的是将传统的实物资产（如房地产、艺术品、商品等）通过区块链技术进行代币化，使这些资产能够在数字世界中进行交易和管理。',
      role: 'assistant',
      timestamp: '2024-01-01T10:01:00Z',
    },
    {
      id: 'msg-3',
      sessionId: 'session-1',
      content: 'RWA有什么优势吗？',
      role: 'user',
      timestamp: '2024-01-01T10:05:00Z',
    },
    {
      id: 'msg-4',
      sessionId: 'session-1',
      content:
        'RWA的主要优势包括：1. 提高流动性 - 传统资产可以更容易地进行交易；2. 降低门槛 - 投资者可以购买资产的一部分而不是整个资产；3. 透明度 - 区块链技术提供了更好的透明度和可追溯性；4. 全球化 - 打破地理限制，实现全球投资。',
      role: 'assistant',
      timestamp: '2024-01-01T10:06:00Z',
    },
    {
      id: 'msg-5',
      sessionId: 'session-1',
      content: '那RWA Hub平台主要提供什么服务呢？',
      role: 'user',
      timestamp: '2024-01-01T10:10:00Z',
    },
    {
      id: 'msg-6',
      sessionId: 'session-1',
      content:
        'RWA Hub是一个综合性的RWA服务平台，主要提供：1. RWA资产信息查询和分析；2. 投资机会发现和评估；3. 社区交流和专家咨询；4. 任务系统，用户可以通过完成相关任务获得积分奖励；5. 教育资源，帮助用户更好地理解RWA投资。',
      role: 'assistant',
      timestamp: '2024-01-01T10:12:00Z',
    },
  ],
  'session-2': [
    {
      id: 'msg-7',
      sessionId: 'session-2',
      content: '我是RWA投资新手，应该如何开始？',
      role: 'user',
      timestamp: '2024-01-02T14:00:00Z',
    },
    {
      id: 'msg-8',
      sessionId: 'session-2',
      content:
        '作为RWA投资新手，建议您：1. 首先学习基础知识，了解不同类型的RWA资产；2. 从小额投资开始，分散风险；3. 选择信誉良好的平台和项目；4. 关注监管政策变化；5. 定期关注市场动态和行业报告。我们平台提供了丰富的教育资源可以帮助您入门。',
      role: 'assistant',
      timestamp: '2024-01-02T14:02:00Z',
    },
  ],
};

// Mock AI responses for different types of questions
export const mockAIResponses: Record<string, string> = {
  rwa: 'RWA（Real World Assets）是指现实世界资产的代币化，通过区块链技术将传统实物资产转化为数字代币，提高流动性和可访问性。',
  投资: '在RWA投资中，建议您关注资产的基本面、流动性、监管合规性以及平台的安全性。分散投资和风险管理是关键。',
  风险: 'RWA投资的主要风险包括：监管风险、流动性风险、技术风险、市场风险等。建议您在投资前充分了解这些风险。',
  平台: 'RWA Hub致力于为用户提供安全、透明、便捷的RWA服务，包括资产信息、投资分析、社区交流等功能。',
  default:
    '感谢您的提问。我是RWA Hub的AI助手，专门为您解答RWA相关问题。请告诉我您想了解的具体内容，我会尽力为您提供帮助。',
};

export function generateAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('rwa') || lowerMessage.includes('资产')) {
    return mockAIResponses.rwa;
  }
  if (lowerMessage.includes('投资') || lowerMessage.includes('理财')) {
    return mockAIResponses['投资'];
  }
  if (lowerMessage.includes('风险') || lowerMessage.includes('安全')) {
    return mockAIResponses['风险'];
  }
  if (lowerMessage.includes('平台') || lowerMessage.includes('hub')) {
    return mockAIResponses['平台'];
  }

  return mockAIResponses.default;
}

export function getChatSessionById(sessionId: string): ChatSession | null {
  return mockChatSessions.find((session) => session.id === sessionId) || null;
}

// Flatten all messages for API client compatibility
export const mockChatMessages: ChatMessage[] =
  Object.values(mockChatMessagesData).flat();

export function getChatMessagesBySessionId(sessionId: string): ChatMessage[] {
  return mockChatMessagesData[sessionId] || [];
}
