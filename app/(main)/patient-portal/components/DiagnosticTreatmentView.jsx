"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {SmileIcon as Tooth, Syringe, Stethoscope, CalendarDays, ChevronRight, Pill, Scaling, XIcon as XRay, Timer, AlertCircle,} from "lucide-react"
import TeethIcon from '@/public/assets/Vector_Teeth.svg'
import BrushIcon from '@/public/assets/Vector_Brush.svg'
import CanlenderIcon from '@/public/assets/Vector_canlender.svg'
// Import the recordsData
import { recordsData } from "./DetailedRecordView"



// Extract diagnostics and treatments from recordsData
const diagnostics = recordsData.flatMap((record, index) =>
  record.diagnosis.conditions.map((condition, condIndex) => ({
    id: `d${index + 1}-${condIndex + 1}`,
    name: condition,
    date: record.appointmentOverview.date,
    description: record.providerNotes.join(" "),
    severity: record.diagnosis.severity || "medium",  // You might want to add severity to your mock data
    type: condition.toLowerCase().includes("cavity")
      ? "cavity"
      : condition.toLowerCase().includes("sensitivity")
        ? "sensitivity"
        : condition.toLowerCase().includes("gum")
          ? "gum"
          : "other",
    recordId: record.id,
  })),
)



const treatments = recordsData.flatMap((record, index) =>
  record.treatmentRecords.procedures.map((procedure, procIndex) => ({
    id: `t${index + 1}-${procIndex + 1}`,
    name: procedure,
    date: record.appointmentOverview.date,
    description: record.treatmentRecords.postTreatmentNotes,
    status: record.treatmentRecords.status // 假设数据中有 status 字段
      ? record.treatmentRecords.status.toLowerCase()
      : "pending", // You might want to add status to your mock data
    type: procedure.toLowerCase().includes("filling")
      ? "filling"
      : procedure.toLowerCase().includes("cleaning")
        ? "cleaning"
        : procedure.toLowerCase().includes("extraction")
          ? "extraction"
          : procedure.toLowerCase().includes("x-ray")
            ? "xray"
            : "medication",
    recordId: record.id,
  })),
)

// 添加一个日期格式化函数来确保一致性
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

function DiagnosticIcon({ type }) {
  switch (type) {
    case "cavity":
      return <Tooth className="h-4 w-4" aria-hidden="true" role="img" />
    case "sensitivity":
      return <AlertCircle className="h-4 w-4" aria-hidden="true" role="img" />
    case "gum":
      return <Stethoscope className="h-4 w-4" aria-hidden="true" role="img" />
    default:
      return <Tooth className="h-4 w-4" aria-hidden="true" role="img" />
  }
}

function TreatmentIcon({ type }) {
  switch (type) {
    case "filling":
      return <Tooth className="h-4 w-4" aria-hidden="true" role="img" />
    case "cleaning":
      return <Scaling className="h-4 w-4" aria-hidden="true" role="img" />
    case "extraction":
      return <Syringe className="h-4 w-4" aria-hidden="true" role="img" />
    case "medication":
      return <Pill className="h-4 w-4" aria-hidden="true" role="img" />
    case "xray":
      return <XRay className="h-4 w-4" aria-hidden="true" role="img" />
    default:
      return <Tooth className="h-4 w-4" aria-hidden="true" role="img" />
  }
}

