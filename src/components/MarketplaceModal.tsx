import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface MarketplaceModalProps {
  isOpen: boolean
  onClose: () => void
  carName: string
  year: number
}

interface Listing {
  platform: string
  price: string
  condition: string
  location: string
  link: string
}

const mockListings: Listing[] = [
  {
    platform: "AutoTrader",
    price: "$31,500",
    condition: "Excellent",
    location: "San Francisco, CA",
    link: "#",
  },
  {
    platform: "Cars.com",
    price: "$32,800",
    condition: "Very Good",
    location: "Oakland, CA",
    link: "#",
  },
  {
    platform: "CarGurus",
    price: "$30,900",
    condition: "Excellent",
    location: "San Jose, CA",
    link: "#",
  },
  {
    platform: "Facebook Marketplace",
    price: "$29,500",
    condition: "Good",
    location: "Berkeley, CA",
    link: "#",
  },
]

export function MarketplaceModal({
  isOpen,
  onClose,
  carName,
  year,
}: MarketplaceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Marketplace Listings">
      <div className="p-4">
        <p className="text-gray-600 mb-6">
          Marketplace listings for <span className="font-semibold">{carName} {year}</span>
        </p>
        
        <div className="space-y-4">
          {mockListings.map((listing, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{listing.platform}</h3>
                  <p className="text-sm text-gray-600">
                    {listing.condition} • {listing.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{listing.price}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => {
                  // Handle link click
                  console.log("Opening listing:", listing.link)
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Listing
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

