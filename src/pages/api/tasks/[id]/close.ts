import type { NextApiRequest, NextApiResponse } from 'next';
import { mockTasks } from '@/mocks/tasks';
import { ApiResponse } from '@/types';

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
  res: NextApiResponse<ApiResponse<string>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: 'Method not allowed',
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: 'No token provided',
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: 'Invalid token',
      });
    }

    const taskId = parseInt(req.query.id as string);

    if (isNaN(taskId)) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid task ID',
        data: 'Invalid task ID',
      });
    }

    // Find task
    const taskIndex = mockTasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({
        code: 404,
        message: 'Task not found',
        data: 'Task not found',
      });
    }

    const task = mockTasks[taskIndex];

    // Check if task is assigned to the user
    if (task.assignedUserId !== userId) {
      return res.status(403).json({
        code: 403,
        message: 'Task is not assigned to you',
        data: 'Not assigned to user',
      });
    }

    // Check if task can be closed
    if (task.status === 'CLOSED' || task.status === 'COMPLETED') {
      return res.status(400).json({
        code: 400,
        message: 'Task is already closed or completed',
        data: 'Task already closed',
      });
    }

    // Close the task
    mockTasks[taskIndex] = {
      ...task,
      status: 'CLOSED',
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
      code: 0,
      message: 'Task closed successfully',
      data: 'Task closed',
    });
  } catch (error) {
    console.error('Close task error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: 'Close task failed',
    });
  }
}
