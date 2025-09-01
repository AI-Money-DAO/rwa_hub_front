import type { NextApiRequest, NextApiResponse } from 'next';
import { getPointTransactionsByUserId } from '@/mocks/points';
import { ApiResponse, PaginatedResponse, PointTransaction } from '@/types';

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
  res: NextApiResponse<ApiResponse<PaginatedResponse<PointTransaction>>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as PaginatedResponse<PointTransaction>,
    });
  }

  try {
    // Check authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
        data: {} as PaginatedResponse<PointTransaction>,
      });
    }

    const token = authHeader.substring(7);
    const userId = getUserIdFromToken(token);

    if (!userId) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid token',
        data: {} as PaginatedResponse<PointTransaction>,
      });
    }

    // Parse query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Get user's point transactions
    const allTransactions = getPointTransactionsByUserId(userId);

    // Sort by creation date (newest first)
    const sortedTransactions = allTransactions.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTransactions = sortedTransactions.slice(
      startIndex,
      endIndex
    );

    const response: PaginatedResponse<PointTransaction> = {
      items: paginatedTransactions,
      total: sortedTransactions.length,
      page,
      limit,
      totalPages: Math.ceil(sortedTransactions.length / limit),
    };

    res.status(200).json({
      code: 0,
      message: 'Point history retrieved successfully',
      data: response,
    });
  } catch (error) {
    console.error('Get point history error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {} as PaginatedResponse<PointTransaction>,
    });
  }
}
