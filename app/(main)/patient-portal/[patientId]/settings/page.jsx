"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import PatientBanner from "../../components/PatientBanner"
import { useSelector } from 'react-redux';

export default function SettingsPage({params}) {
  const router = useRouter()
  const {patientId} = params
  const {patient} = useSelector((state) => state.patientSlice);
  const [profileImage, setProfileImage] = useState("/placeholder.svg")
  

 
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result )
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted")
    // For now, we'll just show an alert
    alert("Settings updated successfully!")
  }
 
 
  return (
    <div className="min-h-screen bg-transparent">
      <main className="container mx-auto py-20">
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Account Settings</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="shadow-all">
            <CardHeader>
              <CardTitle className=" font-bold">Profile Image</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
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
                  <Label htmlFor="profile-image" className="cursor-pointer bg-[#D9D9D9] text-black hover:text-white">
                    <Upload className="mr-2 h-4 w-4" /> Upload New Image
                  </Label>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent shadow-none border-none ">
            <CardHeader className="px-0 " >
              <CardTitle className="font-bold bg-white py-4 rounded-sm pl-3 shadow-all">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 p-0">
              <div className="space-y-2 ">
                <Label htmlFor="full-name" className="font-bold text-[14px]">Full Name</Label>
                <Input id="full-name" placeholder={
                    patient?.name
                      ? `${patient.name[0]?.given.join(" ")} ${patient.name[0]?.family}`
                      : ""
                  } className="shadow-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-of-birth" className="font-bold text-[14px]">Date of Birth</Label>
                <Input id="date-of-birth" type="date"  defaultValue={patient?.birthDate || ""} className="shadow-all"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ssn" className="font-bold text-[14px]">Social Security Number</Label>
                <Input id="ssn" placeholder={patient?.SSN||''} className="shadow-all"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="font-bold text-[14px]">Gender</Label>
                <Input id="gender" placeholder={patient?.gender || ""} className="shadow-all"/>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address" className="font-bold text-[14px]">Address</Label>
                <Textarea id="address"  placeholder={
                    patient?.address
                      ? `${patient.address[0]?.line.join(", ")}, ${patient.address[0]?.city}, ${patient.address[0]?.state} ${patient.address[0]?.postalCode}`
                      : ""
                  }  className="shadow-all"/>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent shadow-none border-none ">
          <CardHeader className="px-0 " >
          <CardTitle className="font-bold bg-white py-4 rounded-sm pl-3 shadow-all">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2  p-0">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-bold text-[14px]">Phone Number</Label>
                <Input id="phone" type="tel"  placeholder={
                    patient?.telecom?.find((t) => t.use === "home")?.value || ""
                  }  className="shadow-all"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="font-bold text-[14px]">Email</Label>
                <Input id="email" type="email" placeholder={
                    patient?.telecom?.find((t) => t.system === "email")?.value || ""
                  }  className="shadow-all"/>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent shadow-none border-none ">
          <CardHeader className="px-0 " >
          <CardTitle className="font-bold bg-white py-4 rounded-sm pl-3 shadow-all">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 p-0">
              <div className="space-y-2">
                <Label htmlFor="emergency-name" className="font-bold text-[14px]">Name</Label>
                <Input 
                  id="emergency-name" 
                  placeholder={patient?.contact?.[0]?.name || ""}
                  className="shadow-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-relation" className="font-bold text-[14px]">Relation</Label>
                <Input 
                  id="emergency-relation" 
                  placeholder={patient?.contact?.[0]?.relationship || ""} 
                  className="shadow-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-phone" className="font-bold text-[14px]">Phone Number</Label>
                <Input 
                  id="emergency-phone" 
                  type="tel" 
                  placeholder={patient?.contact?.[0]?.telecom?.[0]?.value || ""} 
                  className="shadow-all" 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent shadow-none border-none ">
          <CardHeader className="px-0 " >
          <CardTitle className="font-bold bg-white py-4 rounded-sm pl-3 shadow-all">Insurance Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 p-0">
              <div className="space-y-2">
                <Label htmlFor="insurance-provider" className="font-bold text-[14px]">Provider</Label>
                <Input 
                  id="insurance-provider" 
                  placeholder={patient?.insurance?.[0]?.provider || ""} 
                  className="shadow-all" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policy-number" className="font-bold text-[14px]">Policy Number</Label>
                <Input 
                  id="policy-number" 
                  placeholder={patient?.insurance?.[0]?.policyNumber || ""} 
                  className="shadow-all" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-number" className="font-bold text-[14px]">Group Number</Label>
                <Input 
                  id="group-number" 
                  placeholder={patient?.insurance?.[0]?.groupNumber || ""} 
                  className="shadow-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiration-date" className="font-bold text-[14px]">Expiration Date</Label>
                <Input 
                  id="expiration-date" 
                  type="date" 
                  defaultValue={patient?.insurance?.[0]?.expirationDate || ""}
                  className="shadow-all"
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </main>
    </div>
  )
}

