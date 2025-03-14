"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import PracticeBanner from "../../components/PracticeBanner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileSettings from "./components/ProfileSettings"
import SecuritySettings from "./components/SecuritySettings"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("profile")

  // Set the active tab based on the URL parameter
  useEffect(() => {
    if (tabParam === "security") {
      setActiveTab("security")
    } else {
      setActiveTab("profile")
    }
  }, [tabParam])

  return (
    <div className="min-h-screen bg-transparent">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold mb-4">Practice Settings</h1>
      
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent mb-8">
            <TabsTrigger value="profile" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">Profile Settings</TabsTrigger>
            <TabsTrigger value="security" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

