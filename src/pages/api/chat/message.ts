import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAIResponse, mockChatSessions } from '@/mocks/chat';
import { ApiResponse, ChatRequest, ChatResponse } from '@/types';

// Helper function to extract user ID from token
function getUserIdFromToken(token: string): number | null {
  if (!token.startsWith('mock-jwt-token-')) {
    return null;
  }
  const tokenParts = token.split('-');
  const userId = parseInt(tokenParts[3]);
  return isNaN(userId) ? null : userId;
}

// Helper function to generate session ID
function generateSessionId(): string {
  return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ChatResponse>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as ChatResponse,
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: {} as ChatResponse,
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: {} as ChatResponse,
      });
    }

    const { message, sessionId }: ChatRequest = req.body;

    // Validation
    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        code: 400,
        message: 'Message content is required',
        data: {} as ChatResponse,
      });
    }

    // Use existing session ID or generate new one
    const currentSessionId = sessionId || generateSessionId();

    // Generate AI response based on message content
    const aiReply = generateAIResponse(message);

    // Simulate AI processing delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 2000)
    );

    // In a real application, you would:
    // 1. Save the user message to database
    // 2. Process the message with actual AI service
    // 3. Save the AI response to database
    // 4. Update session metadata

    const response: ChatResponse = {
      reply: aiReply,
      sessionId: currentSessionId,
    };

    res.status(200).json({
      code: 0,
      message: 'Message processed successfully',
      data: response,
    });
  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {} as ChatResponse,
    });
  }
}
