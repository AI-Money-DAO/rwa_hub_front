import type { NextApiRequest, NextApiResponse } from 'next';
import { getChatMessagesBySessionId } from '@/mocks/chat';
import { ApiResponse, ChatMessage } from '@/types';

// Helper function to extract user ID from token
function getUserIdFromToken(token: string): number | null {
  if (!token.startsWith('mock-jwt-token-')) {
    return null;
  }
  const tokenParts = token.split('-');
  const userId = parseInt(tokenParts[3]);
  return isNaN(userId) ? null : userId;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ChatMessage[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: [],
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: [],
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: [],
      });
    }

    const sessionId = req.query.sessionId as string;

    if (!sessionId) {
      return res.status(400).json({
        code: 400,
        message: 'Session ID is required',
        data: [],
      });
    }

    // Get chat messages for the session
    const messages = getChatMessagesBySessionId(sessionId);

    // Sort messages by timestamp
    const sortedMessages = messages.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    res.status(200).json({
      code: 0,
      message: 'Chat history retrieved successfully',
      data: sortedMessages,
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: [],
    });
  }
}
