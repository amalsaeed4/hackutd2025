import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "value"
  > {
  label?: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  showValue?: boolean
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      label,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      showValue = true,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value))
    }

    const percentage = ((value - min) / (max - min)) * 100

    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {label}
            </label>
            {showValue && (
              <span className="text-sm font-semibold text-primary">{value}</span>
            )}
          </div>
        )}
        <div className="relative">
          <input
            type="range"
            ref={ref}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className={cn(
              "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
              "accent-primary",
              className
            )}
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${percentage}%, rgb(229, 231, 235) ${percentage}%, rgb(229, 231, 235) 100%)`,
            }}
            {...props}
          />
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }

