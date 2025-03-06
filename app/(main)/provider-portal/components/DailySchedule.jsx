"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import PatientPreview from "./PatientPreview"

// Mock data for appointments
const appointments = [
  {
    id: 1,
    time: "09:00 AM",
    duration: "30 min",
    patientName: "John Smith",
    patientAge: 42,
    appointmentType: "Routine Cleaning",
    status: "Completed",
    lastVisit: "2023-05-15",
    flaggedConditions: ["Sensitive gums"],
    medications: ["Lisinopril"],
    treatmentNotes: "Patient has shown improvement in gum health since last visit.",
  },
  {
    id: 2,
    time: "10:00 AM",
    duration: "45 min",
    patientName: "Emily Johnson",
    patientAge: 35,
    appointmentType: "Follow-Up",
    status: "In Progress",
    lastVisit: "2023-06-22",
    flaggedConditions: ["Cavity on lower right molar"],
    medications: ["None"],
    treatmentNotes: "Scheduled for filling next week.",
  },
  {
    id: 3,
    time: "11:00 AM",
    duration: "60 min",
    patientName: "Michael Brown",
    patientAge: 28,
    appointmentType: "New Patient Exam",
    status: "Checked In",
    lastVisit: "N/A",
    flaggedConditions: [],
    medications: ["Albuterol"],
    treatmentNotes: "First visit, comprehensive exam needed.",
  },
  {
    id: 4,
    time: "01:00 PM",
    duration: "30 min",
    patientName: "Sarah Wilson",
    patientAge: 52,
    appointmentType: "Routine Cleaning",
    status: "Scheduled",
    lastVisit: "2023-04-10",
    flaggedConditions: ["Periodontal disease"],
    medications: ["Metformin", "Atorvastatin"],
    treatmentNotes: "Continuing periodontal maintenance program.",
  },
  {
    id: 5,
    time: "02:00 PM",
    duration: "45 min",
    patientName: "David Lee",
    patientAge: 31,
    appointmentType: "Tooth Extraction",
    status: "Scheduled",
    lastVisit: "2023-07-05",
    flaggedConditions: ["Wisdom tooth impaction"],
    medications: ["None"],
    treatmentNotes: "Scheduled for extraction of lower right wisdom tooth.",
  },
  {
    id: 6,
    time: "03:00 PM",
    duration: "30 min",
    patientName: "Jennifer Martinez",
    patientAge: 45,
    appointmentType: "Follow-Up",
    status: "Scheduled",
    lastVisit: "2023-06-15",
    flaggedConditions: ["Crown replacement needed"],
    medications: ["Levothyroxine"],
    treatmentNotes: "Follow-up on temporary crown placement.",
  },
]

export default function DailySchedule() {
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const today = new Date()

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-[#7B61FF] text-white text-sm px-3 py-1 rounded-md"
      case "In Progress":
        return "bg-[#E6DC76] text-black text-sm px-3 py-1 rounded-md"
      case "Checked In":
            return "bg-[#FE95ED] text-black text-sm px-3 py-1 rounded-md"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 text-sm px-3 py-1 rounded-md"
    }
  }
  
  const handleAppointmentClick = (id) => {
    setSelectedAppointment(selectedAppointment === id ? null : id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        <div className="flex items-center space-x-2 bg-white py-1 px-4 sm:px-6 rounded-sm shadow-all w-full sm:w-auto">
          <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
          <h2 className="text-base sm:text-xl md:text-2xl font-semibold truncate">
            {format(today, "EEEE, MMMM d, yyyy")}
          </h2>
        </div>
        <div className="flex space-x-2 w-full sm:w-auto justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="shadow-all text-xs sm:text-sm md:text-md flex-1 sm:flex-none"
          >
            Previous Day
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="shadow-all text-xs sm:text-sm md:text-md flex-1 sm:flex-none"
          >
            Next Day
          </Button>
        </div>
      </div>

      <Card className="shadow-all">
        <CardHeader>
          <CardTitle>Daily Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="space-y-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                    selectedAppointment === appointment.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleAppointmentClick(appointment.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.time}</span>
                      <span className="text-sm text-muted-foreground">({appointment.duration})</span>
                    </div>
                    <Badge variant="outline" className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{appointment.patientName}</span>
                    </div>
                    <span className="text-sm">{appointment.appointmentType}</span>
                  </div>
                </div>
                {selectedAppointment === appointment.id && <PatientPreview appointment={appointment} />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

