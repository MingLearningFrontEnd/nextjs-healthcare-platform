"use client"

import { useState } from "react"
import { BarChart3, Calendar, ClipboardList, DollarSign, Users, LayoutDashboard, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FinancialAnalytics from "./FinancialAnalytics"
import AppointmentAnalytics from "./AppointmentAnalytics"
import ProcedureAnalytics from "./ProcedureAnalytics"
import ProviderAnalytics from "./ProviderAnalytics"
import OperationalAnalytics from "./OperationalAnalytics"
import OverviewDashboard from "./OverviewDashboard"
import FilterControls from "./FilterControls"

export default function PracticeAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showFilters, setShowFilters] = useState(false)
  const [currentFilters, setCurrentFilters] = useState({
    provider: "all-providers",
    procedure: "all-procedures",
    location: "all-locations",
    payer: "all-payers",
    time: "all-time"
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleFilterChange = async (filters, activeFilter) => {
    setIsLoading(true)
    setCurrentFilters(filters)
    setIsLoading(false)
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "financial", label: "Financial & Revenue", icon: DollarSign },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "procedures", label: "Procedures & Treatments", icon: ClipboardList },
    { id: "providers", label: "Provider Performance", icon: Users },
    { id: "operational", label: "Operational Performance", icon: BarChart3 },
  ]

  const renderContent = () => {
    const props = { filters: currentFilters }
    
    switch (activeTab) {
      case "financial":
        return <FinancialAnalytics {...props} />
      case "appointments":
        return <AppointmentAnalytics {...props} />
      case "procedures":
        return <ProcedureAnalytics {...props} />
      case "providers":
        return <ProviderAnalytics {...props} />
      case "operational":
        return <OperationalAnalytics {...props} />
      default:
        return <OverviewDashboard {...props} />
    }
  }

  const renderTabsOrDropdown = () => {
    const activeTabData = tabs.find(tab => tab.id === activeTab)
    const ActiveIcon = activeTabData?.icon

    return (
      <>
        {/* 在 xs 屏幕上显示下拉菜单，其他屏幕显示 Tabs */}
        <div className="md:hidden w-full">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-[#D9D9D9]">
              <SelectValue>
                <div className="flex items-center gap-2 font-semibold">
                  {ActiveIcon && <ActiveIcon className="h-4 w-4 " />}
                  <span>{activeTabData?.label}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabs.map(({ id, label, icon: Icon }) => (
                <SelectItem key={id} value={id}>
                  <div className="flex items-center gap-2 font-semibold">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* sm 及以上屏幕显示 Tabs */}
        <div className="hidden md:block w-full ,">
          <div className="border-b relative">
            <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent">
              {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap"
                >
                  <div className="flex items-center gap-1 px-2 lg:px-4">
                    <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                    <span>{label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mt-12">
        <h3 className="text-3xl font-bold">Analytics Dashboard</h3>
        <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {showFilters && (
        <FilterControls 
          className="mt-6" 
          onFilterChange={handleFilterChange}
        />
      )}

      <div className="relative">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {renderTabsOrDropdown()}

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <span className="loading">Loading...</span>
              </div>
            ) : (
              renderContent()
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

