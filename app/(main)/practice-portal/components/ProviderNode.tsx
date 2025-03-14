"use client"

import { useState } from "react"
import PatientNode from "./PatientNode"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Provider {
  id: number
  name: string
  patients: Patient[]
}

interface Patient {
  id: number
  name: string
}

interface ProviderNodeProps {
  provider: Provider
  isSelected: boolean
  onSelect: () => void
}

export default function ProviderNode({ provider, isSelected, onSelect }: ProviderNodeProps) {
  return (
    <div className="provider-node w-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`provider-box p-3 sm:p-2 border rounded-md cursor-pointer text-sm sm:text-[14px] whitespace-nowrap overflow-hidden text-ellipsis ${
                isSelected ? "bg-blue-50 border-blue-500" : "bg-white"
              }`}
              onClick={onSelect}
            >
              <p className="truncate font-medium">{provider.name}</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{provider.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {isSelected && (
        <div className="patients mt-3 sm:mt-4">
          <div className="line h-4 w-px bg-gray-300 mx-auto"></div>
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {provider.patients.map((patient) => (
              <PatientNode key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

