"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Save } from "lucide-react"

// Mock data for practices
const practicesData = [
  { id: "downtown", name: "Downtown Dental" },
  { id: "suburban", name: "Suburban Smiles" },
  { id: "riverside", name: "Riverside Dental Care" },
]

// Mock data for specialties
const specialtiesData = [
  "General Dentistry",
  "Orthodontics",
  "Periodontics",
  "Endodontics",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Prosthodontics",
  "Cosmetic Dentistry",
]

interface ProviderDetailsProps {
  provider: any
}

export default function ProviderDetails({ provider }: ProviderDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: provider.name,
    email: provider.email,
    phone: provider.phone,
    specialty: provider.specialty,
    bio: provider.bio,
    locations: provider.locations,
    availability: provider.availability,
    status: provider.status,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleLocationToggle = (locationId: string) => {
    setFormData((prev) => {
      const locations = [...prev.locations]
      if (locations.includes(locationId)) {
        return {
          ...prev,
          locations: locations.filter((id) => id !== locationId),
        }
      } else {
        return {
          ...prev,
          locations: [...locations, locationId],
        }
      }
    })
  }

  const handleSave = () => {
    // In a real app, this would save the updated provider data
    console.log("Updated provider data:", formData)
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Provider Details</CardTitle>
          <CardDescription>View and edit provider information</CardDescription>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" /> Edit Details
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider-name">Full Name</Label>
              <Input
                id="provider-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-specialty">Primary Specialty</Label>
              <Select
                value={formData.specialty}
                onValueChange={(value) => handleInputChange("specialty", value)}
                disabled={!isEditing}
              >
                <SelectTrigger id="provider-specialty">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialtiesData.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-email">Email</Label>
              <Input
                id="provider-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-phone">Phone Number</Label>
              <Input
                id="provider-phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-availability">Availability</Label>
              <Select
                value={formData.availability}
                onValueChange={(value) => handleInputChange("availability", value)}
                disabled={!isEditing}
              >
                <SelectTrigger id="provider-availability">
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="On-call">On-call</SelectItem>
                  <SelectItem value="Temporary">Temporary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider-status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                disabled={!isEditing}
              >
                <SelectTrigger id="provider-status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider-bio">Professional Bio</Label>
            <Textarea
              id="provider-bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              disabled={!isEditing}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-base">Practice Locations</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              {practicesData.map((practice) => (
                <div key={practice.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${practice.id}`}
                    checked={formData.locations.includes(practice.id)}
                    onCheckedChange={() => isEditing && handleLocationToggle(practice.id)}
                    disabled={!isEditing}
                  />
                  <Label
                    htmlFor={`location-${practice.id}`}
                    className={!isEditing && !formData.locations.includes(practice.id) ? "text-muted-foreground" : ""}
                  >
                    {practice.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

