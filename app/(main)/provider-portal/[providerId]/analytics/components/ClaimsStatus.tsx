"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { name: "Active", value: 30 },
  { name: "Accepted", value: 50 },
  { name: "Pending", value: 15 },
  { name: "Not Approved", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const trendData = [
  { name: "Jan", active: 25, accepted: 45, pending: 20, notApproved: 10 },
  { name: "Feb", active: 30, accepted: 50, pending: 15, notApproved: 5 },
  { name: "Mar", active: 28, accepted: 48, pending: 18, notApproved: 6 },
  { name: "Apr", active: 32, accepted: 52, pending: 12, notApproved: 4 },
  { name: "May", active: 30, accepted: 50, pending: 15, notApproved: 5 },
  { name: "Jun", active: 35, accepted: 55, pending: 8, notApproved: 2 },
]

export default function ClaimsStatus() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Current Claims Status</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Claims Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="active" stroke="#0088FE" />
              <Line type="monotone" dataKey="accepted" stroke="#00C49F" />
              <Line type="monotone" dataKey="pending" stroke="#FFBB28" />
              <Line type="monotone" dataKey="notApproved" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

