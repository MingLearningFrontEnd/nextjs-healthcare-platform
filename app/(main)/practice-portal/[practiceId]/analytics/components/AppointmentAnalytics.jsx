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
  Cell
} from "recharts"
import { useMemo } from "react"
import { analyticsData, transformData } from "../data/analyticsData.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AppointmentAnalytics({ filters }) {
  const data = useMemo(() => {
    const filtered = transformData.filterData(analyticsData, filters)
    
    // 按月份汇总预约数据
    const appointmentsByMonth = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.month)
      if (existing) {
        existing.appointments += curr.appointments
        existing.patients += curr.patients
      } else {
        acc.push({
          name: curr.month,
          appointments: curr.appointments,
          patients: curr.patients
        })
      }
      return acc
    }, [])

    // 计算总数和平均值
    const totals = filtered.reduce((acc, curr) => {
      acc.appointments += curr.appointments
      acc.patients += curr.patients
      return acc
    }, { appointments: 0, patients: 0 })

    return {
      appointmentsByMonth,
      totalAppointments: totals.appointments,
      totalPatients: totals.patients,
      averageAppointmentsPerDay: Math.round(totals.appointments / filtered.length)
    }
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalAppointments}</div>
            <p className="text-xs text-muted-foreground">This period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPatients}</div>
            <p className="text-xs text-muted-foreground">Unique patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.averageAppointmentsPerDay}</div>
            <p className="text-xs text-muted-foreground">Appointments per day</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">Of available slots</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appointment Trends</CardTitle>
            <CardDescription>Monthly appointment volume</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
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
                    dataKey="patients" 
                    stroke="#82ca9d" 
                    name="Patients"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Distribution</CardTitle>
            <CardDescription>By type of visit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "Check-up", value: 35 },
                      { name: "Treatment", value: 45 },
                      { name: "Follow-up", value: 20 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
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