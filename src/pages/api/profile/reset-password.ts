import type { NextApiRequest, NextApiResponse } from 'next';
import { mockUsers } from '@/mocks/users';
import { ApiResponse } from '@/types';

// Simple password hashing simulation (in real app, use bcrypt)
function hashPassword(password: string): string {
  return `hashed_${password}`;
}

// Mock verification codes storage (in real app, use Redis or database)
const verificationCodes = new Map<string, { code: string; expires: number }>();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<string>>
) {
  if (req.method === 'POST') {
    // Request password reset
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        code: 400,
        message: 'Email is required',
        data: 'Missing email',
      });
    }

    // Find user by email
    const user = mockUsers.find((u) => u.email === email);
    if (!user) {
      // Don't reveal if email exists for security
      return res.status(200).json({
        code: 0,
        message: 'If the email exists, a reset code has been sent',
        data: 'Reset code sent',
      });
    }

    // Generate verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 15 * 60 * 1000; // 15 minutes

    verificationCodes.set(email, { code, expires });

    // In real app, send email with verification code
    console.log(`Password reset code for ${email}: ${code}`);

    return res.status(200).json({
      code: 0,
      message: 'Reset code sent to your email',
      data: `Reset code: ${code}`, // Only for demo, don't return in real app
    });
  } else if (req.method === 'PUT') {
    // Confirm password reset
    const { email, verificationCode, newPassword } = req.body;

    if (!email || !verificationCode || !newPassword) {
      return res.status(400).json({
        code: 400,
        message: 'Email, verification code, and new password are required',
        data: 'Missing required fields',
      });
    }

    // Verify code
    const storedCode = verificationCodes.get(email);
    if (!storedCode || storedCode.code !== verificationCode || storedCode.expires < Date.now()) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid or expired verification code',
        data: 'Invalid verification code',
      });
    }

    // Find user
    const userIndex = mockUsers.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      return res.status(404).json({
        code: 404,
        message: 'User not found',
        data: 'User not found',
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({
        code: 400,
        message: 'New password must be at least 6 characters',
        data: 'Password too weak',
      });
    }

    // Update password
    // mockUsers[userIndex].passwordHash = hashPassword(newPassword);
    mockUsers[userIndex].updatedAt = new Date().toISOString();

    // Remove used verification code
    verificationCodes.delete(email);

    return res.status(200).json({
      code: 0,
      message: 'Password reset successfully',
      data: 'Password updated',
    });
  } else {
    return res.status(405).json({
      code: 405,
      message: 'Method not allowed',
      data: 'Method not allowed',
    });
  }
}