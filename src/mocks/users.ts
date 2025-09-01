import { User, LoginResponse } from '@/types';

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    nickname: '管理员',
    email: 'admin@rwahub.com',
    avatarUrl: '/avatars/admin.jpg',
    role: 'admin',
    points: 10000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    username: 'user1',
    nickname: '用户一',
    email: 'user1@example.com',
    avatarUrl: '/avatars/user1.jpg',
    role: 'user',
    points: 1500,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    username: 'user2',
    nickname: '用户二',
    email: 'user2@example.com',
    role: 'user',
    points: 2300,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
];

export const mockLoginResponse: LoginResponse = {
  token: 'mock-jwt-token-12345',
  userId: 1,
  username: 'admin',
  nickname: '管理员',
  email: 'admin@rwahub.com',
  avatarUrl: '/avatars/admin.jpg',
  role: 'admin',
  points: 10000,
};

export function findUserByCredentials(
  username: string,
  password: string
): User | null {
  // Mock authentication - in real app, this would be handled by backend
  if (username === 'admin' && password === 'admin123') {
    return mockUsers[0];
  }
  if (username === 'user1' && password === 'user123') {
    return mockUsers[1];
  }
  if (username === 'user2' && password === 'user123') {
    return mockUsers[2];
  }
  return null;
}

export function findUserByUsername(username: string): User | null {
  return mockUsers.find((user) => user.username === username) || null;
}

export function findUserByEmail(email: string): User | null {
  return mockUsers.find((user) => user.email === email) || null;
}
