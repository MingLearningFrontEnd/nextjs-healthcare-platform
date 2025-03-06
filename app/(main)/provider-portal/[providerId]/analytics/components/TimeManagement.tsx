"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { day: "Mon", patientCare: 6, nonPatientCare: 2 },
  { day: "Tue", patientCare: 7, nonPatientCare: 1 },
  { day: "Wed", patientCare: 5, nonPatientCare: 3 },
  { day: "Thu", patientCare: 6.5, nonPatientCare: 1.5 },
  { day: "Fri", patientCare: 5.5, nonPatientCare: 2.5 },
]

const appointmentData = [
  { day: "Mon", avgLength: 45, overrun: 10 },
  { day: "Tue", avgLength: 50, overrun: 15 },
  { day: "Wed", avgLength: 40, overrun: 5 },
  { day: "Thu", avgLength: 55, overrun: 20 },
  { day: "Fri", avgLength: 45, overrun: 10 },
]

export default function TimeManagement() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Daily Time Utilization</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patientCare" stackId="a" fill="#8884d8" name="Patient Care Time" />
              <Bar dataKey="nonPatientCare" stackId="a" fill="#82ca9d" name="Non-Patient Care Time" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Length Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgLength" fill="#8884d8" name="Average Appointment Length (min)" />
              <Bar dataKey="overrun" fill="#82ca9d" name="Average Overrun (min)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

