"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MoreVertical, UserMinus, UserCog, AlertTriangle, Calendar } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for patients
const patientsData = [
  {
    id: "patient1",
    name: "John Smith",
    age: 42,
    lastVisit: "2025-02-15",
    nextAppointment: "2025-08-15",
    status: "active",
    priority: "normal",
    balance: 0,
    treatmentInProgress: false,
  },
  {
    id: "patient2",
    name: "Jane Doe",
    age: 35,
    lastVisit: "2025-01-22",
    nextAppointment: "2025-07-22",
    status: "active",
    priority: "high",
    balance: 150,
    treatmentInProgress: true,
  },
  {
    id: "patient3",
    name: "Michael Brown",
    age: 28,
    lastVisit: "2025-03-10",
    nextAppointment: "2025-09-10",
    status: "active",
    priority: "normal",
    balance: 0,
    treatmentInProgress: false,
  },
  {
    id: "patient4",
    name: "Sarah Wilson",
    age: 52,
    lastVisit: "2025-02-05",
    nextAppointment: "2025-08-05",
    status: "active",
    priority: "high",
    balance: 75,
    treatmentInProgress: true,
  },
  {
    id: "patient5",
    name: "David Lee",
    age: 31,
    lastVisit: "2025-03-01",
    nextAppointment: "2025-09-01",
    status: "active",
    priority: "normal",
    balance: 0,
    treatmentInProgress: false,
  },
  {
    id: "patient6",
    name: "Jennifer Martinez",
    age: 45,
    lastVisit: "2025-01-15",
    nextAppointment: "2025-07-15",
    status: "inactive",
    priority: "normal",
    balance: 0,
    treatmentInProgress: false,
  },
  {
    id: "patient7",
    name: "Robert Taylor",
    age: 60,
    lastVisit: "2025-02-20",
    nextAppointment: null,
    status: "active",
    priority: "high",
    balance: 320,
    treatmentInProgress: true,
  },
  {
    id: "patient8",
    name: "Lisa Anderson",
    age: 38,
    lastVisit: "2025-03-05",
    nextAppointment: "2025-09-05",
    status: "active",
    priority: "normal",
    balance: 0,
    treatmentInProgress: false,
  },
]

// Mock data for other providers
const otherProvidersData = [
  { id: "provider1", name: "Dr. Emily Johnson" },
  { id: "provider2", name: "Dr. Michael Smith" },
  { id: "provider3", name: "Dr. Sarah Patel" },
  { id: "provider4", name: "Dr. David Lee" },
  { id: "provider5", name: "Dr. Lisa Garcia" },
  { id: "provider6", name: "Dr. James Wilson" },
  { id: "provider7", name: "Dr. Maria Brown" },
]

interface PatientRosterProps {
  provider: any
}

export default function PatientRoster({ provider }: PatientRosterProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAssignPatient, setShowAssignPatient] = useState(false)
  const [showReassignPatient, setShowReassignPatient] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [selectedProvider, setSelectedProvider] = useState("")

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleReassignPatient = (patient: any) => {
    setSelectedPatient(patient)
    setShowReassignPatient(true)
  }

  const handleConfirmReassign = () => {
    // In a real app, this would reassign the patient to another provider
    console.log(`Reassigning patient ${selectedPatient?.name} to provider ${selectedProvider}`)
    setShowReassignPatient(false)
    setSelectedPatient(null)
    setSelectedProvider("")
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "normal":
        return <Badge variant="outline">Normal</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Patient Roster</CardTitle>
            <CardDescription>Manage patients assigned to {provider.name}</CardDescription>
          </div>
          <Button onClick={() => setShowAssignPatient(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Assign Patient
          </Button>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Next Appointment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No patients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          {patient.name}
                          {patient.treatmentInProgress && <AlertTriangle className="ml-2 h-4 w-4 text-amber-500" />}
                          {patient.balance > 0 && (
                            <Badge variant="outline" className="ml-2 bg-red-100 text-red-800">
                              ${patient.balance}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{patient.age}</TableCell>
                      <TableCell>{patient.lastVisit}</TableCell>
                      <TableCell>
                        {patient.nextAppointment ? (
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {patient.nextAppointment}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">Not scheduled</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                          {patient.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{getPriorityBadge(patient.priority)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <UserCog className="mr-2 h-4 w-4" />
                              View Patient Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Appointment
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleReassignPatient(patient)}>
                              <UserMinus className="mr-2 h-4 w-4" />
                              Reassign to Another Provider
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Assign Patient Dialog */}
      <Dialog open={showAssignPatient} onOpenChange={setShowAssignPatient}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Patient to Provider</DialogTitle>
            <DialogDescription>Select a patient to assign to {provider.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              This dialog would contain a searchable list of patients who are not currently assigned to this provider.
            </p>
            <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Patient selection interface coming soon</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssignPatient(false)}>
              Cancel
            </Button>
            <Button>Assign Patient</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reassign Patient Dialog */}
      <Dialog open={showReassignPatient} onOpenChange={setShowReassignPatient}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reassign Patient</DialogTitle>
            <DialogDescription>Select another provider to reassign {selectedPatient?.name}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-provider">Select New Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger id="new-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {otherProvidersData
                      .filter((p) => p.id !== provider.id)
                      .map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReassignPatient(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmReassign} disabled={!selectedProvider}>
              Confirm Reassignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

