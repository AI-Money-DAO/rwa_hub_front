import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { RequireAuth } from '@/components/auth/AuthGuard';
import { useAuth, useIsAdmin } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { PointBalance, Task, PointTransaction, PaginatedResponse } from '@/types';

interface DashboardStats {
  pointBalance: PointBalance | null;
  recentTasks: Task[];
  recentTransactions: PointTransaction[];
  taskCounts: {
    available: number;
    assigned: number;
    completed: number;
  };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [stats, setStats] = useState<DashboardStats>({
    pointBalance: null,
    recentTasks: [],
    recentTransactions: [],
    taskCounts: { available: 0, assigned: 0, completed: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch point balance
        const pointBalanceResponse = await apiClient.getPointsBalance();
        
        // Fetch recent point transactions (last 5)
        const transactionsResponse = await apiClient.getPointsHistory({ page: 1, limit: 5 });

        // Fetch tasks for statistics
        const tasksResponse = await apiClient.getTasks({ page: 1, limit: 50 });
        const tasksData = tasksResponse.data as PaginatedResponse<Task>;
        const allTasks = tasksData.items;

        // Calculate task counts
        const taskCounts = {
          available: allTasks.filter((task: Task) => task.status === 'AVAILABLE').length,
          assigned: allTasks.filter((task: Task) => task.status === 'ASSIGNED' && task.assignedUserId === user?.id).length,
          completed: allTasks.filter((task: Task) => task.status === 'COMPLETED' && task.assignedUserId === user?.id).length,
        };

        // Get recent tasks (available tasks)
        const recentTasks = allTasks
          .filter((task: Task) => task.status === 'AVAILABLE')
          .sort((a: Task, b: Task) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);

        const transactionsData = transactionsResponse.data as PaginatedResponse<PointTransaction>;

        setStats({
          pointBalance: pointBalanceResponse.data as PointBalance,
          recentTasks,
          recentTransactions: transactionsData.items,
          taskCounts
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('加载仪表板数据失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <RequireAuth>
      <Head>
        <title>仪表板 - RWA Hub</title>
        <meta name="description" content="RWA Hub用户仪表板" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RWA</span>
                </div>
                <h1 className="ml-3 text-xl font-semibold text-gray-900">
                  仪表板
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Welcome Section */}
            <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  欢迎回来，{user?.nickname || user?.username}！
                </h2>
                <p className="text-gray-600">
                  这是您的个人仪表板，您可以在这里管理您的账户和查看相关信息。
                </p>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-lg shadow p-8 text-center mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">加载仪表板数据中...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Stats Grid */}
            {!loading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            积分余额
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.pointBalance?.balance || user?.points || 0}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            可用任务
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.taskCounts.available}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-yellow-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            进行中任务
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.taskCounts.assigned}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            已完成任务
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            {stats.taskCounts.completed}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {!loading && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      快速操作
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link href="/dashboard/tasks" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left block">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 text-blue-600 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            查看任务
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">浏览可用任务</p>
                      </Link>

                      <Link href="/dashboard/points/history" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left block">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 text-green-600 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            积分历史
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">查看积分记录</p>
                      </Link>

                      <Link href="/" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left block">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 text-purple-600 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">AI对话</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">与AI助手聊天</p>
                      </Link>

                      <Link href="/dashboard/profile" className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left block">
                        <div className="flex items-center">
                          <svg
                            className="w-6 h-6 text-orange-600 mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            个人资料
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">编辑个人信息</p>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      最近活动
                    </h3>
                    {stats.recentTransactions.length > 0 ? (
                      <div className="space-y-3">
                        {stats.recentTransactions.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-3 ${
                                transaction.type === 'TASK_REWARD' ? 'bg-green-400' :
                                transaction.type === 'REDEMPTION' ? 'bg-red-400' : 'bg-blue-400'
                              }`}></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {transaction.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {new Date(transaction.createdAt).toLocaleDateString('zh-CN')}
                                </p>
                              </div>
                            </div>
                            <span className={`text-sm font-medium ${
                              transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                            </span>
                          </div>
                        ))}
                        <Link href="/dashboard/points/history" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          查看全部积分历史 →
                        </Link>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">暂无积分记录</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Recent Tasks */}
            {!loading && !error && stats.recentTasks.length > 0 && (
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    最新任务
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.recentTasks.map((task) => (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {task.reward} 积分
                          </span>
                          <Link href={`/dashboard/tasks/${task.id}`} className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            查看详情
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/dashboard/tasks" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      查看所有任务 →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Section */}
            {!loading && !error && isAdmin && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-yellow-800 mb-2">
                    管理员功能
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    您拥有管理员权限，可以访问以下功能：
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/dashboard/tasks/create" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      创建任务
                    </Link>
                    <Link href="/dashboard/admin/users" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      用户管理
                    </Link>
                    <Link href="/dashboard/admin/tasks" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors">
                      任务管理
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
