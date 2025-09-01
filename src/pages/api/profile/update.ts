import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '@/mocks/users';
import {
  ApiResponse,
  ProfileUpdateResult,
  UpdateProfileRequest,
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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<ProfileUpdateResult>>
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {
        success: false,
        message: 'Method not allowed',
        updatedFields: [],
      },
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: {
          success: false,
          message: 'No token provided',
          updatedFields: [],
        },
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: { success: false, message: 'Invalid token', updatedFields: [] },
      });
    }

    // Find user
    const userIndex = mockUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: { success: false, message: 'User not found', updatedFields: [] },
      });
    }

    const updateData: UpdateProfileRequest = req.body;
    const updatedFields: string[] = [];

    // Validate and update fields
    if (updateData.username) {
      // Check if username is already taken by another user
      const existingUser = mockUsers.find(
        (user) => user.username === updateData.username && user.id !== userId
      );
      if (existingUser) {
        return res.status(409).json({
          code: 409,
          message: 'Username already taken',
          data: {
            success: false,
            message: 'Username already exists',
            updatedFields: [],
          },
        });
      }
      mockUsers[userIndex].username = updateData.username;
      updatedFields.push('username');
    }

    if (updateData.nickname) {
      mockUsers[userIndex].nickname = updateData.nickname;
      updatedFields.push('nickname');
    }

    if (updateData.email) {
      // Check if email is already taken by another user
      const existingUser = mockUsers.find(
        (user) => user.email === updateData.email && user.id !== userId
      );
      if (existingUser) {
        return res.status(409).json({
          code: 409,
          message: 'Email already taken',
          data: {
            success: false,
            message: 'Email already exists',
            updatedFields: [],
          },
        });
      }

      // In real app, would require email verification
      if (updateData.emailVerificationCode) {
        // Mock verification - in real app, verify the code
        if (updateData.emailVerificationCode === '123456') {
          mockUsers[userIndex].email = updateData.email;
          updatedFields.push('email');
        } else {
          return res.status(400).json({
            code: 400,
            message: 'Invalid verification code',
            data: {
              success: false,
              message: 'Invalid verification code',
              updatedFields: [],
            },
          });
        }
      } else {
        return res.status(400).json({
          code: 400,
          message: 'Email verification code required',
          data: {
            success: false,
            message: 'Verification code required',
            updatedFields: [],
          },
        });
      }
    }

    // Update timestamp
    mockUsers[userIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
      code: 0,
      message: 'Profile updated successfully',
      data: {
        success: true,
        message: `Updated ${updatedFields.join(', ')}`,
        updatedFields,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: { success: false, message: 'Update failed', updatedFields: [] },
    });
  }
}
