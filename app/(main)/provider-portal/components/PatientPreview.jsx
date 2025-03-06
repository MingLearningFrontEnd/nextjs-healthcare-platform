import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, AlertCircle, Pill } from "lucide-react"
import SynopsisPopup from "./SynopsisPopup"
import Link from "next/link"
import Image from "next/image"

export default function PatientPreview({ appointment }) {
  // 根据状态返回对应的样式
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

  return (
    <Card className="border-dashed">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <CardTitle className="text-sm sm:text-lg">Patient Insights</CardTitle>
        <Badge className={`${getStatusColor(appointment.status)} ml-2`}>
          {appointment.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="max-w-md mx-auto space-y-2 sm:space-y-3">
          {/* Patient Basic Info */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 relative mx-auto mb-2 sm:mb-4">
              <Image
                src={appointment.profileImage ||"https://i.pravatar.cc/160"}
                alt={appointment.patientName}
                fill
                sizes="w-12 h-12 sm:w-16 sm:h-16"
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-0.5 sm:mb-1">{appointment.patientName}</h3>
            <p className="text-sm sm:text-base">Age: {appointment.patientAge}</p>
          </div>

          {/* Reason for Visit */}
          <div className="text-center">
            <span className="text-sm sm:text-base font-semibold">Reason for Visit: </span>
            <span className="text-sm sm:text-base">{appointment.appointmentType}</span>
          </div>

          {/* Last Visit Summary */}
          <div className="text-center">
            <span className="text-sm sm:text-base font-semibold">Last Visit Summary: </span>
            <span className="text-sm sm:text-base">
              {appointment.lastVisit === "N/A" ? "First visit" : appointment.lastVisit}
            </span>
          </div>

          {/* Flagged Conditions */}
          {appointment.flaggedConditions.length > 0 && (
            <div className="text-center">
              <span className="text-sm sm:text-base font-semibold">Flagged Conditions: </span>
              <span className="">
                {appointment.flaggedConditions.map((condition, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-[#FF4DC4] text-white text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                  >
                    {condition}
                  </Badge>
                ))}
              </span>
            </div>
          )}

          {/* Medications */}
          {appointment.medications.length > 0 && appointment.medications[0] !== "None" && (
            <div className="text-center">
              <span className="text-sm sm:text-base font-semibold">Medications: </span>
              <span className="">
                {appointment.medications.map((medication, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1"
                  >
                    {medication}
                  </Badge>
                ))}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-2 sm:gap-4 pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="bg-[#d9d9d9] text-xs sm:text-sm px-2 sm:px-3"
            >
              <Link href={`/patient-portal/patient/${appointment.id}`}>Patient Profile</Link>
            </Button>
            <SynopsisPopup appointment={appointment} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

