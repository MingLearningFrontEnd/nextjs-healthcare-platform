"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const visitReasons = [
  { name: "Routine Cleaning", value: 40 },
  { name: "Toothache", value: 20 },
  { name: "Consultation", value: 15 },
  { name: "Filling", value: 15 },
  { name: "Other", value: 10 },
]

const procedures = [
  { name: "Cleaning", value: 35 },
  { name: "Filling", value: 25 },
  { name: "Crown", value: 15 },
  { name: "Root Canal", value: 10 },
  { name: "Extraction", value: 15 },
]

const appointments = [
  { time: "09:00", patient: "John Doe", type: "Routine Cleaning" },
  { time: "10:00", patient: "Jane Smith", type: "Filling" },
  { time: "11:00", patient: "Bob Johnson", type: "Consultation" },
  { time: "13:00", patient: "Alice Brown", type: "Root Canal" },
  { time: "14:00", patient: "Charlie Davis", type: "Crown" },
]

export default function AppointmentInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {visitReasons.map((reason, index) => (
            <div key={reason.name} className="mb-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-primary mr-2" />
                <div className="flex justify-between w-full">
                  <span>{reason.name}</span>
                  <span>{reason.value}%</span>
                </div>
              </div>
              {index < visitReasons.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

