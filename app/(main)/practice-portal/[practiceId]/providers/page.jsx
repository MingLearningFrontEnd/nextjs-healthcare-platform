"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PracticeBanner from "../../components/PracticeBanner"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, UserPlus, Users, Calendar, Stethoscope, LayoutGrid, Table2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ProvidersList from "./components/ProvidersList"
import ProvidersTable from "./components/ProvidersTable"
import AddProviderForm from "./components/AddProviderForm"
import { useParams } from "next/navigation"

// Mock data for practices
const practicesData = [
  { id: "all", name: "All Locations" },
  { id: "downtown", name: "Downtown Dental" },
  { id: "suburban", name: "Suburban Smiles" },
  { id: "riverside", name: "Riverside Dental Care" },
]

export default function ProvidersPage() {
  const router = useRouter()
  const params = useParams()
  const practiceId = params.practiceId
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [activeTab, setActiveTab] = useState("list")
  const [viewMode, setViewMode] = useState("table")
  const [showAddProvider, setShowAddProvider] = useState(false)

  const handleProviderSelect = (providerId) => {
    router.push(`/practice-portal/${practiceId}/providers/${providerId}`)
  }

  return (
    <div className="min-h-screen bg-transparent">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-12">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">Providers Management</h1>
            <Button 
              onClick={() => setShowAddProvider(true)}
              className="w-full sm:w-auto text-sm md:text-base"
            >
              <UserPlus className="mr-2 h-3 w-3 md:h-4 md:w-4" /> Add Provider
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search providers by name, specialty, or ID..."
                className="pl-8 text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto bg-white pl-2 rounded-md">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full sm:w-[180px] text-sm md:text-base border-none">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    {practicesData.map((practice) => (
                      <SelectItem 
                        key={practice.id} 
                        value={practice.id}
                        className="text-sm md:text-base"
                      >
                        {practice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    {viewMode === "table" ? <Table2 className="h-4 w-4" /> : <LayoutGrid className="h-4 w-4" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setViewMode("table")}>
                    <Table2 className="h-4 w-4 mr-2" /> Table View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewMode("grid")}>
                    <LayoutGrid className="h-4 w-4 mr-2" /> Grid View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="sm:hidden w-full mb-4">
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" /> Providers List
                  </div>
                </SelectItem>
                <SelectItem value="schedule">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Schedule Overview
                  </div>
                </SelectItem>
                <SelectItem value="specialties">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4" /> Specialties
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden sm:block">
            <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent">
              <TabsTrigger value="list" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">
                <Users className="mr-2 h-4 w-4" /> Providers List
              </TabsTrigger>
              <TabsTrigger value="schedule" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">
                <Calendar className="mr-2 h-4 w-4" /> Schedule Overview
              </TabsTrigger>
              <TabsTrigger value="specialties" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">
                <Stethoscope className="mr-2 h-4 w-4" /> Specialties
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            {viewMode === "table" ? (
              <ProvidersTable
                searchTerm={searchTerm}
                selectedLocation={selectedLocation}
                onProviderSelect={handleProviderSelect}
              />
            ) : (
              <ProvidersList
                searchTerm={searchTerm}
                selectedLocation={selectedLocation}
                onProviderSelect={handleProviderSelect}
              />
            )}
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Provider Schedule Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This view will show a consolidated schedule of all providers, allowing you to see availability across
                  the practice.
                </p>
                {/* Schedule overview component would go here */}
                <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20 mt-4">
                  <p className="text-muted-foreground">Provider schedule overview coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specialties">
            <Card>
              <CardHeader>
                <CardTitle>Provider Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This view will show providers grouped by their specialties, helping you manage the distribution of
                  expertise across your practice.
                </p>
                {/* Specialties overview component would go here */}
                <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20 mt-4">
                  <p className="text-muted-foreground">Provider specialties overview coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showAddProvider && <AddProviderForm onClose={() => setShowAddProvider(false)} />}
      </main>
    </div>
  )
}

