"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import { useMemo } from "react"
import { analyticsData, transformData } from "../data/analyticsData.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ProviderAnalytics({ filters }) {
  const data = useMemo(() => {
    const filtered = transformData.filterData(analyticsData, filters)
    
    // 按医生分组统计
    const providerStats = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.providerName)
      if (existing) {
        existing.revenue += curr.revenue
        existing.patients += curr.patients
        existing.appointments += curr.appointments
        existing.procedures += 1
      } else {
        acc.push({
          name: curr.providerName,
          revenue: curr.revenue,
          patients: curr.patients,
          appointments: curr.appointments,
          procedures: 1,
          satisfaction: Math.floor(Math.random() * 20) + 80 // 模拟满意度数据
        })
      }
      return acc
    }, [])

    // 计算效率指标
    providerStats.forEach(provider => {
      provider.efficiency = Math.round((provider.revenue / provider.appointments) * 100) / 100
      provider.patientLoad = Math.round(provider.patients / provider.appointments * 100)
    })

    return {
      providerStats,
      totalRevenue: providerStats.reduce((sum, item) => sum + item.revenue, 0),
      totalPatients: providerStats.reduce((sum, item) => sum + item.patients, 0),
      averageEfficiency: Math.round(providerStats.reduce((sum, item) => sum + item.efficiency, 0) / providerStats.length)
    }
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Across all providers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.averageEfficiency}</div>
            <p className="text-xs text-muted-foreground">Per appointment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.providerStats.length}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Provider</CardTitle>
            <CardDescription>Total revenue generated by each provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.providerStats}>
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
            <CardTitle>Provider Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators by provider</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.providerStats}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Radar name="Efficiency" dataKey="efficiency" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Patient Load" dataKey="patientLoad" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Radar name="Satisfaction" dataKey="satisfaction" stroke="#ffc658" fill="#ffc658" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 