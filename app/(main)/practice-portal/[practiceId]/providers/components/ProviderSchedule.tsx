"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Save, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProviderScheduleProps {
  provider: any
}

export default function ProviderSchedule({ provider }: ProviderScheduleProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [workingDays, setWorkingDays] = useState(provider.workingDays || [])
  const [workingHours, setWorkingHours] = useState(provider.workingHours || { start: "09:00", end: "17:00" })

  // Mock data for special hours
  const [specialHours, setSpecialHours] = useState([
    {
      id: 1,
      date: "2025-04-15",
      hours: { start: "10:00", end: "15:00" },
      note: "Limited availability due to staff meeting",
    },
    {
      id: 2,
      date: "2025-04-22",
      hours: { start: "09:00", end: "13:00" },
      note: "Half day for continuing education",
    },
  ])

  const handleDayToggle = (day: string) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter((d: string) => d !== day))
    } else {
      setWorkingDays([...workingDays, day])
    }
  }

  const handleHoursChange = (type: "start" | "end", value: string) => {
    setWorkingHours({
      ...workingHours,
      [type]: value,
    })
  }

  const handleSave = () => {
    // In a real app, this would save the updated schedule
    console.log("Updated schedule:", { workingDays, workingHours, specialHours })
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Regular Schedule</CardTitle>
            <CardDescription>Set the provider's regular working days and hours</CardDescription>
          </div>
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Schedule
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Schedule
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-6">
            <div>
              <Label className="text-base">Working Days</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${day}`}
                      checked={workingDays.includes(day)}
                      onCheckedChange={() => isEditing && handleDayToggle(day)}
                      disabled={!isEditing}
                    />
                    <Label
                      htmlFor={`day-${day}`}
                      className={!isEditing && !workingDays.includes(day) ? "text-muted-foreground" : ""}
                    >
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="working-hours-start">Working Hours Start</Label>
                <Select
                  value={workingHours.start}
                  onValueChange={(value) => handleHoursChange("start", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="working-hours-start">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="working-hours-end">Working Hours End</Label>
                <Select
                  value={workingHours.end}
                  onValueChange={(value) => handleHoursChange("end", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="working-hours-end">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <SelectItem key={hour} value={`${hour.toString().padStart(2, "0")}:00`}>
                        {`${hour.toString().padStart(2, "0")}:00`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Special Hours & Exceptions</CardTitle>
            <CardDescription>Set special hours for specific dates</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Special Hours
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          {specialHours.length === 0 ? (
            <p className="text-muted-foreground">No special hours or exceptions set.</p>
          ) : (
            <div className="space-y-4">
              {specialHours.map((special) => (
                <div key={special.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{special.date}</Badge>
                      <span className="font-medium">
                        {special.hours.start} - {special.hours.end}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{special.note}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

