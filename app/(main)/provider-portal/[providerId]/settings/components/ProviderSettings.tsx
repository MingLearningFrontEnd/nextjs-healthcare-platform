"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const specialties = [
  "Orthodontics and Dentofacial Orthopedics",
  "Pediatric Dentistry",
  "Periodontics",
  "Prosthodontics",
  "Oral and Maxillofacial Surgery",
  "Oral and Maxillofacial Pathology",
  "Endodontics",
  "Public Health Dentistry",
  "Dental Anesthesiology",
  "General Dentist",
  "Oral and Maxillofacial Radiology"
]

export default function ProviderSettings() {
  const [profileImage, setProfileImage] = useState("/placeholder.svg")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Tabs defaultValue="profile" className="space-y-4">
      <TabsList className="w-fit grid grid-cols-2 sm:grid-cols-4 mb-6">
        <TabsTrigger
          value="profile"
          className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="schedule"
          className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
        >
          Schedule
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
        >
          Security
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card className="bg-transparent border-0 shadow-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold mb-6 bg-white rounded-lg shadow-all p-4 sm:p-6">Profile Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            <div className=" bg-white flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 shadow-all rounded-lg p-4 sm:p-6">
              <Image
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
              <div>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button asChild>
                  <Label htmlFor="profile-image" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" /> Upload New Image
                  </Label>
                </Button>
              </div>
            </div>
            <h2 className="text-lg font-bold bg-white rounded-lg shadow-all py-2 px-4">Personal Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="Dr. Sarah Johnson" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="credentials">Specialties</Label>
                <Select>
                  <SelectTrigger className="shadow-all">
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="sarah.johnson@dentalpractice.com" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" className="shadow-all" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea id="bio" placeholder="Enter your professional biography here..." rows={4} className="shadow-all" />
              </div>
            </div>

            <Button className="w-fit">Save Changes</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive email notifications for appointments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive text message reminders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Patient Updates</p>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when patients update their information
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Schedule Changes</p>
                <p className="text-sm text-muted-foreground">Receive notifications for schedule changes</p>
              </div>
              <Switch defaultChecked />
            </div>

            <Button className="mt-4">Save Preferences</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule">
        <Card className="bg-transparent border-0 shadow-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold mb-6 bg-white rounded-lg shadow-all p-4 sm:p-4">Schedule Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            <h2 className="text-lg font-bold bg-white rounded-lg shadow-all py-2 px-4">Working Hours</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="work-days">Working Days</Label>
                <Input id="work-days" placeholder="Monday - Friday" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="work-hours">Working Hours</Label>
                <Input id="work-hours" placeholder="9:00 AM - 5:00 PM" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="appointment-duration">Default Appointment Duration</Label>
                <Input id="appointment-duration" placeholder="30 minutes" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buffer-time">Buffer Time Between Appointments</Label>
                <Input id="buffer-time" placeholder="15 minutes" className="shadow-all" />
              </div>
            </div>

            <h2 className="text-lg font-bold bg-white rounded-lg shadow-all py-2 px-4">Vacation Planning</h2>
            <div className="space-y-2">
              <Label htmlFor="vacation-dates">Upcoming Vacation Dates</Label>
              <Textarea 
                id="vacation-dates" 
                placeholder="Enter your upcoming vacation dates..." 
                rows={3} 
                className="shadow-all"
              />
            </div>

            <Button className="w-fit">Save Schedule Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card className="bg-transparent border-0 shadow-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl font-bold mb-6 bg-white rounded-lg shadow-all p-4 sm:p-4">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-0">
            <h2 className="text-lg font-bold bg-white rounded-lg shadow-all py-2 px-4">Password Management</h2>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="shadow-all" />
              </div>
            </div>

            <h2 className="text-lg font-bold bg-white rounded-lg shadow-all py-2 px-4">Additional Security</h2>
            <div className="bg-white rounded-lg shadow-all p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>

            <Button className="w-fit">Update Security Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

