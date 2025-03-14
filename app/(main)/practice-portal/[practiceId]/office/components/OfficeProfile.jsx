"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OfficeProfile({ data }) {
  // 先初始化一个空的表单数据
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    timezone: '',
    address: '',
    specialty: '',
    description: ''
  })

  // 当 data 变化时更新表单数据
  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        phone: data.phone,
        email: data.email,
        timezone: data.timezone,
        address: data.address,
        specialty: data.specialty,
        description: data.description
      })
    }
  }, [data])

  // 如果没有数据，显示加载状态
  if (!data) {
    return <div>Loading...</div>
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Saving office profile:", formData)
    alert("Office profile updated successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Office Profile</CardTitle>
        <CardDescription className="text-sm md:text-base">Manage your office details and general information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base">Office Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm md:text-base">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm md:text-base">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm md:text-base">Time Zone</Label>
              <Select value={formData.timezone} onValueChange={(value) => handleChange("timezone", value)}>
                <SelectTrigger id="timezone" className="text-sm md:text-base">
                  <SelectValue placeholder="Select time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles" className="text-sm md:text-base">Pacific Time (PT)</SelectItem>
                  <SelectItem value="America/Denver" className="text-sm md:text-base">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Chicago" className="text-sm md:text-base">Central Time (CT)</SelectItem>
                  <SelectItem value="America/New_York" className="text-sm md:text-base">Eastern Time (ET)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address" className="text-sm md:text-base">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="text-sm md:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty" className="text-sm md:text-base">Primary Specialty</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleChange("specialty", value)}>
                <SelectTrigger id="specialty" className="text-sm md:text-base">
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Dentistry" className="text-sm md:text-base">General Dentistry</SelectItem>
                  <SelectItem value="Family Dentistry" className="text-sm md:text-base">Family Dentistry</SelectItem>
                  <SelectItem value="Cosmetic Dentistry" className="text-sm md:text-base">Cosmetic Dentistry</SelectItem>
                  <SelectItem value="Orthodontics" className="text-sm md:text-base">Orthodontics</SelectItem>
                  <SelectItem value="Periodontics" className="text-sm md:text-base">Periodontics</SelectItem>
                  <SelectItem value="Endodontics" className="text-sm md:text-base">Endodontics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description" className="text-sm md:text-base">Office Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="text-sm md:text-base"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="text-sm md:text-base">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 