import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Partners Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Partners</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            We collaborate with industry-leading organizations to provide the best solutions for real-world asset
            management and investment opportunities.
          </p>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-gray-700">agridex</div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-gray-700">AVALANCHE</div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-gray-700">arca</div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-gray-700">ARCHAX</div>
            </div>
            <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-sm">
              <div className="text-xl font-bold text-gray-700 text-center">BLUE BAY VENTURES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Partnership Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Access to cutting-edge technology and innovative solutions in the RWA space.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Network</h3>
              <p className="text-gray-600">Connect with a global network of industry leaders and professionals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">Build on a foundation of trust and reliability with established partners.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
