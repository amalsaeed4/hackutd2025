import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { Car } from "@/data/carDatabase"
import { getAllCars } from "@/data/carDatabase"

interface LikedCarsContextType {
  likedCars: Car[]
  addLikedCar: (car: Car) => void
  removeLikedCar: (carId: number) => void
  isLiked: (carId: number) => boolean
  swipeStack: Car[]
  updateSwipeStack: (cars: Car[]) => void
  resetSwipeStack: () => void
}

const LikedCarsContext = createContext<LikedCarsContextType | undefined>(
  undefined
)

export function LikedCarsProvider({ children }: { children: ReactNode }) {
  const [likedCars, setLikedCars] = useState<Car[]>([])
  const [swipeStack, setSwipeStack] = useState<Car[]>([])

  // Initialize swipe stack on mount if empty
  useEffect(() => {
    if (swipeStack.length === 0) {
      const allCars = getAllCars()
      const sortedCars = [...allCars].sort((a, b) => b.matchPercentage - a.matchPercentage)
      setSwipeStack(sortedCars)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addLikedCar = (car: Car) => {
    setLikedCars((prev) => {
      // Check if car already exists
      if (prev.some((c) => c.id === car.id)) {
        return prev
      }
      return [...prev, car]
    })
  }

  const removeLikedCar = (carId: number) => {
    setLikedCars((prev) => prev.filter((car) => car.id !== carId))
  }

  const isLiked = (carId: number) => {
    return likedCars.some((car) => car.id === carId)
  }

  const updateSwipeStack = (cars: Car[]) => {
    setSwipeStack(cars)
  }

  const resetSwipeStack = () => {
    const allCars = getAllCars()
    const sortedCars = [...allCars].sort((a, b) => b.matchPercentage - a.matchPercentage)
    setSwipeStack(sortedCars)
  }

  return (
    <LikedCarsContext.Provider
      value={{
        likedCars,
        addLikedCar,
        removeLikedCar,
        isLiked,
        swipeStack,
        updateSwipeStack,
        resetSwipeStack,
      }}
    >
      {children}
    </LikedCarsContext.Provider>
  )
}

export function useLikedCars() {
  const context = useContext(LikedCarsContext)
  if (context === undefined) {
    throw new Error("useLikedCars must be used within a LikedCarsProvider")
  }
  return context
}

