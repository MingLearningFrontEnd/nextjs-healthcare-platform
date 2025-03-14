"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts"
import { useMemo } from "react"
import { analyticsData, transformData } from "../data/analyticsData.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function OverviewDashboard({ filters }) {
  const data = useMemo(() => {
    const filtered = transformData.filterData(analyticsData, filters)
    
    // 按月份汇总预约数据
    const appointmentsByMonth = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.month)
      if (existing) {
        existing.appointments += curr.appointments
        // 计算 no-shows（假设是预约总数的 10%）
        existing.noShows = Math.round(curr.appointments * 0.1)
      } else {
        acc.push({
          name: curr.month,
          appointments: curr.appointments,
          noShows: Math.round(curr.appointments * 0.1)
        })
      }
      return acc
    }, [])

    // 按治疗类型汇总收入
    const revenueByProcedure = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.procedureName)
      if (existing) {
        existing.revenue += curr.revenue
      } else {
        acc.push({
          name: curr.procedureName,
          revenue: curr.revenue
        })
      }
      return acc
    }, [])

    return {
      revenueByMonth: transformData.getRevenueByMonth(filtered),
      revenueByLocation: transformData.getRevenueByLocation(filtered),
      revenueByProvider: transformData.getRevenueByProvider(filtered),
      appointmentsByMonth,     // 添加预约数据
      revenueByProcedure,     // 添加治疗类型收入数据
      totalRevenue: filtered.reduce((sum, item) => sum + item.revenue, 0),
      totalPatients: filtered.reduce((sum, item) => sum + item.patients, 0),
      totalAppointments: filtered.reduce((sum, item) => sum + item.appointments, 0),
      totalClaims: filtered.reduce((sum, item) => 
        sum + item.claims.approved + item.claims.pending + item.claims.rejected, 0
      )
    }
  }, [filters])

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${data.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPatients.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+180 new patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalAppointments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">92% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalClaims.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">85% approval rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.revenueByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Location</CardTitle>
            <CardDescription>Distribution across practice locations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.revenueByLocation}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.revenueByLocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
            <CardDescription>Monthly appointments and no-shows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.appointmentsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="appointments" 
                    stroke="#8884d8" 
                    name="Appointments"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="noShows" 
                    stroke="#ff4d4f" 
                    name="No-shows"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Providers by Revenue</CardTitle>
            <CardDescription>Revenue generated by each provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.revenueByProvider}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue by Procedure Type</CardTitle>
            <CardDescription>Revenue breakdown by procedure category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.revenueByProcedure}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="revenue"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.revenueByProcedure?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 