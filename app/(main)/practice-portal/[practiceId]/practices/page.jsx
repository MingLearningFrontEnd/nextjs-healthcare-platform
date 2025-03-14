"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PracticeBanner from "../../components/PracticeBanner"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, MapPin, Phone, Mail, Users, Plus, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useParams } from "next/navigation"
import { officeData } from "../office/data/officeData"

export default function PracticesPage() {
  const router = useRouter()
  const practices = Object.entries(officeData).map(([id, data]) => ({
    id,
    name: data.profile.name,
    address: data.profile.address,
    phone: data.profile.phone,
    email: data.profile.email,
    providers: data.profile.providers,
    patients: data.profile.patients,
    status: data.profile.status,
  }))
  const { practiceId } = useParams()

  const handleManageOffice = (id) => {
    router.push(`/practice-portal/${practiceId}/office?practice=${id}`)
  }

  return (
    <div className="min-h-screen bg-transparent">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Practice Locations</h1>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Practice
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practices.map((practice) => (
            <Card key={practice.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{practice.name}</CardTitle>
                  <Badge variant={practice.status === "active" ? "default" : "secondary"}>
                    {practice.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <p className="text-sm">{practice.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">{practice.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">{practice.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm">
                      {practice.providers} Providers · {practice.patients} Patients
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3">
                <Button variant="outline" size="sm" onClick={() => handleManageOffice(practice.id)}>
                  <Building className="mr-2 h-4 w-4" /> Manage Office
                </Button>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}