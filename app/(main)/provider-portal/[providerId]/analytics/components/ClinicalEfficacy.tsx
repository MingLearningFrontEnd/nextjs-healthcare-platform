"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Fillings", proposed: 100, accepted: 85 },
  { name: "Crowns", proposed: 50, accepted: 35 },
  { name: "Root Canals", proposed: 30, accepted: 18 },
  { name: "Extractions", proposed: 20, accepted: 18 },
  { name: "Implants", proposed: 10, accepted: 5 },
]

const overallAcceptanceRate = 0.75 // 75%

export default function ClinicalEfficacy() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Treatment Acceptance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-40 flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#e6e6e6" strokeWidth="20" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#2ECC71"
                strokeWidth="20"
                strokeDasharray={`${overallAcceptanceRate * 565} 565`}
                transform="rotate(-90 100 100)"
              />
              <text x="100" y="120" textAnchor="middle" fontSize="30" fill="#000">
                {`${(overallAcceptanceRate * 100).toFixed(0)}%`}
              </text>
            </svg>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Proposed vs Accepted Treatments</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="proposed" fill="#8884d8" name="Proposed" />
              <Bar dataKey="accepted" fill="#82ca9d" name="Accepted" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

