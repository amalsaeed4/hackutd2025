import { useLikedCars } from "@/context/LikedCarsContext"
import { CarCard } from "@/components/CarCard"
import { Heart } from "lucide-react"

export function LikedPage() {
  const { likedCars, removeLikedCar } = useLikedCars()

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-bold">Liked Cars</h1>
          {likedCars.length > 0 && (
            <span className="text-gray-500">({likedCars.length})</span>
          )}
        </div>

        {likedCars.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No liked cars yet</p>
            <p className="text-gray-400 text-sm">
              Swipe right on cars to add them to your liked list
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto">
            {likedCars.map((car) => (
              <CarCard
                key={car.id}
                carName={car.carName}
                year={car.year}
                mpg={car.mpg}
                horsepower={car.horsepower}
                mileage={car.mileage}
                matchPercentage={car.matchPercentage}
                imageUrl={car.imageUrl}
                variant="small"
                showRemoveButton={true}
                onRemove={() => removeLikedCar(car.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
