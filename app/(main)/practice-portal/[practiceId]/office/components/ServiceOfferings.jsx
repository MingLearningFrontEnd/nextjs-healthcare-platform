"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ServiceOfferings({ data }) {
  const [formData, setFormData] = useState({
    generalDentistry: [],
    cosmeticDentistry: [],
    orthodontics: []
  })
  const [selectedTab, setSelectedTab] = useState("general")

  const tabs = [
    { value: "general", label: "General Dentistry" },
    { value: "cosmetic", label: "Cosmetic Dentistry" },
    { value: "orthodontics", label: "Orthodontics" },
  ]

  useEffect(() => {
    if (data) {
      setFormData({
        generalDentistry: data.generalDentistry || [],
        cosmeticDentistry: data.cosmeticDentistry || [],
        orthodontics: data.orthodontics || []
      })
    }
  }, [data])

  const handleServiceChange = (category, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }))
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">Service Offerings</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Manage your practice's service offerings and pricing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          {/* Mobile Select */}
          <div className="sm:hidden w-full mb-4">
            <Select value={selectedTab} onValueChange={setSelectedTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {tabs.map((tab) => (
                  <SelectItem 
                    key={tab.value} 
                    value={tab.value}
                    className="font-medium"
                  >
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-sm md:text-base font-medium border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="general">
            <div className="space-y-4">
              {formData.generalDentistry.map((service, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <Input 
                    value={service.name}
                    onChange={(e) => handleServiceChange('generalDentistry', index, 'name', e.target.value)}
                    placeholder="Service name"
                    className="text-sm md:text-base"
                  />
                  <Input 
                    value={service.price}
                    onChange={(e) => handleServiceChange('generalDentistry', index, 'price', e.target.value)}
                    placeholder="Price"
                    className="text-sm md:text-base"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cosmetic">
            <div className="space-y-4">
              {formData.cosmeticDentistry.map((service, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <Input 
                    value={service.name}
                    onChange={(e) => handleServiceChange('cosmeticDentistry', index, 'name', e.target.value)}
                    placeholder="Service name"
                    className="text-xs sm:text-sm md:text-base"
                  />
                  <Input 
                    value={service.price}
                    onChange={(e) => handleServiceChange('cosmeticDentistry', index, 'price', e.target.value)}
                    placeholder="Price"
                    className="text-xs sm:text-sm md:text-base"
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orthodontics">
            <div className="space-y-4">
              {formData.orthodontics.map((service, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <Input 
                    value={service.name}
                    onChange={(e) => handleServiceChange('orthodontics', index, 'name', e.target.value)}
                    placeholder="Service name"
                    className="text-xs sm:text-sm md:text-base"
                  />
                  <Input 
                    value={service.price}
                    onChange={(e) => handleServiceChange('orthodontics', index, 'price', e.target.value)}
                    placeholder="Price"
                    className="text-xs sm:text-sm md:text-base"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button type="submit" className="text-sm md:text-base">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
} 