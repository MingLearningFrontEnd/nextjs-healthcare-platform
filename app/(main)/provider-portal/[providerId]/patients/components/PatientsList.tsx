"use client"

import { useState } from "react"
import { Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Mock data for patients
const patients = [
  {
    id: 1,
    name: "John Smith",
    age: 42,
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    lastVisit: "2023-05-15",
    nextAppointment: "2023-08-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Emily Johnson",
    age: 35,
    email: "emily.johnson@example.com",
    phone: "(555) 234-5678",
    lastVisit: "2023-06-22",
    nextAppointment: "2023-09-22",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 28,
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    lastVisit: "N/A",
    nextAppointment: "2023-08-10",
    status: "New",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    age: 52,
    email: "sarah.wilson@example.com",
    phone: "(555) 456-7890",
    lastVisit: "2023-04-10",
    nextAppointment: "2023-10-10",
    status: "Active",
  },
  {
    id: 5,
    name: "David Lee",
    age: 31,
    email: "david.lee@example.com",
    phone: "(555) 567-8901",
    lastVisit: "2023-07-05",
    nextAppointment: "2023-08-05",
    status: "Active",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    age: 45,
    email: "jennifer.martinez@example.com",
    phone: "(555) 678-9012",
    lastVisit: "2023-06-15",
    nextAppointment: "2023-09-15",
    status: "Active",
  },
  {
    id: 7,
    name: "Robert Taylor",
    age: 60,
    email: "robert.taylor@example.com",
    phone: "(555) 789-0123",
    lastVisit: "2023-03-20",
    nextAppointment: null,
    status: "Inactive",
  },
  {
    id: 8,
    name: "Lisa Anderson",
    age: 38,
    email: "lisa.anderson@example.com",
    phone: "(555) 890-1234",
    lastVisit: "2023-05-25",
    nextAppointment: "2023-08-25",
    status: "Active",
  },
]

export default function PatientsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter ? patient.status === statusFilter : true
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "New":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return ""
    }
  }

  return (
    <Card className="shadow-all">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <CardTitle>Patients</CardTitle>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add New Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-2 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" /> Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("New")}>New</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("Inactive")}>Inactive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Next Appointment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.age}</TableCell>
                  <TableCell>
                    <div>{patient.email}</div>
                    <div className="text-sm text-muted-foreground">{patient.phone}</div>
                  </TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.nextAppointment || "Not scheduled"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