function SeverityBadge({severity }) {
  if (typeof severity !== "string") {
    severity = "medium"; // 默认值
  }
  
  const colors = {
    low: "bg-[#C5FCD7] text-[#31F347] w-20 h-5 flex items-center justify-center rounded-md dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-[#F3BF31] w-20 h-5 flex items-center justify-center rounded-md  dark:bg-yellow-900 dark:text-yellow-300",
    high: "bg-red-100 text-red-800   w-20 h-5 flex items-center justify-center  rounded-md dark:bg-red-900 dark:text-red-300",
  }

  return (
    <Badge variant="outline" className={`${colors[severity]}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  )
}

function StatusBadge( {status} ) {
  if (typeof status !== "string") {
    status = "pending"; // 默认值
  }

  const variants = {
    completed: "bg-[#C5FCD7] text-[#31F347] w-20 h-5 flex items-center justify-center rounded-md dark:bg-green-900 dark:text-green-300",
    scheduled: "bg-blue-100 text-blue-800  w-20 h-5 flex items-center justify-center  rounded-md dark:bg-blue-900 dark:text-blue-300",
    pending: "bg-yellow-100 text-[#F3BF31] w-20 h-5 flex items-center justify-center rounded-md dark:bg-yellow-900 dark:text-yellow-300",
  }

  return (
    <Badge variant="outline" className={`${variants[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

export default function DiagnosticTreatmentView({ patientId }) {
  const [expandedDiagnostics, setExpandedDiagnostics] = useState(false)
  const [expandedTreatments, setExpandedTreatments] = useState(false)
  const router = useRouter()

  const visibleDiagnostics = expandedDiagnostics ? diagnostics : diagnostics.slice(0, 2)
  const visibleTreatments = expandedTreatments ? treatments : treatments.slice(0, 2)

  const handleDiagnosticClick = (diagnostic) => {
    router.push(`/patient-portal/${patientId}/record/${diagnostic.recordId}?tab=diagnosis`)
  }

  const handleTreatmentClick = (treatment) => {
    router.push(`/patient-portal/${patientId}/record/${treatment.recordId}?tab=treatment-records`)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 ">
       <Card className="shadow-all w-full max-w-[95vw] xs:max-w-[95vw] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl  sm:text-2xl md:text-2xl lg:text-2xl font-bold ">Diagnostics</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpandedDiagnostics(!expandedDiagnostics)} className="sm:text-[10px] md:text-[12px] lg:text-[14px] border-gray-300 border-2">
            {expandedDiagnostics ? "Show Less" : "View All"}
          </Button>
        </CardHeader>
        <CardDescription className="px-6 text-black mt-4 mb-1 text-[14px]">Recent diagnostic findings and observations</CardDescription>
        <CardContent >
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {visibleDiagnostics.map((diagnostic) => (
                <div
                  key={diagnostic.id}
                  className="flex items-start space-x-4 rounded-lg border-2 p-3 transition-colors hover:bg-muted/50 cursor-pointer "
                  onClick={() => handleDiagnosticClick(diagnostic)}
                >
                  <div className="rounded-full bg-primary/10 p-2">
                   <TeethIcon/>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium ">{diagnostic.name}</p>
                      <SeverityBadge severity={diagnostic.severity || 'medium'} />
                    </div>
                    <p className="text-[13px] lg:text-[14px]">{diagnostic.description}</p>
                    <div className="flex items-center sm:text-[10px] md:text-[12px] lg:text-[14px] ">
                      <CanlenderIcon className="mr-1  scale-75" aria-hidden="true" role="img" />
                      {formatDate(diagnostic.date)}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View details">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="shadow-all w-full max-w-[95vw] xs:max-w-[95vw] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
          <CardTitle className="text-xl  sm:text-2xl md:text-2xl lg:text-2xl font-bold ">Treatments</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setExpandedTreatments(!expandedTreatments)} className="sm:text-[10px] md:text-[12px] lg:text-[14px] border-gray-300 border-2">
            {expandedTreatments ? "Show Less" : "View All"}
          </Button>
        </CardHeader>
        <CardDescription className="px-6 text-black mt-4 mb-1 text-[14px]">Scheduled and completed treatments</CardDescription>
        <CardContent>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {visibleTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="flex items-start space-x-4 rounded-lg border-2 p-3 transition-colors hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleTreatmentClick(treatment)}
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    <BrushIcon/>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium ">{treatment.name}</p>
                      <StatusBadge status={treatment.status || "pending"} />
                    </div>
                    <p className="text-[13px]  lg:text-[14px] ">{treatment.description}</p>
                    <div className="flex items-center sm:text-[10px] md:text-[12px] lg:text-[14px]">
                      <CanlenderIcon className="mr-1 scale-75" aria-hidden="true" role="img" />
                      {formatDate(treatment.date)}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label="View details">
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

