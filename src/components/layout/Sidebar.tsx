import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import {
  Home,
  User,
  CheckSquare,
  Coins,
  MessageSquare,
  Settings,
  HelpCircle,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();

  const navigation = [
    {
      name: '仪表板',
      href: '/dashboard',
      icon: Home,
      current: router.pathname === '/dashboard',
    },
    {
      name: '个人资料',
      href: '/dashboard/profile',
      icon: User,
      current: router.pathname === '/dashboard/profile',
    },
    {
      name: '任务管理',
      href: '/dashboard/tasks',
      icon: CheckSquare,
      current: router.pathname.startsWith('/dashboard/tasks'),
    },
    {
      name: '积分管理',
      href: '/dashboard/points',
      icon: Coins,
      current: router.pathname.startsWith('/dashboard/points'),
    },
    {
      name: 'AI对话',
      href: '/chat',
      icon: MessageSquare,
      current: router.pathname.startsWith('/chat'),
    },
  ];

  const secondaryNavigation = [
    {
      name: '设置',
      href: '/dashboard/settings',
      icon: Settings,
    },
    {
      name: '帮助',
      href: '/help',
      icon: HelpCircle,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.nickname?.[0] || user?.username?.[0] || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.nickname || user?.username || '用户'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              积分: {user?.points || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="pt-6 mt-6 border-t border-gray-200">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">RWA Hub v1.0.0</div>
      </div>
    </div>
  );
};

export default Sidebar;
