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
  ComposedChart,
  Area
} from "recharts"
import { useMemo } from "react"
import { analyticsData, transformData } from "../data/analyticsData.js"

export default function OperationalAnalytics({ filters }) {
  const data = useMemo(() => {
    const filtered = transformData.filterData(analyticsData, filters)
    
    // 按月份汇总运营数据
    const operationalData = filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.month)
      if (existing) {
        existing.revenue += curr.revenue
        existing.patients += curr.patients
        existing.appointments += curr.appointments
        existing.claims.approved += curr.claims.approved
        existing.claims.pending += curr.claims.pending
        existing.claims.rejected += curr.claims.rejected
        existing.claims.total += (curr.claims.approved + curr.claims.pending + curr.claims.rejected)
        existing.claims.avgResolutionDays = (existing.claims.avgResolutionDays + curr.claims.resolutionDays) / 2
      } else {
        acc.push({
          name: curr.month,
          revenue: curr.revenue,
          patients: curr.patients,
          appointments: curr.appointments,
          claims: {
            approved: curr.claims.approved,
            pending: curr.claims.pending,
            rejected: curr.claims.rejected,
            total: curr.claims.approved + curr.claims.pending + curr.claims.rejected,
            avgResolutionDays: curr.claims.resolutionDays
          }
        })
      }
      return acc
    }, [])

    // 计算关键指标
    const totals = operationalData.reduce((acc, curr) => {
      acc.revenue += curr.revenue
      acc.patients += curr.patients
      acc.appointments += curr.appointments
      acc.claims.approved += curr.claims.approved
      acc.claims.pending += curr.claims.pending
      acc.claims.rejected += curr.claims.rejected
      return acc
    }, {
      revenue: 0,
      patients: 0,
      appointments: 0,
      claims: { approved: 0, pending: 0, rejected: 0 }
    })

    return {
      operationalData,
      totals,
      avgRevenuePerPatient: Math.round(totals.revenue / totals.patients),
      claimsApprovalRate: Math.round(totals.claims.approved / (totals.claims.approved + totals.claims.rejected) * 100)
    }
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Revenue per Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.avgRevenuePerPatient}</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Claims Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.claimsApprovalRate}%</div>
            <p className="text-xs text-muted-foreground">Of processed claims</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Patient Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Return rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">Resource utilization</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
            <CardDescription>Key metrics over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.operationalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="appointments" fill="#8884d8" name="Appointments" />
                  <Line yAxisId="right" type="monotone" dataKey="patients" stroke="#82ca9d" name="Patients" />
                  <Area yAxisId="right" type="monotone" dataKey="revenue" fill="#ffc658" stroke="#ffc658" name="Revenue" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Claims Processing</CardTitle>
            <CardDescription>Claims status and resolution time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={data.operationalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="claims.approved" stackId="a" fill="#4CAF50" name="Approved" />
                  <Bar yAxisId="left" dataKey="claims.pending" stackId="a" fill="#FFC107" name="Pending" />
                  <Bar yAxisId="left" dataKey="claims.rejected" stackId="a" fill="#F44336" name="Rejected" />
                  <Line yAxisId="right" type="monotone" dataKey="claims.avgResolutionDays" stroke="#000" name="Avg. Resolution Days" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 