"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OfficeHours({ data }) {
  const [formData, setFormData] = useState({
    regularHours: [],
    holidays: []
  })

  useEffect(() => {
    if (data) {
      setFormData({
        regularHours: data.regularHours || [],
        holidays: data.holidays || []
      })
    }
  }, [data])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      regularHours: prev.regularHours.map(hours => 
        hours.day === day ? { ...hours, [field]: value } : hours
      )
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Office hours updated successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Office Hours</CardTitle>
        <CardDescription className="text-sm md:text-base">Set your regular business hours and holidays</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-medium">Regular Hours</h3>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]"> {/* Minimum width to prevent squishing */}
                {formData.regularHours.map((hours) => (
                  <div key={hours.day} className="flex items-center space-x-4 mb-4">
                    <div className="w-24 md:w-32">
                      <Label className="text-sm md:text-base">{hours.day}</Label>
                    </div>
                    <Select 
                      value={hours.open} 
                      onValueChange={(value) => handleHoursChange(hours.day, 'open', value)}
                    >
                      <SelectTrigger className="text-sm md:text-base">
                        <SelectValue placeholder="Opening time" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Add time options */}
                        <SelectItem value="08:00">8:00 AM</SelectItem>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        {/* ... more options */}
                      </SelectContent>
                    </Select>
                    <span className="text-sm md:text-base">to</span>
                    <Select 
                      value={hours.close} 
                      onValueChange={(value) => handleHoursChange(hours.day, 'close', value)}
                    >
                      <SelectTrigger className="text-sm md:text-base">
                        <SelectValue placeholder="Closing time" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Add time options */}
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        {/* ... more options */}
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={hours.isOpen}
                        onCheckedChange={(checked) => handleHoursChange(hours.day, 'isOpen', checked)}
                      />
                      <Label className="text-sm md:text-base">Open</Label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-medium">Holidays</h3>
            {/* Holiday list and management */}
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="text-sm md:text-base">Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 