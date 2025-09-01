import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByCredentials } from '@/mocks/users';
import { ApiResponse, LoginResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<LoginResponse>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: {} as LoginResponse,
    });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: 'Username and password are required',
        data: {} as LoginResponse,
      });
    }

    const user = findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'Invalid credentials',
        data: {} as LoginResponse,
      });
    }

    // Generate mock JWT token
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    const loginResponse: LoginResponse = {
      token,
      userId: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      avatarUrl: user.avatarUrl,
      role: user.role,
      points: user.points,
    };

    res.status(200).json({
      code: 0,
      message: 'Login successful',
      data: loginResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: {} as LoginResponse,
    });
  }
}
