import type { NextApiRequest, NextApiResponse } from 'next';
import { findUserByUsername, findUserByEmail, mockUsers } from '@/mocks/users';
import { ApiResponse } from '@/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<{ message: string }>>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: { message: 'Method not allowed' },
    });
  }

  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({
        code: 400,
        message: 'Username, email, and password are required',
        data: { message: 'Missing required fields' },
      });
    }

    // Check if username already exists
    if (findUserByUsername(username)) {
      return res.status(409).json({
        code: 409,
        message: 'Username already exists',
        data: { message: 'Username already taken' },
      });
    }

    // Check if email already exists
    if (findUserByEmail(email)) {
      return res.status(409).json({
        code: 409,
        message: 'Email already exists',
        data: { message: 'Email already registered' },
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        code: 400,
        message: 'Password must be at least 6 characters long',
        data: { message: 'Password too weak' },
      });
    }

    // In a real application, you would:
    // 1. Hash the password
    // 2. Save to database
    // 3. Send verification email

    // For mock purposes, we'll just simulate success
    const newUser = {
      id: mockUsers.length + 1,
      username,
      nickname: username,
      email,
      role: 'user',
      points: 100, // Welcome bonus
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In real app, this would be saved to database
    mockUsers.push(newUser);

    res.status(201).json({
      code: 0,
      message:
        'Registration successful. Please check your email for verification.',
      data: { message: 'User registered successfully' },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
      data: { message: 'Registration failed' },
    });
  }
}
