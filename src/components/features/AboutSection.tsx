import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Eye, Heart } from 'lucide-react';

export function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            关于我们
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RWA Hub致力于成为全球领先的RWA（Real World Assets）服务平台，
            为用户提供专业、安全、便捷的资产管理和投资服务。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              我们的故事
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              随着区块链技术的发展，RWA（Real World
              Assets）正在成为连接传统金融与数字资产的重要桥梁。
              我们看到了这个领域的巨大潜力，决心打造一个专业的RWA服务平台。
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              通过整合先进的AI技术、区块链技术和传统金融经验，我们为用户提供全方位的RWA投资服务，
              包括资产分析、风险评估、投资建议等。
            </p>
            <Button className="group">
              了解更多
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      我们的使命
                    </h4>
                    <p className="text-gray-600 text-sm">
                      让RWA投资变得简单、安全、高效
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      我们的愿景
                    </h4>
                    <p className="text-gray-600 text-sm">
                      成为全球领先的RWA服务平台
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      我们的价值观
                    </h4>
                    <p className="text-gray-600 text-sm">
                      诚信、专业、创新、用户至上
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
