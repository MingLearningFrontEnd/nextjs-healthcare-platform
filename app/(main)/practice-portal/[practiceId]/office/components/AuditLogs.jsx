"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AuditLogs({ selectedOffice }) {
  // 模拟审计日志数据
  const [logs] = useState([
    {
      id: 1,
      timestamp: "2024-03-10 14:30:00",
      user: "Dr. James Wilson",
      action: "Updated office hours",
      details: "Changed Monday opening hours to 8:00 AM"
    },
    {
      id: 2,
      timestamp: "2024-03-10 11:15:00",
      user: "Sarah Johnson",
      action: "Modified service pricing",
      details: "Updated pricing for routine checkup"
    },
    // ... 更多日志
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>Track all changes made to your office settings</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 