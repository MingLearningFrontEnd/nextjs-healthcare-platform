'use client'

import { useEffect } from 'react'

interface CalendlyProps {
  url: string
  className?: string
}

export function Calendly({ url, className = "min-w-[320px] h-[700px]" }: CalendlyProps) {
  useEffect(() => {
    // 动态加载 Calendly 脚本
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div 
      className={`calendly-inline-widget ${className}`}
      data-url={url}
    />
  )
} 