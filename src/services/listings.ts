// src/services/listings.ts

import type { CarListing } from "../types/listing";

const MOCK: CarListing[] = [
  { id: "1", title: "2018 Honda Civic Sport", price: 15990, mileage: 62000, lat: 32.7767, lng: -96.7970, source: "dealership", url: "https://example.com/civic" },
  { id: "2", title: "2020 Toyota Corolla LE", price: 17450, mileage: 38000, lat: 32.9537, lng: -96.7297, source: "facebook", url: "https://fb.com/listing/xyz" },
  { id: "3", title: "2019 Mazda 3 Hatch", price: 16900, mileage: 41000, lat: 32.9858, lng: -96.7501, source: "dealership", url: "https://example.com/mazda3" }
];

export type Bounds = { north: number; south: number; east: number; west: number };

export async function fetchListingsInBounds(bounds: Bounds): Promise<CarListing[]> {
  // TODO: replace with real API call. For now, return MOCK filtered by bounds
  return MOCK.filter(l => l.lat < bounds.north && l.lat > bounds.south && l.lng < bounds.east && l.lng > bounds.west);
}

