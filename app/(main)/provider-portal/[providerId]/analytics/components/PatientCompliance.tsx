"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", noShow: 5, cancellation: 8, recallSuccess: 85 },
  { month: "Feb", noShow: 4, cancellation: 7, recallSuccess: 87 },
  { month: "Mar", noShow: 6, cancellation: 9, recallSuccess: 82 },
  { month: "Apr", noShow: 3, cancellation: 6, recallSuccess: 89 },
  { month: "May", noShow: 5, cancellation: 8, recallSuccess: 86 },
  { month: "Jun", noShow: 4, cancellation: 7, recallSuccess: 88 },
]

export default function PatientCompliance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Compliance & Follow-Up</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="noShow" stroke="#8884d8" name="No-show Rate (%)" />
            <Line yAxisId="left" type="monotone" dataKey="cancellation" stroke="#82ca9d" name="Cancellation Rate (%)" />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="recallSuccess"
              stroke="#ffc658"
              name="Recall Success Rate (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

