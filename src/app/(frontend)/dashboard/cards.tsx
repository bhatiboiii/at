"use client"
import { MdAccountBalance, MdOutlineSupervisorAccount } from "react-icons/md"
import { GiStonePile, GiStoneWall } from "react-icons/gi"
import { useState, useEffect } from "react"

interface CardProps {
  title: string
  color: string
  icon: React.ReactNode
  link: string
  description?: string
  stats: string
  count?: number
}

export default function DashboardCards() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loadingCard, setLoadingCard] = useState<string | null>(null)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    setIsAdmin(user?.role === "admin")
  }, [])

  const handleNavigation = (link: string) => {
    setLoadingCard(link) // mark this card as loading
    setTimeout(() => {
      window.location.href = link
    }, 500)
  }

  const cards: CardProps[] = [
    {
      title: "Account",
      color:
        "bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-800 dark:to-gray-900",
      icon: <MdAccountBalance size={32} className="text-white" />,
      link: "/accounts",
      description: "View and manage account statements",
      stats: "Today",
      count: 1,
    },
    {
      title: "Stone Inventory",
      color:
        "bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700",
      icon: <GiStonePile size={32} className="text-white" />,
      link: "/stone",
      description: "Manage stone categories and inventory",
      stats: "Available Stones",
      count: 250,
    },
    {
      title: "Block Management",
      color:
        "bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700",
      icon: <GiStoneWall size={32} className="text-white" />,
      link: "/block",
      description: "Manage block categories and inventory",
      stats: "Total Blocks",
      count: 150,
    },
    ...(isAdmin
      ? [
          {
            title: "Vendor Accounts",
            color:
              "bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700",
            icon: <MdOutlineSupervisorAccount size={32} className="text-white" />,
            link: "/vendor/account",
            description: "Manage your vendor relationships",
            stats: "Active Vendors",
            count: 12,
          },
        ]
      : []),
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <button
          key={index}
          onClick={() => handleNavigation(card.link)}
          className={`group w-full`}
        >
          <div
            className={`flex flex-col justify-between h-full p-6 transition-all duration-300 ${card.color} text-white hover:shadow-xl hover:scale-[1.02]`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 -xl bg-white/20 group-hover:bg-white/30">
                {loadingCard === card.link ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                ) : (
                  card.icon
                )}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">{card.title}</h3>
                <p className="text-sm text-white/80">{card.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
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
          </div>
        </button>
      ))}
    </section>
  )
}
