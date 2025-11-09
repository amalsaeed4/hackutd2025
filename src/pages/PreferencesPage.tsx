import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSettings } from "@/context/SettingsContext"
import { Sparkles } from "lucide-react"

export function PreferencesPage() {
  const navigate = useNavigate()
  const { updatePreferences } = useSettings()

  const [budget, setBudget] = useState(50000)
  const [carSize, setCarSize] = useState(50)
  const [fuelEconomy, setFuelEconomy] = useState(50)
  const [sportiness, setSportiness] = useState(50)

  const handleSubmit = () => {
    // Save preferences to context
    updatePreferences({
      budget,
      carSize,
      fuelEconomy,
      sportiness,
      sizeWeight: carSize,
      mpgImportance: fuelEconomy,
      sportinessWeight: sportiness,
    })
    // Navigate to loading page
    navigate("/loading")
  }

  const getSizeLabel = (value: number) => {
    if (value < 25) return "Compact"
    if (value < 50) return "Mid-size"
    if (value < 75) return "Full-size"
    return "Large"
  }

  const getFuelEconomyLabel = (value: number) => {
    if (value < 25) return "Not Important"
    if (value < 50) return "Somewhat Important"
    if (value < 75) return "Important"
    return "Very Important"
  }

  const getSportinessLabel = (value: number) => {
    if (value < 25) return "Practical"
    if (value < 50) return "Balanced"
    if (value < 75) return "Sporty"
    return "Very Sporty"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 pt-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Set Your Preferences</h1>
          <p className="text-gray-600">
            Tell us what you're looking for and we'll find your perfect match
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Your Car Preferences</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Adjust the sliders to match your preferences
            </p>
          </CardHeader>
          <CardContent className="space-y-8 pb-8">
            {/* Budget */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg font-semibold">Budget</label>
                <span className="text-2xl font-bold text-primary">
                  ${budget.toLocaleString()}
                </span>
              </div>
              <Slider
                value={budget}
                onChange={setBudget}
                min={10000}
                max={150000}
                step={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum amount you're willing to spend
              </p>
            </div>

            {/* Car Size */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg font-semibold">Car Size</label>
                <span className="text-lg font-semibold text-primary">
                  {getSizeLabel(carSize)}
                </span>
              </div>
              <Slider
                value={carSize}
                onChange={setCarSize}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-gray-500 mt-1">
                Preference for vehicle size
              </p>
            </div>

            {/* Fuel Economy */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg font-semibold">Fuel Economy</label>
                <span className="text-lg font-semibold text-primary">
                  {getFuelEconomyLabel(fuelEconomy)}
                </span>
              </div>
              <Slider
                value={fuelEconomy}
                onChange={setFuelEconomy}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-gray-500 mt-1">
                How important is fuel efficiency to you?
              </p>
            </div>

            {/* Sportiness */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-lg font-semibold">Sportiness</label>
                <span className="text-lg font-semibold text-primary">
                  {getSportinessLabel(sportiness)}
                </span>
              </div>
              <Slider
                value={sportiness}
                onChange={setSportiness}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-xs text-gray-500 mt-1">
                Preference for sporty vs. practical vehicles
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <Button
                onClick={handleSubmit}
                size="lg"
                className="w-full text-lg py-6"
              >
                Find My Dream Car
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

