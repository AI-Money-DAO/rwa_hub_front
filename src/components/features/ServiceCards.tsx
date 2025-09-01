import { BarChart3, Users, Coins, TrendingUp, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: BarChart3,
    title: '资产分析',
    description: '深入的RWA资产分析和市场洞察，帮助您做出明智的投资决策',
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Users,
    title: '社区交流',
    description: '与专业投资者和专家交流经验，分享RWA投资心得',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
  },
  {
    icon: Coins,
    title: '任务奖励',
    description: '完成平台任务获得积分奖励，参与社区建设',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: TrendingUp,
    title: '市场趋势',
    description: '实时跟踪RWA市场动态，把握投资机会',
    gradient: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    icon: Shield,
    title: '安全保障',
    description: '多重安全机制保护您的资产和隐私安全',
    gradient: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
  },
  {
    icon: Zap,
    title: '快速响应',
    description: '7x24小时AI助手服务，随时解答您的疑问',
    gradient: 'from-yellow-500 to-amber-500',
    bgColor: 'bg-yellow-50',
  },
];

export function ServiceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card
            key={index}
            className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg overflow-hidden"
          >
            <CardContent className="p-0">
              <div
                className={`${service.bgColor} p-6 relative overflow-hidden`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {service.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
