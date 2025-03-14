import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { providers } from "../data/providersData"

export default function ProvidersTable({ searchTerm, selectedLocation, onProviderSelect }) {
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || provider.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm md:text-base">Name</TableHead>
                <TableHead className="text-sm md:text-base">Specialty</TableHead>
                <TableHead className="text-sm md:text-base">Location</TableHead>
                <TableHead className="text-sm md:text-base">Status</TableHead>
                <TableHead className="text-sm md:text-base">Experience</TableHead>
                <TableHead className="text-sm md:text-base">Rating</TableHead>
                <TableHead className="text-sm md:text-base">Availability</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProviders.map((provider) => (
                <TableRow 
                  key={provider.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onProviderSelect(provider.id)}
                >
                  <TableCell className="font-medium text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      {provider.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm md:text-base">{provider.specialty}</TableCell>
                  <TableCell className="text-sm md:text-base">{provider.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={provider.status === "active" ? "default" : "secondary"}
                      className="text-xs md:text-sm"
                    >
                      {provider.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm md:text-base">{provider.experience}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm md:text-base">{provider.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm md:text-base">{provider.availability}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 