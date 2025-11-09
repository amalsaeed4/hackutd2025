import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllCars, searchCars, type Car } from "@/data/carDatabase"

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [cars, setCars] = useState<Car[]>([])

  // Load all cars on mount
  useEffect(() => {
    setCars(getAllCars())
  }, [])

  // Filter cars based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setCars(getAllCars())
    } else {
      setCars(searchCars(searchQuery))
    }
  }, [searchQuery])

  // Determine badge color based on match percentage
  const getBadgeColor = (matchPercentage: number) => {
    if (matchPercentage < 50) {
      return "bg-red-500"
    } else if (matchPercentage >= 50 && matchPercentage < 60) {
      return "bg-orange-500"
    } else if (matchPercentage >= 60 && matchPercentage < 70) {
      return "bg-yellow-500"
    } else {
      return "bg-green-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Search Cars</h1>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search by make, model, or body style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-semibold">{cars.length}</span>{" "}
            {cars.length === 1 ? "car" : "cars"}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>

        {/* Cars Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={car.imageUrl}
                    alt={`${car.carName} ${car.year}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-primary">
                    {car.bodyStyle}
                  </Badge>
                  <Badge className={`absolute top-2 left-2 ${getBadgeColor(car.matchPercentage)} text-white`}>
                    {car.matchPercentage}% Match
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold">
                        {car.carName} {car.year}
                      </h3>
                      <p className="text-2xl font-bold text-primary mt-1">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-4">
                    <div>
                      <span className="font-semibold">{car.mpg}</span> MPG
                    </div>
                    <div>
                      <span className="font-semibold">{car.horsepower}</span> HP
                    </div>
                    <div>
                      <span className="font-semibold">
                        {car.mileage.toLocaleString()}
                      </span>{" "}
                      mi
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              No cars found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
