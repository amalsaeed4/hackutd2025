import { Link, useLocation } from "react-router-dom"
import { Home, Search, Map, Heart, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: "/home", icon: Home, label: "Swipe" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/map", icon: Map, label: "Map" },
    { path: "/liked", icon: Heart, label: "Liked" },
    { path: "/settings", icon: Settings, label: "Preferences" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

