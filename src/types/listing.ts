// src/types/listing.ts

export type CarListing = {
  id: string;
  title: string;           // "2019 Toyota Camry SE"
  price: number;           // 18990
  mileage: number;         // 45200
  lat: number;
  lng: number;
  source: "dealership" | "facebook";
  url: string;             // external listing link
  imageUrl?: string;
  year?: number;
  make?: string;
  model?: string;
};

