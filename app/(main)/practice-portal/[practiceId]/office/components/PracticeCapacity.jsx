"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function PracticeCapacity({ data }) {
  const [formData, setFormData] = useState({
    operatories: 0,
    maxAppointmentsPerDay: 0,
    avgAppointmentLength: 0,
    appointmentBuffer: 0,
    maxPatientsPerProvider: 0,
    schedulingWindow: 0,
    appointmentTypes: []
  })

  useEffect(() => {
    if (data) {
      setFormData({
        operatories: data.operatories || 0,
        maxAppointmentsPerDay: data.maxAppointmentsPerDay || 0,
        avgAppointmentLength: data.avgAppointmentLength || 0,
        appointmentBuffer: data.appointmentBuffer || 0,
        maxPatientsPerProvider: data.maxPatientsPerProvider || 0,
        schedulingWindow: data.schedulingWindow || 0,
        appointmentTypes: data.appointmentTypes || []
      })
    }
  }, [data])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Practice Capacity</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Configure your practice's operational capacity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="operatories" className="text-sm md:text-base">
              Number of Operatories
            </Label>
            <Input
              id="operatories"
              type="number"
              value={formData.operatories}
              onChange={(e) => setFormData(prev => ({ ...prev, operatories: parseInt(e.target.value) }))}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxAppointments" className="text-sm md:text-base">
              Max Appointments per Day
            </Label>
            <Input
              id="maxAppointments"
              type="number"
              value={formData.maxAppointmentsPerDay}
              onChange={(e) => setFormData(prev => ({ ...prev, maxAppointmentsPerDay: parseInt(e.target.value) }))}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avgAppointmentLength" className="text-sm md:text-base">
              Average Appointment Length (minutes)
            </Label>
            <Input
              id="avgAppointmentLength"
              type="number"
              value={formData.avgAppointmentLength}
              onChange={(e) => setFormData(prev => ({ ...prev, avgAppointmentLength: parseInt(e.target.value) }))}
              className="text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="appointmentBuffer" className="text-sm md:text-base">
              Appointment Buffer (minutes)
            </Label>
            <Input
              id="appointmentBuffer"
              type="number"
              value={formData.appointmentBuffer}
              onChange={(e) => setFormData(prev => ({ ...prev, appointmentBuffer: parseInt(e.target.value) }))}
              className="text-sm md:text-base"
            />
          </div>

          {/* Add more capacity settings */}
        </div>

        <div className="flex justify-end mt-6">
          <Button type="submit" className="text-sm md:text-base">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
} 