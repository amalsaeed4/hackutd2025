import { useNavigate } from "react-router-dom"
import { useSettings } from "@/context/SettingsContext"
import { useAuth } from "@/context/AuthContext"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Settings, RotateCcw, LogOut } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsPage() {
  const { preferences, updatePreferences, resetPreferences } = useSettings()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  const handleSliderChange = (key: keyof typeof preferences, value: number) => {
    updatePreferences({ [key]: value })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold">Preferences</h1>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Match Preferences</CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Adjust the importance weights for different factors when matching
              cars to your preferences.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Importance */}
            <div>
              <Slider
                label="Price Importance"
                value={preferences.priceImportance}
                onChange={(value) =>
                  handleSliderChange("priceImportance", value)
                }
                min={0}
                max={100}
                step={1}
                showValue={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                How much price affects your match score
              </p>
            </div>

            {/* Mileage Importance */}
            <div>
              <Slider
                label="Mileage Importance"
                value={preferences.mileageImportance}
                onChange={(value) =>
                  handleSliderChange("mileageImportance", value)
                }
                min={0}
                max={100}
                step={1}
                showValue={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                How much mileage affects your match score
              </p>
            </div>

            {/* MPG Importance */}
            <div>
              <Slider
                label="MPG Importance"
                value={preferences.mpgImportance}
                onChange={(value) =>
                  handleSliderChange("mpgImportance", value)
                }
                min={0}
                max={100}
                step={1}
                showValue={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                How much fuel efficiency affects your match score
              </p>
            </div>

            {/* Sportiness Weight */}
            <div>
              <Slider
                label="Sportiness Weight"
                value={preferences.sportinessWeight}
                onChange={(value) =>
                  handleSliderChange("sportinessWeight", value)
                }
                min={0}
                max={100}
                step={1}
                showValue={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                Preference for sporty vs. practical vehicles
              </p>
            </div>

            {/* Size Weight */}
            <div>
              <Slider
                label="Size Weight"
                value={preferences.sizeWeight}
                onChange={(value) => handleSliderChange("sizeWeight", value)}
                min={0}
                max={100}
                step={1}
                showValue={false}
              />
              <p className="text-xs text-gray-500 mt-1">
                Preference for larger vs. smaller vehicles
              </p>
            </div>

            {/* Reset Button */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={resetPreferences}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="mt-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Current Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold ml-2">
                  {preferences.priceImportance}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Mileage:</span>
                <span className="font-semibold ml-2">
                  {preferences.mileageImportance}
                </span>
              </div>
              <div>
                <span className="text-gray-600">MPG:</span>
                <span className="font-semibold ml-2">
                  {preferences.mpgImportance}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Sportiness:</span>
                <span className="font-semibold ml-2">
                  {preferences.sportinessWeight}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Size:</span>
                <span className="font-semibold ml-2">
                  {preferences.sizeWeight}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Card */}
        <Card className="mt-6 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user && (
              <div className="text-sm">
                <div className="text-gray-600 mb-1">Logged in as:</div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-gray-500 text-xs mt-1">{user.email}</div>
              </div>
            )}
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
