import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const partners = [
  {
    name: 'BlockChain Capital',
    logo: '🏛️',
    description: '领先的区块链投资基金',
    category: '投资机构',
  },
  {
    name: 'RWA Analytics',
    logo: '📊',
    description: '专业的RWA数据分析平台',
    category: '数据服务',
  },
  {
    name: 'SecureVault',
    logo: '🔒',
    description: '数字资产安全存储解决方案',
    category: '安全服务',
  },
  {
    name: 'DeFi Protocol',
    logo: '⚡',
    description: '去中心化金融协议',
    category: '技术合作',
  },
  {
    name: 'Asset Bridge',
    logo: '🌉',
    description: '传统资产数字化桥梁',
    category: '资产服务',
  },
  {
    name: 'Compliance Pro',
    logo: '✅',
    description: '合规性解决方案提供商',
    category: '合规服务',
  },
];

export function PartnersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            合作伙伴
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            我们与行业领先的机构和平台建立了战略合作关系，
            共同推动RWA生态系统的发展和创新。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{partner.logo}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {partner.category}
                </p>
                <p className="text-gray-600 text-sm">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            成为我们的合作伙伴
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            如果您是RWA领域的专业机构或服务提供商，我们诚邀您加入我们的合作伙伴网络，
            共同为用户提供更优质的服务。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:partners@rwahub.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              联系我们
            </a>
            <Link
              href="/partners"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              了解更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
