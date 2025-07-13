import React, { useRef, useEffect, useState } from 'react'

interface HorizontalSliderProps {
  children: React.ReactNode
  className?: string
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({ children, className = '' }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.pageX - slider.offsetLeft)
      setScrollLeft(slider.scrollLeft)
    }

    const handleMouseLeave = () => setIsDragging(false)
    const handleMouseUp = () => setIsDragging(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 2 // speed multiplier
      slider.scrollLeft = scrollLeft - walk
    }

    slider.addEventListener('mousedown', handleMouseDown)
    slider.addEventListener('mouseleave', handleMouseLeave)
    slider.addEventListener('mouseup', handleMouseUp)
    slider.addEventListener('mousemove', handleMouseMove)

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown)
      slider.removeEventListener('mouseleave', handleMouseLeave)
      slider.removeEventListener('mouseup', handleMouseUp)
      slider.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, startX, scrollLeft])

  return (
    <div
      ref={sliderRef}
      className={`overflow-x-auto whitespace-nowrap cursor-${isDragging ? 'grabbing' : 'grab'} select-none flex gap-2 max-w-[95vw] scrollbar-hide ${className}`}
    >
      {children}
    </div>
  )
}

export default HorizontalSlider
