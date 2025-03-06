"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const lineData = {
  weekly: [
    { name: "Mon", total: 45 },
    { name: "Tue", total: 52 },
    { name: "Wed", total: 48 },
    { name: "Thu", total: 50 },
    { name: "Fri", total: 55 },
  ],
  monthly: [
    { name: "Week 1", total: 250 },
    { name: "Week 2", total: 230 },
    { name: "Week 3", total: 240 },
    { name: "Week 4", total: 260 },
  ],
  quarterly: [
    { name: "Q1", total: 750 },
    { name: "Q2", total: 780 },
    { name: "Q3", total: 800 },
    { name: "Q4", total: 820 },
  ],
  yearly: [
    { name: "2020", total: 3000 },
    { name: "2021", total: 3200 },
    { name: "2022", total: 3400 },
    { name: "2023", total: 3600 },
  ],
}

const pieData = [
  { name: "New Patients", value: 30 },
  { name: "Returning Patients", value: 70 },
]

const COLORS = ["#0088FE", "#00C49F"]

export default function PatientVolume() {
  const [timeRange, setTimeRange] = useState("weekly")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Patient Volume & Visit Trends</CardTitle>
        </CardHeader>
        <CardContent>
        <Tabs value={timeRange} onValueChange={setTimeRange} className="space-y-4">
        <TabsList className="mt-8 w-fit grid grid-cols-4 gap-2">
          <TabsTrigger value="weekly" className="text-sm bg-[#d9d9d9] data-[state=active]:bg-white data-[state=active]:shadow-all">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" className="text-sm bg-[#d9d9d9] data-[state=active]:bg-white data-[state=active]:shadow-all">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly" className="text-sm bg-[#d9d9d9] data-[state=active]:bg-white data-[state=active]:shadow-all">Quarterly</TabsTrigger>
          <TabsTrigger value="yearly" className="text-sm bg-[#d9d9d9] data-[state=active]:bg-white data-[state=active]:shadow-all">Yearly</TabsTrigger>
        </TabsList>
        <TabsContent value={timeRange}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData[timeRange ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
        </CardContent>
      
      </Card>
     
      <Card>
        <CardHeader>
          <CardTitle>New vs Returning Patients</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

