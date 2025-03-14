"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PracticeBanner from "../../components/PracticeBanner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import OfficeProfile from "./components/OfficeProfile"
import OfficeHours from "./components/OfficeHours"
import ServiceOfferings from "./components/ServiceOfferings"
import PracticeCapacity from "./components/PracticeCapacity"
import UserManagement from "./components/UserManagement"
import AuditLogs from "./components/AuditLogs"
import { officeData, getOfficeData } from "./data/officeData"

// 用于下拉选择的诊所列表
const practicesList = Object.entries(officeData).map(([id, data]) => ({
  id,
  name: data.profile.name
}))

export default function OfficePage() {
  const searchParams = useSearchParams()
  const practiceParam = searchParams.get("practice")
  const [selectedOffice, setSelectedOffice] = useState(practiceParam || "downtown")
  const [selectedTab, setSelectedTab] = useState("profile")
  const practiceData = getOfficeData(selectedOffice)

  const tabs = [
    { value: "profile", label: "Office Profile" },
    { value: "hours", label: "Office Hours" },
    { value: "services", label: "Services" },
    { value: "capacity", label: "Capacity" },
    { value: "users", label: "User Management" },
    { value: "audit", label: "Audit Logs" },
  ]

  useEffect(() => {
    if (practiceParam) {
      setSelectedOffice(practiceParam)
    }
  }, [practiceParam])

  if (!practiceData || !practiceData.profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-transparent">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold">Office Management</h1>

          <div className="w-full md:w-auto">
            <Select value={selectedOffice} onValueChange={setSelectedOffice}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Select practice" />
              </SelectTrigger>
              <SelectContent>
                {practicesList.map((practice) => (
                  <SelectItem key={practice.id} value={practice.id}>
                    {practice.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          {/* Mobile Select */}
          <div className="md:hidden w-full mb-4">
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
          <div className="border-b border-gray-200 hidden md:block">
            <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="mt-8">
            <TabsContent value="profile" className="mt-0">
              <OfficeProfile data={practiceData.profile} />
            </TabsContent>

            <TabsContent value="hours" className="mt-0">
              <OfficeHours data={practiceData.hours} />
            </TabsContent>

            <TabsContent value="services" className="mt-0">
              <ServiceOfferings data={practiceData.services} />
            </TabsContent>

            <TabsContent value="capacity" className="mt-0">
              <PracticeCapacity data={practiceData.capacity} />
            </TabsContent>

            <TabsContent value="users" className="mt-0">
              <UserManagement data={practiceData.users} />
            </TabsContent>

            <TabsContent value="audit" className="mt-0">
              <AuditLogs selectedOffice={selectedOffice} />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  )
}

