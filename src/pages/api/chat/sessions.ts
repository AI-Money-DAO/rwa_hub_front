import type { NextApiRequest, NextApiResponse } from 'next';
import { mockChatSessions } from '@/mocks/chat';
import { ApiResponse, ChatSession } from '@/types';

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
  res: NextApiResponse<ApiResponse<ChatSession[] | ChatSession>>
) {
  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: [] as any,
    });
  }

  const token = authHeader.substring(7);
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
      data: [] as any,
    });
  }

  if (req.method === 'GET') {
    try {
      // In a real application, you would filter sessions by userId
      // For mock purposes, return all sessions
      const sessions = [...mockChatSessions];

      // Sort by updated date (most recent first)
      const sortedSessions = sessions.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      res.status(200).json({
        code: 0,
        message: 'Chat sessions retrieved successfully',
        data: sortedSessions,
      });
    } catch (error) {
      console.error('Get chat sessions error:', error);
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: [],
      });
    }
  } else if (req.method === 'POST') {
    try {
      // Create new chat session
      const newSession: ChatSession = {
        id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: '新对话',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messageCount: 0,
      };

      // In a real application, you would save this to database
      mockChatSessions.push(newSession);

      res.status(201).json({
        code: 0,
        message: 'Chat session created successfully',
        data: newSession,
      });
    } catch (error) {
      console.error('Create chat session error:', error);
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: {} as ChatSession,
      });
    }
  } else {
    res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: [] as any,
    });
  }
}
