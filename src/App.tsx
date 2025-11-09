import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { LikedCarsProvider } from "@/context/LikedCarsContext"
import { SettingsProvider } from "@/context/SettingsContext"
import { BottomNav } from "@/components/BottomNav"
import { ProtectedRoute } from "@/components/ProtectedRoute"
import { AuthPage } from "@/pages/AuthPage"
import { PreferencesPage } from "@/pages/PreferencesPage"
import { LoadingPage } from "@/pages/LoadingPage"
import { SwipePage } from "@/pages/SwipePage"
import { SearchPage } from "@/pages/SearchPage"
import { MapPage } from "@/pages/MapPage"
import { LikedPage } from "@/pages/LikedPage"
import { SettingsPage } from "@/pages/SettingsPage"

function App() {
  return (
    <AuthProvider>
      <LikedCarsProvider>
        <SettingsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/preferences"
                element={
                  <ProtectedRoute>
                    <PreferencesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loading"
                element={
                  <ProtectedRoute>
                    <LoadingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <SwipePage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <SearchPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <MapPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/liked"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <LikedPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-background">
                      <SettingsPage />
                      <BottomNav />
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SettingsProvider>
      </LikedCarsProvider>
    </AuthProvider>
  )
}

export default App
