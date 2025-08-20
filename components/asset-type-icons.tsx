export function AssetTypeIcons() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Real Estate</span>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Commodities</span>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Stocks and Bonds</span>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl font-bold text-yellow-600">¥</span>
        </div>
        <span className="text-sm font-medium text-gray-700">Cash</span>
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">Data</span>
      </div>
    </div>
  )
}
