import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface LocalDealsModalProps {
  isOpen: boolean
  onClose: () => void
  carName: string
  year: number
}

interface Deal {
  dealer: string
  price: string
  location: string
  distance: string
  link: string
}

const mockDeals: Deal[] = [
  {
    dealer: "City Auto Sales",
    price: "$32,500",
    location: "Downtown",
    distance: "2.3 mi",
    link: "#",
  },
  {
    dealer: "Premium Motors",
    price: "$33,200",
    location: "Northside",
    distance: "5.1 mi",
    link: "#",
  },
  {
    dealer: "AutoMax Dealership",
    price: "$31,800",
    location: "Eastside",
    distance: "7.8 mi",
    link: "#",
  },
  {
    dealer: "Best Buy Auto",
    price: "$32,900",
    location: "Westside",
    distance: "4.5 mi",
    link: "#",
  },
  {
    dealer: "Elite Car Center",
    price: "$33,500",
    location: "Southside",
    distance: "9.2 mi",
    link: "#",
  },
]

export function LocalDealsModal({
  isOpen,
  onClose,
  carName,
  year,
}: LocalDealsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Local Deals">
      <div className="p-4">
        <p className="text-gray-600 mb-6">
          Available deals for <span className="font-semibold">{carName} {year}</span> near you
        </p>
        
        <div className="space-y-4">
          {mockDeals.map((deal, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{deal.dealer}</h3>
                  <p className="text-sm text-gray-600">
                    {deal.location} • {deal.distance} away
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{deal.price}</p>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-3"
                onClick={() => {
                  // Handle link click
                  console.log("Opening deal:", deal.link)
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Deal
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}

