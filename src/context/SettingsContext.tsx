import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

export interface UserPreferences {
  budget: number // Maximum budget in dollars
  carSize: number // 0-100
  fuelEconomy: number // 0-100
  sportiness: number // 0-100
  priceImportance: number // 0-100
  mileageImportance: number // 0-100
  mpgImportance: number // 0-100
  sportinessWeight: number // 0-100
  sizeWeight: number // 0-100
}

const defaultPreferences: UserPreferences = {
  budget: 50000,
  carSize: 50,
  fuelEconomy: 50,
  sportiness: 50,
  priceImportance: 50,
  mileageImportance: 50,
  mpgImportance: 50,
  sportinessWeight: 50,
  sizeWeight: 50,
}

interface SettingsContextType {
  preferences: UserPreferences
  updatePreferences: (preferences: Partial<UserPreferences>) => void
  resetPreferences: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(
    defaultPreferences
  )

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPreferences,
    }))
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
  }

  return (
    <SettingsContext.Provider
      value={{ preferences, updatePreferences, resetPreferences }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

