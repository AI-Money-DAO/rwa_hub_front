import type { NextApiRequest, NextApiResponse } from 'next';
import { getPointBalanceByUserId } from '@/mocks/points';
import { mockUsers } from '@/mocks/users';
import { ApiResponse, PointBalance } from '@/types';

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
  res: NextApiResponse<ApiResponse<PointBalance>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as PointBalance,
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: {} as PointBalance,
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: {} as PointBalance,
      });
    }

    // Get user's point balance
    let pointBalance = getPointBalanceByUserId(userId);

    // If no balance record exists, create one from user data
    if (!pointBalance) {
      const user = mockUsers.find((u) => u.id === userId);
      if (!user) {
        return res.status(404).json({
          code: 404,
          message: 'User not found',
          data: {} as PointBalance,
        });
      }

      pointBalance = {
        userId,
        balance: user.points,
        totalEarned: user.points,
        totalSpent: 0,
      };
    }

    res.status(200).json({
      code: 0,
      message: 'Point balance retrieved successfully',
      data: pointBalance,
    });
  } catch (error) {
    console.error('Get point balance error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {} as PointBalance,
    });
  }
}
