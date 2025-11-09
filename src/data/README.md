# Car Database

A simple in-memory database for managing car data.

## Usage

### Import the database functions

```typescript
import { 
  getAllCars, 
  getCarById, 
  addCar, 
  updateCar, 
  deleteCar,
  searchCars,
  filterCars,
  resetDatabase
} from "@/data/carDatabase"
```

### Get all cars
```typescript
const cars = getAllCars()
```

### Get a specific car
```typescript
const car = getCarById(1)
```

### Add a new car
```typescript
const newCar = addCar({
  carName: "Toyota Corolla",
  year: 2023,
  mpg: 35,
  horsepower: 169,
  mileage: 10000,
  matchPercentage: 80,
  price: 22000,
  bodyStyle: "Sedan",
  imageUrl: "https://example.com/car.jpg"
})
```

### Update a car
```typescript
const updated = updateCar(1, {
  price: 30000,
  mileage: 15000
})
```

### Delete a car
```typescript
const deleted = deleteCar(1)
```

### Search cars
```typescript
const results = searchCars("Tesla")
```

### Filter cars
```typescript
const filtered = filterCars({
  minPrice: 20000,
  maxPrice: 40000,
  minYear: 2020,
  bodyStyle: "Sedan"
})
```

### Reset database
```typescript
resetDatabase() // Restores all cars to initial state
```

## Data Structure

Each car has the following properties:
- `id`: number (auto-generated)
- `carName`: string
- `year`: number
- `mpg`: number (miles per gallon)
- `horsepower`: number
- `mileage`: number
- `matchPercentage`: number (0-100)
- `price`: number
- `bodyStyle`: string (e.g., "Sedan", "SUV", "Coupe")
- `imageUrl`: string

## Adding Cars

To add cars to the initial database, edit `cars.json` and add new car objects to the array.

