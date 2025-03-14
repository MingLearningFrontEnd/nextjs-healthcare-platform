"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function FilterControls({ className, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState(null)
  const [selectedValues, setSelectedValues] = useState({
    provider: "all-providers",
    procedure: "all-procedures",
    location: "all-locations",
    payer: "all-payers",
    time: "all-time"
  })

  const handleFilterChange = (type, value) => {
    const newValues = {
      ...selectedValues,
      [type]: value
    }
    setActiveFilter(type)
    setSelectedValues(newValues)
    onFilterChange(newValues, type)
  }

  const handleClearFilters = () => {
    const defaultValues = {
      provider: "all-providers",
      procedure: "all-procedures",
      location: "all-locations",
      payer: "all-payers",
      time: "all-time"
    }
    setActiveFilter(null)
    setSelectedValues(defaultValues)
    onFilterChange(defaultValues, null)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Select 
          value={selectedValues.provider}
          onValueChange={(value) => handleFilterChange("provider", value)}
          disabled={activeFilter && activeFilter !== "provider"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-providers">All Providers</SelectItem>
            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
            <SelectItem value="dr-johnson">Dr. Johnson</SelectItem>
            <SelectItem value="dr-williams">Dr. Williams</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={selectedValues.procedure}
          onValueChange={(value) => handleFilterChange("procedure", value)}
          disabled={activeFilter && activeFilter !== "procedure"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Procedure" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-procedures">All Procedures</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="filling">Filling</SelectItem>
            <SelectItem value="root-canal">Root Canal</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={selectedValues.location}
          onValueChange={(value) => handleFilterChange("location", value)}
          disabled={activeFilter && activeFilter !== "location"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-locations">All Locations</SelectItem>
            <SelectItem value="downtown">Downtown Office</SelectItem>
            <SelectItem value="suburban">Suburban Office</SelectItem>
            <SelectItem value="west-end">West End Office</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={selectedValues.payer}
          onValueChange={(value) => handleFilterChange("payer", value)}
          disabled={activeFilter && activeFilter !== "payer"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Payer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-payers">All Payers</SelectItem>
            <SelectItem value="delta-dental">Delta Dental</SelectItem>
            <SelectItem value="cigna">Cigna</SelectItem>
            <SelectItem value="aetna">Aetna</SelectItem>
            <SelectItem value="united">United Healthcare</SelectItem>
            <SelectItem value="self-pay">Self Pay</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={selectedValues.time}
          onValueChange={(value) => handleFilterChange("time", value)}
          disabled={activeFilter && activeFilter !== "time"}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Time Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-time">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        variant="outline" 
        onClick={handleClearFilters}
        className="w-full"
      >
        Clear Filters
      </Button>
    </div>
  )
} 