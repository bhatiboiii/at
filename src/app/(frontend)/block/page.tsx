'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardCards from './card'

export default function DashboardPage() {
  const [loadingButton, setLoadingButton] = useState<string | null>(null)
  const router = useRouter()

  const handleNavigation = (link: string) => {
    setLoadingButton(link) // mark this button as loading
    setTimeout(() => {
      router.push(link) // Next.js client navigation (no full reload)
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gray-100 py-4 dark:bg-black px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative overflow-hidden shadow-xl bg-black/5 dark:bg-black/10">
            <div className="absolute opacity-40 inset-0 bg-black/30 dark:bg-black/40"></div>
            <div
              className="absolute opacity-50 inset-0"
              style={{
                backgroundImage:
                  'url("https://img2.exportersindia.com/product_images/bc-full/2021/2/8469484/jodhpur-pink-sandstone-blocks-1612949762-5720354.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <div className="relative max-w-3xl mx-auto p-8">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                Block Management Dashboard
              </h1>
              <p className="text-xl text-white/90">
                Manage your construction blocks with ease
              </p>

              <div className="mt-6 flex flex-col gap-4 md:flex-row">
                {[
                  { label: 'Add New Todi Block', link: '/block/todi/add' },
                  { label: 'Add New Gala Block', link: '/block/gala/add' },
                  {
                    label: 'Add New Todi Raskat Block',
                    link: '/block/todi(raskat)/add',
                  },
                ].map((btn) => (
                  <button
                    key={btn.link}
                    onClick={() => handleNavigation(btn.link)}
                    disabled={loadingButton === btn.link}
                    className="inline-flex items-center w-full justify-center px-6 py-3 bg-white text-indigo-600 font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loadingButton === btn.link ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-indigo-600"></div>
                    ) : (
                      <span>{btn.label}</span>
                    )}
                  </button>
                ))}
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
