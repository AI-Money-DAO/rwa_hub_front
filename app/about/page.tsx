import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssetTypeIcons } from "@/components/asset-type-icons"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* About RWA Hub Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About RWA Hub</h1>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Discover the best marketing strategies to showcase your properties. Discover the best marketing strategies
              to showcase your properties. Discover the best marketing strategies to showcase your properties. Discover
              the best marketing strategies to showcase your properties.
            </p>
          </div>

          {/* Asset Type Icons */}
          <AssetTypeIcons />
        </div>
      </section>

      {/* Additional About Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                We're dedicated to revolutionizing the real-world asset space by providing comprehensive tools and
                insights for property management, investment strategies, and market analysis.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What We Offer</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Expert sales and marketing strategies</li>
                <li>• Advanced negotiation techniques</li>
                <li>• Market insights and analytics</li>
                <li>• Comprehensive support services</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                To become the leading platform for real-world asset management, connecting investors, property owners,
                and industry professionals in a transparent and efficient ecosystem.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose Us</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Industry-leading expertise</li>
                <li>• Cutting-edge technology solutions</li>
                <li>• Personalized support and guidance</li>
                <li>• Proven track record of success</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
