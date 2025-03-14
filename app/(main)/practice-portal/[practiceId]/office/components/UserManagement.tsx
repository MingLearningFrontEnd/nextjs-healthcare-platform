"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, UserPlus, ShieldAlert, ShieldCheck, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for users
const usersData = {
  downtown: [
    {
      id: "user1",
      name: "Dr. Emily Johnson",
      email: "emily.johnson@example.com",
      role: "Owner",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: true,
        analytics: true,
        billing: true,
        settings: true,
      },
    },
    {
      id: "user2",
      name: "Dr. Michael Smith",
      email: "michael.smith@example.com",
      role: "Provider",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: false,
        analytics: true,
        billing: false,
        settings: false,
      },
    },
    {
      id: "user3",
      name: "Dr. Sarah Patel",
      email: "sarah.patel@example.com",
      role: "Provider",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: false,
        analytics: true,
        billing: false,
        settings: false,
      },
    },
    {
      id: "user4",
      name: "Jessica Williams",
      email: "jessica.williams@example.com",
      role: "Front Desk",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: false,
        practicePortal: false,
        analytics: false,
        billing: false,
        settings: false,
      },
    },
    {
      id: "user5",
      name: "Robert Davis",
      email: "robert.davis@example.com",
      role: "Billing Specialist",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: false,
        practicePortal: false,
        analytics: true,
        billing: true,
        settings: false,
      },
    },
  ],
  suburban: [
    {
      id: "user6",
      name: "Dr. Lisa Garcia",
      email: "lisa.garcia@example.com",
      role: "Owner",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: true,
        analytics: true,
        billing: true,
        settings: true,
      },
    },
    {
      id: "user7",
      name: "Dr. David Lee",
      email: "david.lee@example.com",
      role: "Provider",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: false,
        analytics: true,
        billing: false,
        settings: false,
      },
    },
  ],
  riverside: [
    {
      id: "user8",
      name: "Dr. James Wilson",
      email: "james.wilson@example.com",
      role: "Owner",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: true,
        analytics: true,
        billing: true,
        settings: true,
      },
    },
    {
      id: "user9",
      name: "Dr. Maria Brown",
      email: "maria.brown@example.com",
      role: "Provider",
      status: "active",
      permissions: {
        patientPortal: true,
        providerPortal: true,
        practicePortal: false,
        analytics: true,
        billing: false,
        settings: false,
      },
    },
  ],
}

const roleIcons = {
  Owner: <ShieldAlert className="h-4 w-4" />,
  Admin: <ShieldCheck className="h-4 w-4" />,
  Provider: <User className="h-4 w-4" />,
  "Front Desk": <User className="h-4 w-4" />,
  "Billing Specialist": <User className="h-4 w-4" />,
}

interface UserManagementProps {
  selectedOffice: string
}

export default function UserManagement({ selectedOffice }: UserManagementProps) {
  const officeUsers = usersData[selectedOffice as keyof typeof usersData]
  const [users, setUsers] = useState(officeUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "Provider",
    status: "active",
    permissions: {
      patientPortal: true,
      providerPortal: true,
      practicePortal: false,
      analytics: false,
      billing: false,
      settings: false,
    },
  })
  const [editingUser, setEditingUser] = useState<null | typeof newUser>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers((prev) => [
        ...prev,
        {
          ...newUser,
          id: `user${Date.now()}`,
        },
      ])
      setNewUser({
        id: "",
        name: "",
        email: "",
        role: "Provider",
        status: "active",
        permissions: {
          patientPortal: true,
          providerPortal: true,
          practicePortal: false,
          analytics: false,
          billing: false,
          settings: false,
        },
      })
      setIsAddUserOpen(false)
    }
  }

  const handleEditUser = () => {
    if (editingUser) {
      setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? editingUser : user)))
      setEditingUser(null)
    }
  }

  const handleRemoveUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const handlePermissionChange = (user: typeof newUser, permission: string, value: boolean) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        permissions: {
          ...editingUser.permissions,
          [permission]: value,
        },
      })
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Owner":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Admin":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Provider":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Front Desk":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Billing Specialist":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users and their permissions for this practice location</CardDescription>
            </div>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>Add a new user to this practice location</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger id="role" className="col-span-3">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Provider">Provider</SelectItem>
                        <SelectItem value="Front Desk">Front Desk</SelectItem>
                        <SelectItem value="Billing Specialist">Billing Specialist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddUser}>Add User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name, email, or role..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        <span className="flex items-center gap-1">
                          {roleIcons[user.role as keyof typeof roleIcons]}
                          {user.role}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setEditingUser(user)}>
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Edit User Permissions</DialogTitle>
                            <DialogDescription>Manage access rights for {editingUser?.name}</DialogDescription>
                          </DialogHeader>
                          {editingUser && (
                            <div className="py-4">
                              <div className="mb-4">
                                <h3 className="text-sm font-medium mb-2">User Information</h3>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <Label htmlFor="edit-name">Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingUser.name}
                                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-email">Email</Label>
                                    <Input
                                      id="edit-email"
                                      value={editingUser.email}
                                      onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-role">Role</Label>
                                    <Select
                                      value={editingUser.role}
                                      onValueChange={(value) => setEditingUser({ ...editingUser, role: value })}
                                    >
                                      <SelectTrigger id="edit-role">
                                        <SelectValue placeholder="Select role" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Owner">Owner</SelectItem>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Provider">Provider</SelectItem>
                                        <SelectItem value="Front Desk">Front Desk</SelectItem>
                                        <SelectItem value="Billing Specialist">Billing Specialist</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-status">Status</Label>
                                    <Select
                                      value={editingUser.status}
                                      onValueChange={(value) => setEditingUser({ ...editingUser, status: value })}
                                    >
                                      <SelectTrigger id="edit-status">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium mb-2">Permissions</h3>
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="patient-portal"
                                      checked={editingUser.permissions.patientPortal}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "patientPortal", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="patient-portal">Patient Portal Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="provider-portal"
                                      checked={editingUser.permissions.providerPortal}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "providerPortal", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="provider-portal">Provider Portal Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="practice-portal"
                                      checked={editingUser.permissions.practicePortal}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "practicePortal", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="practice-portal">Practice Portal Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="analytics"
                                      checked={editingUser.permissions.analytics}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "analytics", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="analytics">Analytics Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="billing"
                                      checked={editingUser.permissions.billing}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "billing", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="billing">Billing Access</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="settings"
                                      checked={editingUser.permissions.settings}
                                      onCheckedChange={(checked) =>
                                        handlePermissionChange(editingUser, "settings", checked as boolean)
                                      }
                                    />
                                    <Label htmlFor="settings">Settings Access</Label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setEditingUser(null)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditUser}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveUser(user.id)}>
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

