import { Task } from '@/types';

export const mockTasks: Task[] = [
  {
    id: 1,
    title: '完成RWA资产调研报告',
    description:
      '针对当前市场上的RWA资产进行深入调研，撰写详细的分析报告，包括市场现状、发展趋势、风险评估等内容。',
    type: '调研任务',
    status: 'AVAILABLE',
    reward: 500,
    requirements: '具备金融或区块链相关背景，熟悉RWA概念',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    dueDate: '2024-02-01T00:00:00Z',
  },
  {
    id: 2,
    title: '设计RWA Hub用户界面原型',
    description:
      '为RWA Hub平台设计用户友好的界面原型，包括首页、用户中心、任务管理等核心功能页面。',
    type: '设计任务',
    status: 'ASSIGNED',
    reward: 800,
    requirements: '具备UI/UX设计经验，熟悉Figma等设计工具',
    assignedUserId: 2,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    dueDate: '2024-01-20T00:00:00Z',
  },
  {
    id: 3,
    title: '编写智能合约安全审计文档',
    description:
      '对RWA相关智能合约进行安全审计，识别潜在风险点，提供安全建议和改进方案。',
    type: '技术任务',
    status: 'SUBMITTED',
    reward: 1200,
    requirements: '具备智能合约开发和安全审计经验',
    assignedUserId: 3,
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    dueDate: '2024-01-25T00:00:00Z',
  },
  {
    id: 4,
    title: '社区运营策略制定',
    description:
      '制定RWA Hub社区运营策略，包括用户增长、活跃度提升、内容运营等方面的具体方案。',
    type: '运营任务',
    status: 'AVAILABLE',
    reward: 600,
    requirements: '具备社区运营经验，了解Web3社区特点',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    dueDate: '2024-02-15T00:00:00Z',
  },
  {
    id: 5,
    title: 'RWA市场数据分析',
    description:
      '收集和分析RWA市场相关数据，包括交易量、价格趋势、用户行为等，形成数据分析报告。',
    type: '数据分析',
    status: 'COMPLETED',
    reward: 700,
    requirements: '具备数据分析能力，熟悉相关工具',
    assignedUserId: 1,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    dueDate: '2024-01-30T00:00:00Z',
  },
];

export function getTasksByStatus(status?: Task['status']): Task[] {
  if (!status) return mockTasks;
  return mockTasks.filter((task) => task.status === status);
}

export function getTasksByUserId(userId: number): Task[] {
  return mockTasks.filter((task) => task.assignedUserId === userId);
}

export function getTaskById(id: number): Task | null {
  return mockTasks.find((task) => task.id === id) || null;
}
