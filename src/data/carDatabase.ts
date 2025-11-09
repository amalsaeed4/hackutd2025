import carsData from "./cars.json"

export interface Car {
  id: number
  carName: string
  year: number
  mpg: number
  horsepower: number
  mileage: number
  matchPercentage: number
  price: number
  bodyStyle: string
  imageUrl: string
}

// In-memory database (can be replaced with localStorage or API later)
let cars: Car[] = [...carsData] as Car[]

// Get all cars
export function getAllCars(): Car[] {
  return [...cars]
}

// Get car by ID
export function getCarById(id: number): Car | undefined {
  return cars.find((car) => car.id === id)
}

// Add a new car
export function addCar(car: Omit<Car, "id">): Car {
  const newId = Math.max(...cars.map((c) => c.id), 0) + 1
  const newCar: Car = {
    ...car,
    id: newId,
  }
  cars.push(newCar)
  return newCar
}

// Update a car
export function updateCar(id: number, updates: Partial<Omit<Car, "id">>): Car | null {
  const index = cars.findIndex((car) => car.id === id)
  if (index === -1) return null

  cars[index] = { ...cars[index], ...updates }
  return cars[index]
}

// Delete a car
export function deleteCar(id: number): boolean {
  const index = cars.findIndex((car) => car.id === id)
  if (index === -1) return false

  cars.splice(index, 1)
  return true
}

// Search cars by name
export function searchCars(query: string): Car[] {
  const lowerQuery = query.toLowerCase()
  return cars.filter(
    (car) =>
      car.carName.toLowerCase().includes(lowerQuery) ||
      car.bodyStyle.toLowerCase().includes(lowerQuery)
  )
}

// Filter cars by criteria
export function filterCars(filters: {
  minPrice?: number
  maxPrice?: number
  minYear?: number
  maxYear?: number
  bodyStyle?: string
  minMpg?: number
  maxMileage?: number
}): Car[] {
  return cars.filter((car) => {
    if (filters.minPrice !== undefined && car.price < filters.minPrice) return false
    if (filters.maxPrice !== undefined && car.price > filters.maxPrice) return false
    if (filters.minYear !== undefined && car.year < filters.minYear) return false
    if (filters.maxYear !== undefined && car.year > filters.maxYear) return false
    if (filters.bodyStyle && car.bodyStyle !== filters.bodyStyle) return false
    if (filters.minMpg !== undefined && car.mpg < filters.minMpg) return false
    if (filters.maxMileage !== undefined && car.mileage > filters.maxMileage) return false
    return true
  })
}

// Reset database to initial state
export function resetDatabase(): void {
  cars = [...carsData] as Car[]
}

// Get next available ID
export function getNextId(): number {
  return Math.max(...cars.map((c) => c.id), 0) + 1
}

