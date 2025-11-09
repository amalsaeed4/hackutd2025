import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LocalDealsModal } from "@/components/LocalDealsModal"
import { X } from "lucide-react"

interface CarCardProps {
  carName: string
  year: number
  mpg: number
  horsepower: number
  mileage: number
  matchPercentage: number
  imageUrl?: string
  variant?: "default" | "small"
  onRemove?: () => void
  showRemoveButton?: boolean
}

export function CarCard({
  carName,
  year,
  mpg,
  horsepower,
  mileage,
  matchPercentage,
  imageUrl = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
  variant = "default",
  onRemove,
  showRemoveButton = false,
}: CarCardProps) {
  const [isLocalDealsOpen, setIsLocalDealsOpen] = useState(false)

  const isSmall = variant === "small"

  // Determine badge color based on match percentage
  const getBadgeColor = () => {
    if (matchPercentage < 50) {
      return "bg-red-500 hover:bg-red-600"
    } else if (matchPercentage >= 50 && matchPercentage < 60) {
      return "bg-orange-500 hover:bg-orange-600"
    } else if (matchPercentage >= 60 && matchPercentage < 70) {
      return "bg-yellow-500 hover:bg-yellow-600"
    } else {
      return "bg-green-500 hover:bg-green-600"
    }
  }

  return (
    <>
      <Card
        className={`relative w-full overflow-hidden shadow-lg ${
          isSmall ? "max-w-sm" : "max-w-md"
        } mx-auto`}
      >
        {/* Match % Badge - Top Right */}
        <div className={`absolute ${isSmall ? "top-2 right-2" : "top-4 right-4"} z-10`}>
          <Badge
            variant="default"
            className={`${getBadgeColor()} text-white`}
          >
            {matchPercentage}% Match
          </Badge>
        </div>

        {/* Remove Button */}
        {showRemoveButton && onRemove && (
          <button
            onClick={onRemove}
            className={`absolute ${isSmall ? "top-2 left-2" : "top-4 left-4"} z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors`}
            aria-label="Remove"
          >
            <X className={`${isSmall ? "w-4 h-4" : "w-5 h-5"}`} />
          </button>
        )}

        {/* Car Image Area */}
        <div
          className={`relative w-full bg-gray-200 overflow-hidden ${
            isSmall ? "h-48" : "h-80"
          }`}
        >
          <img
            src={imageUrl}
            alt={`${carName} ${year}`}
            className="w-full h-full object-cover"
          />
        </div>

        <CardContent className={isSmall ? "p-4" : "p-6"}>
          {/* Car Name + Year */}
          <h2
            className={`${isSmall ? "text-lg mb-2" : "text-2xl mb-4"} font-bold`}
          >
            {carName} {year}
          </h2>

          {/* Stats Row */}
          <div
            className={`flex justify-between items-center ${isSmall ? "mb-3 text-xs" : "mb-6 text-sm"} text-gray-600`}
          >
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">{mpg}</span>
              <span>MPG</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">{horsepower} HP</span>
              <span>Power</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-900">
                {mileage.toLocaleString()} mi
              </span>
              <span>Mileage</span>
            </div>
          </div>

          {/* Action Buttons - Only show in default variant */}
          {!isSmall && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsLocalDealsOpen(true)}
              >
                Local Deals
              </Button>
              <Button
                variant="default"
                className="flex-1"
              >
                View Interior
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals - Only show in default variant */}
      {!isSmall && (
        <LocalDealsModal
          isOpen={isLocalDealsOpen}
          onClose={() => setIsLocalDealsOpen(false)}
          carName={carName}
          year={year}
        />
      )}
    </>
  )
}
