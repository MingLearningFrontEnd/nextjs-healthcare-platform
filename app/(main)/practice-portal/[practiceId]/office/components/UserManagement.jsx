"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, UserPlus } from "lucide-react"

export default function UserManagement({ data }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("User changes saved successfully!")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl md:text-2xl">User Management</CardTitle>
            <CardDescription className="text-sm md:text-base">Manage user access and permissions</CardDescription>
          </div>
          <Button className="w-full sm:w-auto text-sm md:text-base">
            <UserPlus className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="min-w-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm md:text-base">Name</TableHead>
                <TableHead className="text-sm md:text-base">Email</TableHead>
                <TableHead className="text-sm md:text-base">Role</TableHead>
                <TableHead className="text-sm md:text-base">Status</TableHead>
                <TableHead className="text-right text-sm md:text-base">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-sm md:text-base">{user.name}</TableCell>
                  <TableCell className="text-sm md:text-base">{user.email}</TableCell>
                  <TableCell className="text-sm md:text-base">{user.role}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === "active" ? "default" : "secondary"}
                      className="text-xs md:text-sm"
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 md:h-9 md:w-9">
                        <Edit className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 md:h-9 md:w-9">
                        <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 