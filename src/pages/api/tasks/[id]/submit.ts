import type { NextApiRequest, NextApiResponse } from 'next';
import { mockTasks } from '@/mocks/tasks';
import { ApiResponse, SubmitTaskRequest } from '@/types';

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

    const { submissionContent, attachments }: SubmitTaskRequest = req.body;

    // Validation
    if (!submissionContent) {
      return res.status(400).json({
        code: 400,
        message: 'Submission content is required',
        data: 'Missing submission content',
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

    // Check if task is in correct status
    if (task.status !== 'ASSIGNED') {
      return res.status(400).json({
        code: 400,
        message: 'Task cannot be submitted in current status',
        data: 'Invalid status for submission',
      });
    }

    // Update task status to submitted
    mockTasks[taskIndex] = {
      ...task,
      status: 'SUBMITTED',
      updatedAt: new Date().toISOString(),
    };

    // In a real application, you would:
    // 1. Store the submission content and attachments
    // 2. Notify administrators for review
    // 3. Create a submission record

    res.status(200).json({
      code: 0,
      message: 'Task submitted successfully. Awaiting review.',
      data: 'Task submitted',
    });
  } catch (error) {
    console.error('Submit task error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: 'Submission failed',
    });
  }
}
