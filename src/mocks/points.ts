import { PointTransaction, PointBalance } from '@/types';

export const mockPointTransactions: PointTransaction[] = [
  {
    id: 1,
    userId: 1,
    amount: 700,
    type: 'TASK_REWARD',
    description: '完成任务：RWA市场数据分析',
    referenceId: 5,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    userId: 1,
    amount: 1000,
    type: 'TASK_REWARD',
    description: '完成任务：平台初始化奖励',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 3,
    userId: 2,
    amount: 500,
    type: 'TASK_REWARD',
    description: '完成任务：用户注册奖励',
    createdAt: '2024-01-02T08:15:00Z',
  },
  {
    id: 4,
    userId: 2,
    amount: 800,
    type: 'TASK_REWARD',
    description: '领取任务：设计RWA Hub用户界面原型',
    referenceId: 2,
    createdAt: '2024-01-05T14:20:00Z',
  },
  {
    id: 5,
    userId: 3,
    amount: 300,
    type: 'TASK_REWARD',
    description: '完成任务：用户注册奖励',
    createdAt: '2024-01-03T09:45:00Z',
  },
  {
    id: 6,
    userId: 1,
    amount: -200,
    type: 'REDEMPTION',
    description: '兑换：平台会员特权',
    createdAt: '2024-01-10T16:00:00Z',
  },
];

export const mockPointBalances: PointBalance[] = [
  {
    userId: 1,
    balance: 10000,
    totalEarned: 10200,
    totalSpent: 200,
  },
  {
    userId: 2,
    balance: 1500,
    totalEarned: 1500,
    totalSpent: 0,
  },
  {
    userId: 3,
    balance: 2300,
    totalEarned: 2300,
    totalSpent: 0,
  },
];

export function getPointTransactionsByUserId(
  userId: number
): PointTransaction[] {
  return mockPointTransactions.filter(
    (transaction) => transaction.userId === userId
  );
}

export function getPointBalanceByUserId(userId: number): PointBalance | null {
  return mockPointBalances.find((balance) => balance.userId === userId) || null;
}
