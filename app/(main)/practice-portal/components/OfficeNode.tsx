"use client"

import { useState } from "react"
import ProviderNode from "./ProviderNode"

interface Office {
  id: number
  name: string
  address: string
  providers: Provider[]
}

interface Provider {
  id: number
  name: string
  patients: Patient[]
}

interface Patient {
  id: number
  name: string
}

interface OfficeNodeProps {
  office: Office
  isSelected: boolean
  onSelect: () => void
  position?: 'left' | 'center' | 'right'
}

export default function OfficeNode({ office, isSelected, onSelect, position = 'center' }: OfficeNodeProps) {
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'left-0 sm:left-0 sm:translate-x-0'
      case 'right':
        return 'left-0 sm:right-0 sm:left-auto sm:translate-x-0'
      default:
        return 'left-0 sm:left-1/2 sm:-translate-x-1/2'
    }
  }

  const getLineClasses = () => {
    switch (position) {
      case 'left':
        return 'sm:rotate-[-30deg] sm:origin-top sm:left-[-100px]'
      case 'right':
        return 'sm:rotate-[30deg] sm:origin-top sm:right-[-100px]'
      default:
        return ''
    }
  }

  return (
    <div className="office-node w-full sm:w-auto relative">
      <div
        className={`office-box p-3 sm:p-4 border rounded-lg cursor-pointer ${
          isSelected ? "bg-blue-100 border-blue-500" : "bg-white"
        }`}
        onClick={onSelect}
      >
        <h3 className="text-sm sm:text-base font-bold">{office.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600">{office.address}</p>
      </div>
      {isSelected && (
        <div className={`providers mt-3 sm:mt-4 absolute ${getPositionClasses()} w-full sm:w-auto min-w-[200px] z-10`}>
          <div className={`line h-6 sm:h-8 w-px  relative bg-gray-300 mx-auto ${getLineClasses()}`}></div>
          <div className="flex flex-wrap sm:flex-nowrap justify-around gap-2 sm:gap-4 bg-white p-4 rounded-lg shadow-lg">
            {office.providers.map((provider) => (
              <ProviderNode
                key={provider.id}
                provider={provider}
                isSelected={selectedProvider === provider.id}
                onSelect={() => setSelectedProvider(provider.id === selectedProvider ? null : provider.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

