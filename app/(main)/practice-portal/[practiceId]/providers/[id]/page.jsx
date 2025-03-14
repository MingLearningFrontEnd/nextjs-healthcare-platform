"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import PracticeBanner from "../../../components/PracticeBanner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MapPin, Mail, Phone, Users, Clock } from "lucide-react"
import ProviderDetails from "../components/ProviderDetails"
import ProviderSchedule from "../components/ProviderSchedule"
import PatientRoster from "../components/PatientRoster"
import { providers } from "../data/providersData" // 导入共用的数据

// Map location IDs to readable names
const locationNames = {
  downtown: "Downtown Dental",
  suburban: "Suburban Smiles",
  riverside: "Riverside Dental Care",
}

export default function ProviderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const providerId = params.id
  const practiceId = params.practiceId
  const [provider, setProvider] = useState(null)
  const [activeTab, setActiveTab] = useState("details")

  useEffect(() => {
    // 使用共用的 providers 数据
    const foundProvider = providers.find((p) => p.id === providerId)
    if (foundProvider) {
      // 扩展 provider 数据以包含详细信息
      setProvider({
        ...foundProvider,
        email: `${foundProvider.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        phone: "(555) 123-4567",
        locations: [foundProvider.location], // 转换为数组以匹配现有模板
        bio: `${foundProvider.name} has over ${foundProvider.experience.split(' ')[0]} of experience in ${foundProvider.specialty} with a focus on patient care and satisfaction.`,
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        workingHours: {
          start: "09:00",
          end: "17:00",
        }
      })
    }
  }, [providerId])

  if (!provider) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-transparent">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-10">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/practice-portal/${practiceId}/providers`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Providers
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <Card className="w-full md:w-1/3">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative w-[120px] h-[120px] mb-4">
                  <Image
                    src={provider.avatar}
                    alt={provider.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <Badge variant="outline" className="mt-2">
                  {provider.specialty}
                </Badge>
                <Badge variant={provider.status === "active" ? "default" : "secondary"} className="mt-2">
                  {provider.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="space-y-3 text-sm xs:text-base sm:text-sm  xl:text-base">
                <div className="flex items-center ">
                  <Mail className="h-4 w-4 mr-2  text-muted-foreground" />
                  <span>{provider.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.locations.map((loc) => locationNames[loc]).join(", ")}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.patients} Active Patients</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{provider.workingDays.join(", ")}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {provider.workingHours.start} - {provider.workingHours.end}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Professional Bio</h3>
                <p className="text-sm text-muted-foreground">{provider.bio}</p>
              </div>
            </CardContent>
          </Card>

          <div className="w-full md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex flex-wrap h-auto w-full rounded-none p-0 space-x-0 bg-transparent">
                <TabsTrigger value="details" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">Provider Details</TabsTrigger>
                <TabsTrigger value="schedule" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap" >Schedule & Availability</TabsTrigger>
                <TabsTrigger value="patients" className="text-sm font-semibold lg:text-base h-10 border-0 bg-[#D9D9D9] text-black data-[state=active]:bg-white data-[state=active]:shadow-all whitespace-nowrap">Patient Roster</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <ProviderDetails provider={provider} />
              </TabsContent>

              <TabsContent value="schedule">
                <ProviderSchedule provider={provider} />
              </TabsContent>

              <TabsContent value="patients">
                <PatientRoster provider={provider} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

