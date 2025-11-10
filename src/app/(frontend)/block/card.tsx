'use client'
import { MdOutlineSupervisorAccount, MdAccountBalance } from 'react-icons/md'
import { GiStonePile } from 'react-icons/gi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CardProps {
  title: string
  color: string
  icon: React.ReactNode
  link: string
  description?: string
}

export default function DashboardCards() {
  const [loadingCard, setLoadingCard] = useState<string | null>(null)
  const router = useRouter()

  const handleNavigation = (link: string) => {
    setLoadingCard(link) // mark this card as loading
    setTimeout(() => {
      router.push(link) // Next.js client navigation (no full reload)
    }, 500)
  }

  const cards: CardProps[] = [
    {
      title: 'Todi Blocks',
      color:
        'bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900',
      icon: <MdOutlineSupervisorAccount size={28} className="text-white" />,
      link: '/block/todi',
      description: 'Add new block',
    },
    {
      title: 'Gala Blocks',
      color:
        'bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900',
      icon: <MdAccountBalance size={28} className="text-white" />,
      link: '/block/gala',
      description: 'Add new block',
    },
    {
      title: 'Todi Raskat',
      color:
        'bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900',
      icon: <GiStonePile size={28} className="text-white" />,
      link: '/block/todi(raskat)',
      description: 'Add new stone block',
    },
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <button
          key={index}
          onClick={() => handleNavigation(card.link)}
          disabled={loadingCard === card.link}
          className="group w-full"
        >
          <div
            className={`flex flex-col justify-between h-full rounded-2xl p-6 transition-all duration-300 ${card.color} text-white hover:shadow-xl hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/20 group-hover:bg-white/30">
                {loadingCard === card.link ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  card.icon
                )}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{card.title}</h3>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            </div>
            <div className="flex justify-end">
              {loadingCard === card.link ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <span className="text-sm font-medium group-hover:underline">
                  View Details →
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </section>
  )
}
