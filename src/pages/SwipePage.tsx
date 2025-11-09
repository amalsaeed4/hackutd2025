import { CarCard } from "@/components/CarCard"
import { SwipeableCard } from "@/components/SwipeableCard"
import { useLikedCars } from "@/context/LikedCarsContext"
import type { Car } from "@/data/carDatabase"

export function SwipePage() {
  const { addLikedCar, swipeStack, updateSwipeStack, resetSwipeStack } = useLikedCars()

  const handleLike = (car: Car) => {
    console.log("Liked:", car)
    addLikedCar(car)
    updateSwipeStack(swipeStack.filter((c) => c.id !== car.id))
  }

  const handlePass = (car: Car) => {
    console.log("Passed:", car)
    updateSwipeStack(swipeStack.filter((c) => c.id !== car.id))
  }

  const handleSwipe = (direction: "left" | "right", carId: number) => {
    const car = swipeStack.find((c) => c.id === carId)
    if (!car) return

    if (direction === "right") {
      handleLike(car)
    } else if (direction === "left") {
      handlePass(car)
    }
  }

  if (swipeStack.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">No More Cars</h1>
          <p className="text-gray-600 mb-6">
            You've seen all available cars. Check back later for more matches!
          </p>
          <button
            onClick={resetSwipeStack}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Reset Stack
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-2 text-center">CarMatch</h1>
        <h2 className="text-2xl font-bold mb-6 text-center">Find Your Match</h2>
        
        <div className="relative h-[600px] w-full">
          {swipeStack.map((car, index) => (
            <div
              key={car.id}
              className="absolute w-full"
              style={{
                zIndex: swipeStack.length - index,
                transform:
                  index > 0
                    ? `scale(${1 - index * 0.05}) translateY(${index * 10}px)`
                    : undefined,
              }}
            >
              <SwipeableCard
                className="w-full"
                onSwipe={(direction) => handleSwipe(direction, car.id)}
              >
                <CarCard
                  carName={car.carName}
                  year={car.year}
                  mpg={car.mpg}
                  horsepower={car.horsepower}
                  mileage={car.mileage}
                  matchPercentage={car.matchPercentage}
                  imageUrl={car.imageUrl}
                />
              </SwipeableCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
