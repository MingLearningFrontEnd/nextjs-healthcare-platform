"use client"

import { useState } from "react"
import OfficeNode from "./OfficeNode"

// Mock data for the practice
const practiceData = {
  offices: [
    {
      id: 1,
      name: "Downtown Dental",
      address: "123 Main St, Cityville",
      providers: Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        name: `Dr. Provider ${i + 1}`,
        patients: Array.from({ length: 9 }, (_, j) => ({
          id: j + 1,
          name: `Patient ${j + 1}`,
        })),
      })),
    },
    {
      id: 2,
      name: "Suburban Smiles",
      address: "456 Oak Rd, Townsburg",
      providers: Array.from({ length: 4 }, (_, i) => ({
        id: i + 5,
        name: `Dr. Provider ${i + 5}`,
        patients: Array.from({ length: 9 }, (_, j) => ({
          id: j + 10,
          name: `Patient ${j + 10}`,
        })),
      })),
    },
    {
      id: 3,
      name: "Riverside Dental Care",
      address: "789 River Ave, Bridgecity",
      providers: Array.from({ length: 4 }, (_, i) => ({
        id: i + 9,
        name: `Dr. Provider ${i + 9}`,
        patients: Array.from({ length: 9 }, (_, j) => ({
          id: j + 19,
          name: `Patient ${j + 19}`,
        })),
      })),
    },
  ],
}

export default function PracticeTree() {
  const [selectedOffice, setSelectedOffice] = useState<number | null>(null)

  return (
    <div className="practice-tree">
      <h2 className="text-2xl font-bold mt-8 mb-6 bg-white rounded-lg p-4">Practice Structure</h2>
      <div className="offices flex flex-col sm:flex-row sm:justify-around bg-white rounded-lg p-4 min-h-[500px] gap-6 sm:gap-4">
        {practiceData.offices.map((office, index) => (
          <OfficeNode
            key={office.id}
            office={office}
            isSelected={selectedOffice === office.id}
            onSelect={() => setSelectedOffice(office.id === selectedOffice ? null : office.id)}
            position={
              index === 0 ? 'left' : 
              index === practiceData.offices.length - 1 ? 'right' : 
              'center'
            }
          />
        ))}
      </div>
    </div>
  )
}

