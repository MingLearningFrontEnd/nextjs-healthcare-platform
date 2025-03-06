"use client"

import { useState } from "react"
import ProviderBanner from "../../components/ProviderBanner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PatientVolume from "./components/PatientVolume"
import AppointmentInsights from "./components/AppointmentInsights"
import ClaimsStatus from "./components/ClaimsStatus"
import PatientCompliance from "./components/PatientCompliance"
import TimeManagement from "./components/TimeManagement"
import Overview from "./components/Overview"

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen ">
      <ProviderBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Provider Analytics</h1>
      
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-fit grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mb-6">
            <TabsTrigger
              value="overview"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="patient-volume"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Patient Volume
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="claims"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Claims
            </TabsTrigger>
            <TabsTrigger
              value="compliance"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Compliance
            </TabsTrigger>
            <TabsTrigger
              value="time-management"
              className="text-sm sm:text-base font-semibold px-2 sm:px-5 py-2 sm:py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
            >
              Time Management
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview />
          </TabsContent>
          <TabsContent value="patient-volume">
            <PatientVolume />
          </TabsContent>
          <TabsContent value="appointments">
            <AppointmentInsights />
          </TabsContent>
          <TabsContent value="claims">
            <ClaimsStatus />
          </TabsContent>
          <TabsContent value="compliance">
            <PatientCompliance />
          </TabsContent>
          <TabsContent value="time-management">
            <TimeManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

