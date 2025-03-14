"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface AddProviderFormProps {
  onClose: () => void
}

export default function AddProviderForm({ onClose }: AddProviderFormProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    bio: "",
    locations: [] as string[],
    availability: "Full-time",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
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

  const handleDayToggle = (day: string) => {
    setFormData((prev) => {
      const workingDays = [...prev.workingDays]
      if (workingDays.includes(day)) {
        return {
          ...prev,
          workingDays: workingDays.filter((d) => d !== day),
        }
      } else {
        return {
          ...prev,
          workingDays: [...workingDays, day],
        }
      }
    })
  }

  const handleSubmit = () => {
    // In a real app, this would save the provider data
    console.log("Provider data:", formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Provider</DialogTitle>
          <DialogDescription>Enter the provider's information to add them to your practice.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="locations">Locations & Availability</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="provider-name">Full Name</Label>
                <Input
                  id="provider-name"
                  placeholder="Dr. Jane Smith"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-specialty">Primary Specialty</Label>
                <Select value={formData.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
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
                  placeholder="jane.smith@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-phone">Phone Number</Label>
                <Input
                  id="provider-phone"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label htmlFor="provider-bio">Professional Bio</Label>
                <Textarea
                  id="provider-bio"
                  placeholder="Enter professional biography and qualifications..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label className="text-base">Practice Locations</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Select the locations where this provider will practice
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {practicesData.map((practice) => (
                    <div key={practice.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${practice.id}`}
                        checked={formData.locations.includes(practice.id)}
                        onCheckedChange={() => handleLocationToggle(practice.id)}
                      />
                      <Label htmlFor={`location-${practice.id}`}>{practice.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider-availability">Availability</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange("availability", value)}
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

              <div>
                <Label className="text-base">Working Days</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`day-${day}`}
                        checked={formData.workingDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={`day-${day}`}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="working-hours-start">Working Hours Start</Label>
                  <Select
                    value={formData.workingHours.start}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          start: value,
                        },
                      }))
                    }
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
                    value={formData.workingHours.end}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workingHours: {
                          ...prev.workingHours,
                          end: value,
                        },
                      }))
                    }
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
          </TabsContent>

          <TabsContent value="credentials" className="space-y-4 mt-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                In this section, you would add the provider's credentials, licenses, certifications, and other
                professional qualifications.
              </p>

              <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Credentials form coming soon</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            {activeTab !== "basic" && (
              <Button variant="outline" onClick={() => setActiveTab(activeTab === "locations" ? "basic" : "locations")}>
                Previous
              </Button>
            )}

            {activeTab !== "credentials" && (
              <Button onClick={() => setActiveTab(activeTab === "basic" ? "locations" : "credentials")}>Next</Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Provider</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

