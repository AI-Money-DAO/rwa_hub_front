import type { NextApiRequest, NextApiResponse } from 'next';
import { mockTasks } from '@/mocks/tasks';
import { ApiResponse, Task } from '@/types';

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
  res: NextApiResponse<ApiResponse<Task>>
) {
  // Check authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: {} as Task,
    });
  }

  const token = authHeader.substring(7);
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
      data: {} as Task,
    });
  }

  if (req.method === 'GET') {
    try {
      const taskId = parseInt(req.query.id as string);

      if (isNaN(taskId)) {
        return res.status(400).json({
          code: 400,
          message: 'Invalid task ID',
          data: {} as Task,
        });
      }

      const task = mockTasks.find((t) => t.id === taskId);

      if (!task) {
        return res.status(404).json({
          code: 404,
          message: 'Task not found',
          data: {} as Task,
        });
      }

      res.status(200).json({
        code: 0,
        message: 'Task retrieved successfully',
        data: task,
      });
    } catch (error) {
      console.error('Get task error:', error);
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: {} as Task,
      });
    }
  } else {
    res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as Task,
    });
  }
}
