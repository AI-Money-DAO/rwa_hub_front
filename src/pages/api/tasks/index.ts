import type { NextApiRequest, NextApiResponse } from 'next';
import { mockTasks } from '@/mocks/tasks';
import { mockUsers } from '@/mocks/users';
import {
  ApiResponse,
  PaginatedResponse,
  Task,
  CreateTaskRequest,
  TaskFilters,
} from '@/types';

// Helper function to extract user ID from token
function getUserIdFromToken(token: string): number | null {
  if (!token.startsWith('mock-jwt-token-')) {
    return null;
  }
  const tokenParts = token.split('-');
  const userId = parseInt(tokenParts[3]);
  return isNaN(userId) ? null : userId;
}

// Helper function to check if user is admin
function isUserAdmin(userId: number): boolean {
  const user = mockUsers.find((u) => u.id === userId);
  return user?.role === 'admin';
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<PaginatedResponse<Task> | Task>>
) {
  // Check authorization for all methods
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      code: 401,
      message: 'Unauthorized',
      data: {} as any,
    });
  }

  const token = authHeader.substring(7);
  const userId = getUserIdFromToken(token);

  if (!userId) {
    return res.status(401).json({
      code: 401,
      message: 'Invalid token',
      data: {} as any,
    });
  }

  if (req.method === 'GET') {
    try {
      // Parse query parameters
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as Task['status'];
      const type = req.query.type as string;
      const minReward = req.query.minReward
        ? parseInt(req.query.minReward as string)
        : undefined;
      const maxReward = req.query.maxReward
        ? parseInt(req.query.maxReward as string)
        : undefined;

      // Apply filters
      let filteredTasks = [...mockTasks];

      if (status) {
        filteredTasks = filteredTasks.filter((task) => task.status === status);
      }

      if (type) {
        filteredTasks = filteredTasks.filter((task) => task.type === type);
      }

      if (minReward !== undefined) {
        filteredTasks = filteredTasks.filter(
          (task) => task.reward >= minReward
        );
      }

      if (maxReward !== undefined) {
        filteredTasks = filteredTasks.filter(
          (task) => task.reward <= maxReward
        );
      }

      // Apply pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

      const response: PaginatedResponse<Task> = {
        items: paginatedTasks,
        total: filteredTasks.length,
        page,
        limit,
        totalPages: Math.ceil(filteredTasks.length / limit),
      };

      res.status(200).json({
        code: 0,
        message: 'Tasks retrieved successfully',
        data: response,
      });
    } catch (error) {
      console.error('Get tasks error:', error);
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: {} as any,
      });
    }
  } else if (req.method === 'POST') {
    try {
      // Check if user is admin
      if (!isUserAdmin(userId)) {
        return res.status(403).json({
          code: 403,
          message: 'Forbidden: Admin access required',
          data: {} as any,
        });
      }

      const { title, description, points }: CreateTaskRequest = req.body;

      // Validation
      if (!title || !description || !points) {
        return res.status(400).json({
          code: 400,
          message: 'Title, description, and points are required',
          data: {} as any,
        });
      }

      if (points <= 0) {
        return res.status(400).json({
          code: 400,
          message: 'Points must be greater than 0',
          data: {} as any,
        });
      }

      // Create new task
      const newTask: Task = {
        id: Math.max(...mockTasks.map((t) => t.id)) + 1,
        title,
        description,
        type: '管理员任务', // Default type for admin-created tasks
        status: 'AVAILABLE',
        reward: points,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add to mock data
      mockTasks.push(newTask);

      res.status(201).json({
        code: 0,
        message: 'Task created successfully',
        data: newTask,
      });
    } catch (error) {
      console.error('Create task error:', error);
      res.status(500).json({
        code: 500,
        message: 'Internal server error',
        data: {} as any,
      });
    }
  } else {
    res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as any,
    });
  }
}
