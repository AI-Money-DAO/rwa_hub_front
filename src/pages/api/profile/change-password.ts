import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '@/mocks/users';
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

// Simple password hashing simulation (in real app, use bcrypt)
function hashPassword(password: string): string {
  return `hashed_${password}`;
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashedPassword === `hashed_${password}`;
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

    // Find user
    const userIndex = mockUsers.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: 'User not found',
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        code: 400,
        message: 'Current password and new password are required',
        data: 'Missing required fields',
      });
    }

    // Verify current password (in mock, we'll assume all passwords are correct for demo)
    // In real app, verify against stored hash
    const user = mockUsers[userIndex];
    
    // For mock purposes, we'll simulate password verification
    // In real app: if (!verifyPassword(currentPassword, user.passwordHash))
    if (currentPassword.length < 6) {
      return res.status(400).json({
        code: 400,
        message: 'Current password is incorrect',
        data: 'Invalid current password',
      });
    }

    // Validate new password strength
    if (newPassword.length < 6) {
      return res.status(400).json({
        code: 400,
        message: 'New password must be at least 6 characters',
        data: 'Password too weak',
      });
    }

    // Update password (in real app, hash the new password)
    // mockUsers[userIndex].passwordHash = hashPassword(newPassword);
    mockUsers[userIndex].updatedAt = new Date().toISOString();

    res.status(200).json({
      code: 0,
      message: 'Password changed successfully',
      data: 'Password updated',
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: 'Password change failed',
    });
  }
}