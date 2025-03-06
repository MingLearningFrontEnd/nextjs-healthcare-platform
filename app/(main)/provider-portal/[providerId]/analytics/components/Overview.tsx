import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PatientVolume from "./PatientVolume"
import AppointmentInsights from "./AppointmentInsights"
import ClaimsStatus from "./ClaimsStatus"
import PatientCompliance from "./PatientCompliance"
import ClinicalEfficacy from "./ClinicalEfficacy"
import TimeManagement from "./TimeManagement"

export default function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Patient Volume & Visit Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientVolume />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Appointment Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentInsights />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Claims Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ClaimsStatus />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Patient Compliance</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientCompliance />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Clinical Efficacy</CardTitle>
        </CardHeader>
        <CardContent>
          <ClinicalEfficacy />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Time Management</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeManagement />
        </CardContent>
      </Card>
    </div>
  )
}

