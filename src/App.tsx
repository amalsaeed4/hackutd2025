import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LikedCarsProvider } from "@/context/LikedCarsContext"
import { SettingsProvider } from "@/context/SettingsContext"
import { BottomNav } from "@/components/BottomNav"
import { AuthPage } from "@/pages/AuthPage"
import { PreferencesPage } from "@/pages/PreferencesPage"
import { SwipePage } from "@/pages/SwipePage"
import { SearchPage } from "@/pages/SearchPage"
import { LikedPage } from "@/pages/LikedPage"
import { SettingsPage } from "@/pages/SettingsPage"

function App() {
  return (
    <LikedCarsProvider>
      <SettingsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/preferences" element={<PreferencesPage />} />
            <Route path="/home" element={
              <div className="min-h-screen bg-background">
                <SwipePage />
                <BottomNav />
              </div>
            } />
            <Route path="/search" element={
              <div className="min-h-screen bg-background">
                <SearchPage />
                <BottomNav />
              </div>
            } />
            <Route path="/liked" element={
              <div className="min-h-screen bg-background">
                <LikedPage />
                <BottomNav />
              </div>
            } />
            <Route path="/settings" element={
              <div className="min-h-screen bg-background">
                <SettingsPage />
                <BottomNav />
              </div>
            } />
          </Routes>
        </Router>
      </SettingsProvider>
    </LikedCarsProvider>
  )
}

export default App
