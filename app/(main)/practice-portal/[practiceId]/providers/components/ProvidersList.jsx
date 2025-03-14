import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Clock } from "lucide-react"
import { providers } from "../data/providersData"

// Map location IDs to readable names
const locationNames = {
  downtown: "Downtown Dental",
  suburban: "Suburban Smiles",
  riverside: "Riverside Dental Care",
}

export default function ProvidersList({ searchTerm, selectedLocation, onProviderSelect }) {
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || provider.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProviders.map((provider) => (
        <Card 
          key={provider.id} 
          className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onProviderSelect(provider.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={provider.avatar}
                  alt={provider.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-base md:text-lg">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                </div>
              </div>
              <Badge 
                variant={provider.status === "active" ? "default" : "secondary"}
                className="text-xs"
              >
                {provider.status}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {provider.locations.map(loc => locationNames[loc]).join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{provider.patients} Active Patients</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {provider.workingDays.length === 5 ? "Full-time" : "Part-time"}
                  {" • "}
                  {provider.workingHours.start} - {provider.workingHours.end}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 