import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function LoadingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate to home after 5 seconds
    const timer = setTimeout(() => {
      navigate("/home")
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Finding your matches
        </h2>
        <div className="mt-4 flex justify-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}

