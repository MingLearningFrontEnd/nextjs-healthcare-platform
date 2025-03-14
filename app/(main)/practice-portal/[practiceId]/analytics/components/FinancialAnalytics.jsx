"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { useMemo } from "react"
import { analyticsData, transformData } from "../data/analyticsData.js"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Mock data
const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 52000 },
  { name: "Mar", revenue: 48000 },
  { name: "Apr", revenue: 61000 },
  { name: "May", revenue: 55000 },
  { name: "Jun", revenue: 67000 },
]

const locationRevenueData = [
  { name: "Downtown Dental", revenue: 340000 },
  { name: "Suburban Smiles", revenue: 225000 },
  { name: "Riverside Dental", revenue: 190000 },
]

const providerRevenueData = [
  { name: "Dr. Johnson", revenue: 250000 },
  { name: "Dr. Smith", revenue: 210000 },
  { name: "Dr. Patel", revenue: 180000 },
]

const paymentSourceData = [
  { name: "Insurance", value: 65 },
  { name: "Out-of-Pocket", value: 35 },
]

const claimsData = [
  { name: "Jan", approved: 120, pending: 30, rejected: 10 },
  { name: "Feb", approved: 140, pending: 25, rejected: 8 },
  { name: "Mar", approved: 130, pending: 35, rejected: 12 },
]

export default function FinancialAnalytics({ filters }) {
  const filteredData = useMemo(() => {
    const filtered = transformData.filterData(analyticsData, filters)
    return {
      revenueByMonth: filtered.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.month)
        if (existing) {
          existing.revenue += curr.revenue
        } else {
          acc.push({ name: curr.month, revenue: curr.revenue })
        }
        return acc
      }, []),
      
      revenueByLocation: filtered.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.locationName)
        if (existing) {
          existing.revenue += curr.revenue
        } else {
          acc.push({ name: curr.locationName, revenue: curr.revenue })
        }
        return acc
      }, []),

      revenueByProvider: filtered.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.providerName)
        if (existing) {
          existing.revenue += curr.revenue
        } else {
          acc.push({ name: curr.providerName, revenue: curr.revenue })
        }
        return acc
      }, []),

      claimsData: filtered.reduce((acc, curr) => {
        const existing = acc.find(item => item.name === curr.month)
        if (existing) {
          existing.approved += curr.claims.approved
          existing.pending += curr.claims.pending
          existing.rejected += curr.claims.rejected
        } else {
          acc.push({
            name: curr.month,
            approved: curr.claims.approved,
            pending: curr.claims.pending,
            rejected: curr.claims.rejected
          })
        }
        return acc
      }, [])
    }
  }, [filters])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$755,000</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        {/* ... other cards ... */}
      </div>

      <Tabs defaultValue="revenue">
        <TabsList className="mb-4">
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={filteredData.revenueByMonth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Legend />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ... other charts ... */}
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Claims Status Overview</CardTitle>
              <CardDescription>Monthly breakdown of claims by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData.claimsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="approved" stackId="a" fill="#4CAF50" name="Approved" />
                    <Bar dataKey="pending" stackId="a" fill="#FFC107" name="Pending" />
                    <Bar dataKey="rejected" stackId="a" fill="#F44336" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 