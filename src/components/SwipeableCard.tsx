import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipe?: (direction: "left" | "right") => void
  className?: string
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipe,
  className,
}: SwipeableCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [showHeart, setShowHeart] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const SWIPE_THRESHOLD = 100
  const ROTATION_FACTOR = 0.1
  const ANIMATION_THRESHOLD = 50

  useEffect(() => {
    if (!isDragging && (position.x !== 0 || position.y !== 0)) {
      // Animate back to center if not swiped far enough
      const distance = Math.sqrt(position.x ** 2 + position.y ** 2)
      if (distance < SWIPE_THRESHOLD) {
        setPosition({ x: 0, y: 0 })
        setRotation(0)
      }
    }
  }, [isDragging, position])

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true)
    setStartPos({ x: clientX, y: clientY })
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return

    const deltaX = clientX - startPos.x
    const deltaY = clientY - startPos.y

    setPosition({ x: deltaX, y: deltaY })
    setRotation(deltaX * ROTATION_FACTOR)
    
    // Show animations based on swipe direction
    setShowHeart(deltaX > ANIMATION_THRESHOLD)
    setShowPass(deltaX < -ANIMATION_THRESHOLD)
  }

  const handleEnd = () => {
    if (!isDragging) return

    const distance = Math.sqrt(position.x ** 2 + position.y ** 2)
    const isSwipeRight = position.x > SWIPE_THRESHOLD
    const isSwipeLeft = position.x < -SWIPE_THRESHOLD

    if (isSwipeRight && distance > SWIPE_THRESHOLD) {
      // Swipe right - animate off screen
      setPosition({ x: window.innerWidth, y: position.y })
      setRotation(30)
      setTimeout(() => {
        setShowHeart(false)
        onSwipeRight?.()
        onSwipe?.("right")
      }, 300)
    } else if (isSwipeLeft && distance > SWIPE_THRESHOLD) {
      // Swipe left - animate off screen
      setPosition({ x: -window.innerWidth, y: position.y })
      setRotation(-30)
      setTimeout(() => {
        setShowPass(false)
        onSwipeLeft?.()
        onSwipe?.("left")
      }, 300)
    } else {
      // Return to center
      setPosition({ x: 0, y: 0 })
      setRotation(0)
      setShowHeart(false)
      setShowPass(false)
    }

    setIsDragging(false)
  }

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    handleStart(e.clientX, e.clientY)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX, e.clientY)
  }

  const handleMouseUp = () => {
    handleEnd()
  }

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    handleStart(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    handleMove(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    handleEnd()
  }

  // Global mouse events for dragging outside card
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => {
        handleMove(e.clientX, e.clientY)
      }
      const handleGlobalMouseUp = () => {
        handleEnd()
      }

      window.addEventListener("mousemove", handleGlobalMouseMove)
      window.addEventListener("mouseup", handleGlobalMouseUp)

      return () => {
        window.removeEventListener("mousemove", handleGlobalMouseMove)
        window.removeEventListener("mouseup", handleGlobalMouseUp)
      }
    }
  }, [isDragging, startPos])

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative transition-transform duration-300 ease-out cursor-grab active:cursor-grabbing",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
        opacity: isDragging ? 0.95 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Heart Animation - Right Swipe */}
      {showHeart && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-[scaleIn_0.2s_ease-out]">
            <Heart className="w-24 h-24 text-red-500 fill-red-500 drop-shadow-lg" />
          </div>
        </div>
      )}

      {/* Pass Animation - Left Swipe */}
      {showPass && (
        <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-[scaleIn_0.2s_ease-out]">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg px-8 py-4 border-4 border-gray-700">
              <span className="text-white text-4xl font-bold tracking-wider">PASS</span>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  )
}

