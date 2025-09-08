import React from 'react';
import Head from 'next/head';
import { MessageCircle, Users, Star, TrendingUp, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CommunityPage() {
  return (
    <>
      <Head>
        <title>社区 - RWA Hub</title>
        <meta
          name="description"
          content="加入RWA Hub社区，与专业投资者和专家交流RWA投资经验，分享心得体会"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48 blur-3xl"></div>
          </div>

          <div className="relative container mx-auto px-4 py-20">
            <div className="text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">RWA Hub 社区</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                与专业投资者
                <br />
                <span className="text-yellow-300">共同成长</span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                加入RWA Hub社区，与来自全球的RWA投资专家、分析师和爱好者交流经验，
                分享投资心得，共同探索RWA投资的无限可能
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  立即加入社区
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  浏览社区内容
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">活跃用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">专业投资者</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">2K+</div>
                <div className="text-gray-600">每日讨论</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">50+</div>
                <div className="text-gray-600">RWA项目</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                社区特色功能
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                丰富的社区功能，让您的RWA投资之路更加精彩
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">实时讨论</h3>
                <p className="text-gray-600 mb-6">
                  与社区成员实时交流RWA市场动态、投资策略和项目分析
                </p>
                <Button variant="outline" className="w-full">
                  参与讨论
                </Button>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">市场分析</h3>
                <p className="text-gray-600 mb-6">
                  专业分析师分享深度市场分析报告和投资机会洞察
                </p>
                <Button variant="outline" className="w-full">
                  查看分析
                </Button>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">专家问答</h3>
                <p className="text-gray-600 mb-6">
                  向RWA领域专家提问，获得专业的投资建议和指导
                </p>
                <Button variant="outline" className="w-full">
                  提问专家
                </Button>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">项目评级</h3>
                <p className="text-gray-600 mb-6">
                  社区成员共同评价RWA项目，分享投资经验和风险提示
                </p>
                <Button variant="outline" className="w-full">
                  查看评级
                </Button>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">活动日历</h3>
                <p className="text-gray-600 mb-6">
                  参加线上线下活动，包括投资分享会、项目路演等
                </p>
                <Button variant="outline" className="w-full">
                  查看活动
                </Button>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">成就系统</h3>
                <p className="text-gray-600 mb-6">
                  通过参与社区活动获得成就徽章和积分奖励
                </p>
                <Button variant="outline" className="w-full">
                  查看成就
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Discussions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                热门讨论
              </h2>
              <p className="text-xl text-gray-600">
                查看社区最新的热门话题和讨论
              </p>
            </div>

            <div className="space-y-6 max-w-4xl mx-auto">
              {/* Discussion Item 1 */}
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    A
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      房地产RWA项目的风险评估方法讨论
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      大家好，最近在研究几个房地产RWA项目，想请教一下大家在评估这类项目时主要关注哪些风险因素...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Alice Chen</span>
                      <span>•</span>
                      <span>2小时前</span>
                      <span>•</span>
                      <span>23回复</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussion Item 2 */}
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-medium">
                    B
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      2024年RWA市场趋势预测分享
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      根据最新的市场数据和监管政策变化，我整理了一份2024年RWA市场趋势预测报告...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Bob Wang</span>
                      <span>•</span>
                      <span>5小时前</span>
                      <span>•</span>
                      <span>45回复</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussion Item 3 */}
              <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                    C
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      新手入门：如何选择第一个RWA投资项目？
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      作为RWA投资新手，面对众多项目不知道如何选择，希望有经验的朋友能分享一些建议...
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Carol Li</span>
                      <span>•</span>
                      <span>1天前</span>
                      <span>•</span>
                      <span>67回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg">
                查看更多讨论
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              准备好加入我们了吗？
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              立即注册成为RWA Hub社区成员，开启您的专业RWA投资之旅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                免费注册
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                了解更多
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
