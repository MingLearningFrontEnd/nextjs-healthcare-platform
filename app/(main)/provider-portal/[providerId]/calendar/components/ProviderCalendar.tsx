"use client"

import { useState } from "react"
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for appointments
const appointments = [
  {
    id: 1,
    patientName: "John Smith",
    appointmentType: "Routine Cleaning",
    date: "2023-08-14",
    time: "09:00 AM",
    duration: 30,
  },
  {
    id: 2,
    patientName: "Emily Johnson",
    appointmentType: "Follow-Up",
    date: "2023-08-14",
    time: "10:00 AM",
    duration: 45,
  },
  {
    id: 3,
    patientName: "Michael Brown",
    appointmentType: "New Patient Exam",
    date: "2023-08-14",
    time: "11:00 AM",
    duration: 60,
  },
  {
    id: 4,
    patientName: "Sarah Wilson",
    appointmentType: "Routine Cleaning",
    date: "2023-08-15",
    time: "01:00 PM",
    duration: 30,
  },
  {
    id: 5,
    patientName: "David Lee",
    appointmentType: "Tooth Extraction",
    date: "2023-08-15",
    time: "02:00 PM",
    duration: 45,
  },
  {
    id: 6,
    patientName: "Jennifer Martinez",
    appointmentType: "Follow-Up",
    date: "2023-08-16",
    time: "03:00 PM",
    duration: 30,
  },
  {
    id: 7,
    patientName: "Robert Taylor",
    appointmentType: "Dental Filling",
    date: "2023-08-17",
    time: "09:30 AM",
    duration: 45,
  },
  {
    id: 8,
    patientName: "Lisa Anderson",
    appointmentType: "Teeth Whitening",
    date: "2023-08-18",
    time: "02:30 PM",
    duration: 60,
  },
]

export default function ProviderCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("week")

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })

  const nextPeriod = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, 1))
    } else if (view === "week") {
      setCurrentDate(addWeeks(currentDate, 1))
    } else {
      // For month view, add 4 weeks as an approximation
      setCurrentDate(addWeeks(currentDate, 4))
    }
  }

  const prevPeriod = () => {
    if (view === "day") {
      setCurrentDate(addDays(currentDate, -1))
    } else if (view === "week") {
      setCurrentDate(subWeeks(currentDate, 1))
    } else {
      // For month view, subtract 4 weeks as an approximation
      setCurrentDate(subWeeks(currentDate, 4))
    }
  }

  const renderWeekView = () => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, index) => {
          const dateStr = format(day, "yyyy-MM-dd")
          const dayAppointments = appointments.filter((app) => app.date === dateStr)

          return (
            <div key={index} className="min-h-[200px]">
              <div className="text-center p-2 font-medium border-b">
                <div>{format(day, "EEE")}</div>
                <div
                  className={`text-sm ${format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd") ? "bg-primary text-primary-foreground rounded-full w-7 h-7 flex items-center justify-center mx-auto" : ""}`}
                >
                  {format(day, "d")}
                </div>
              </div>
              <div className="p-1">
                {dayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="mb-1 p-1 text-xs bg-primary/10 rounded border border-primary/20 cursor-pointer hover:bg-primary/20"
                  >
                    <div className="font-medium truncate">{appointment.time}</div>
                    <div className="truncate">{appointment.patientName}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={prevPeriod}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextPeriod}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <CalendarIcon className="mr-2 h-4 w-4" />
          <h2 className="text-xl font-semibold">
            {view === "day"
              ? format(currentDate, "MMMM d, yyyy")
              : view === "week"
                ? `${format(startOfCurrentWeek, "MMMM d")} - ${format(addDays(startOfCurrentWeek, 6), "MMMM d, yyyy")}`
                : format(currentDate, "MMMM yyyy")}
          </h2>
        </div>

        {view === "week" && renderWeekView()}

        {view === "day" && (
          <div className="space-y-4">
            <h3 className="font-medium">{format(currentDate, "EEEE, MMMM d, yyyy")}</h3>
            <div className="space-y-2">
              {appointments
                .filter((app) => app.date === format(currentDate, "yyyy-MM-dd"))
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted/50 cursor-pointer"
                  >
                    <div>
                      <div className="font-medium">
                        {appointment.time} ({appointment.duration} min)
                      </div>
                      <div>{appointment.patientName}</div>
                    </div>
                    <Badge>{appointment.appointmentType}</Badge>
                  </div>
                ))}
              {appointments.filter((app) => app.date === format(currentDate, "yyyy-MM-dd")).length === 0 && (
                <div className="text-center p-4 text-muted-foreground">No appointments scheduled for this day</div>
              )}
            </div>
          </div>
        )}

        {view === "month" && (
          <div className="text-center p-4 text-muted-foreground">Month view is under development</div>
        )}
      </CardContent>
    </Card>
  )
}

