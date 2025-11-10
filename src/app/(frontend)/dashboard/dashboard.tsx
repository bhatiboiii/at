'use client'
import { useState } from 'react'
import DashboardCards from './cards'

export default function DashboardPage() {
  // track which button is loading (null if none)
  const [loadingButton, setLoadingButton] = useState<string | null>(null)

  const handleNavigation = (link: string) => {
    setLoadingButton(link) // mark this button as loading
    setTimeout(() => {
      window.location.href = link
    }, 500)
  }

  return (
    <main className="bg-black dark:bg-black py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden shadow-xl bg-black/5 dark:bg-black/10">
            <div
              className="absolute opacity-50 inset-0"
              style={{
                backgroundImage:
                  'url("https://d2n41s0wa71yzf.cloudfront.net/wp-content/uploads/2022/04/04131056/Gold-Mine_Adobe-scaled-e1643707309450.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="relative max-w-2xl mx-auto p-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Mining Management Dashboard
              </h1>
              <p className="text-xl text-white/90">
                Streamline your mining operations with our comprehensive
                management system
              </p>
              <div className="mt-6 flex gap-4">
                {/* Add New Vendor */}
                <button
                  onClick={() => handleNavigation('/vendor/addvendor')}
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loadingButton === '/vendor/addvendor'}
                >
                  {loadingButton === '/vendor/addvendor' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-2"></div>
                  ) : (
                    <span>Add New Vendor</span>
                  )}
                </button>

                {/* Add New Block */}
                <button
                  onClick={() => handleNavigation('/block')}
                  className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loadingButton === '/block'}
                >
                  {loadingButton === '/block' ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600 mr-2"></div>
                  ) : (
                    <span>Add New Block</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <DashboardCards />
      </div>
    </main>
  )
}
