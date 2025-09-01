import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  Rocket,
} from 'lucide-react';

const opportunities = [
  {
    icon: Briefcase,
    title: '职业发展',
    description: '加入我们的团队，在RWA领域开启您的职业生涯',
    action: '查看职位',
    link: '/careers',
    color: 'blue',
  },
  {
    icon: Users,
    title: '社区贡献',
    description: '成为社区贡献者，分享您的专业知识和经验',
    action: '加入社区',
    link: '/community',
    color: 'green',
  },
  {
    icon: GraduationCap,
    title: '学习成长',
    description: '参与我们的教育项目，提升RWA投资技能',
    action: '开始学习',
    link: '/education',
    color: 'purple',
  },
  {
    icon: Rocket,
    title: '创新合作',
    description: '与我们合作开发创新的RWA解决方案',
    action: '了解详情',
    link: '/innovation',
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export function JoinUsSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            加入我们
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            无论您是专业投资者、技术专家还是RWA爱好者，
            我们都为您提供了参与和贡献的机会。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {opportunities.map((opportunity, index) => {
            const Icon = opportunity.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[opportunity.color as keyof typeof colorClasses]}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {opportunity.description}
                      </p>
                      <Button variant="outline" className="group" asChild>
                        <a href={opportunity.link}>
                          {opportunity.action}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              准备好开始了吗？
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              立即注册RWA Hub账户，开始您的RWA投资之旅。
              我们的AI助手将为您提供个性化的投资建议和市场洞察。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group" asChild>
                <Link href="/auth/register">
                  立即注册
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/auth/login">已有账户？登录</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
