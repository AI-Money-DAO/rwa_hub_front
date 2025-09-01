import Head from 'next/head';
import { AuthStatus } from '@/components/auth/AuthStatus';
import { AISearchBox } from '@/components/features/AISearchBox';
import { ServiceCards } from '@/components/features/ServiceCards';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Star,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>RWA Hub - 专业的RWA资产服务平台</title>
        <meta
          name="description"
          content="RWA Hub是专业的RWA资产服务平台，提供资产信息查询、投资分析、社区交流等服务"
        />
      </Head>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full -translate-x-36 -translate-y-36 blur-3xl"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full translate-x-48 -translate-y-48 blur-3xl"></div>
            <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-indigo-200/30 rounded-full -translate-x-40 translate-y-40 blur-3xl"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20">
            {/* Auth Status for testing */}
            <div className="mb-8">
              <AuthStatus />
            </div>

            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 mb-8">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  专业的RWA投资平台
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                欢迎来到{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RWA Hub
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                专业的RWA（Real World Assets）资产服务平台
                <br />
                <span className="text-lg text-gray-500">
                  通过AI技术和专业团队，让RWA投资变得简单、安全、高效
                </span>
              </p>

              {/* AI Search Box */}
              <div className="max-w-3xl mx-auto mb-16">
                <AISearchBox />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
                {[
                  { number: '10K+', label: '活跃用户' },
                  { number: '500+', label: '合作伙伴' },
                  { number: '99.9%', label: '系统稳定性' },
                  { number: '24/7', label: 'AI服务' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                我们的服务
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                RWA Hub为您提供全方位的RWA投资服务，从市场分析到社区交流，
                让您在RWA投资路上更加从容
              </p>
            </div>
            <ServiceCards />
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                探索更多
              </h2>
              <p className="text-xl text-gray-600">了解RWA Hub的更多信息</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Link href="/about" className="group">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    关于我们
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    了解RWA Hub的使命、愿景和团队
                  </p>
                  <div className="flex items-center justify-center text-blue-600 group-hover:translate-x-2 transition-transform">
                    <span className="font-medium">了解更多</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/partners" className="group">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    合作伙伴
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    查看我们的战略合作伙伴网络
                  </p>
                  <div className="flex items-center justify-center text-green-600 group-hover:translate-x-2 transition-transform">
                    <span className="font-medium">查看详情</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>

              <Link href="/join" className="group">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    加入我们
                  </h3>
                  <p className="text-gray-600 mb-6 text-center">
                    成为RWA Hub社区的一员
                  </p>
                  <div className="flex items-center justify-center text-purple-600 group-hover:translate-x-2 transition-transform">
                    <span className="font-medium">立即加入</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                准备开始您的RWA投资之旅？
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                立即注册账户，体验专业的RWA投资服务，与全球投资者一起探索RWA的无限可能
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                {['专业分析', '安全保障', '7x24服务'].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-blue-100"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 group px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/auth/register">
                    立即注册
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg"
                  asChild
                >
                  <Link href="/auth/login">已有账户？登录</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
