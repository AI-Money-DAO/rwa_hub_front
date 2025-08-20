import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section - Ask anything About RWA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Ask anything About RWA</h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  placeholder="Ask anything..."
                  className="w-full h-12 pl-4 pr-12 text-lg border-2 border-gray-300 rounded-lg"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold text-gray-900 mb-2">Sales Strategies</h3>
                <p className="text-sm text-gray-600">
                  Get tailored advice on increasing property visibility and driving sales.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold text-gray-900 mb-2">Negotiation Tactics</h3>
                <p className="text-sm text-gray-600">Learn expert negotiation tips to close deals effectively.</p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold text-gray-900 mb-2">Marketing Insights</h3>
                <p className="text-sm text-gray-600">
                  Discover the best marketing strategies to showcase your properties.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <h3 className="font-semibold text-gray-900 mb-2">General Support</h3>
                <p className="text-sm text-gray-600">Need help with something else? Ask away, and we'll guide you.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
