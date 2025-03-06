"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { recordsData } from "./DetailedRecordView"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronDown, Wallet } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BillingContent({ patientId, onSelectPayment }) {
    const [selectedPeriod, setSelectedPeriod] = useState("ytd")
    const [chartPeriod, setChartPeriod] = useState("Monthly")

    // 计算不同时间段的账单数据
    const calculateBillingData = (period) => {
        const currentDate = new Date()
        let startDate

        switch (period) {
            case "ytd":
                startDate = new Date(currentDate.getFullYear(), 0, 1)
                break
            case "6m":
                startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 6))
                break
            case "1m":
                startDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1))
                break
            default:
                startDate = new Date(currentDate.getFullYear(), 0, 1)
        }

        const filteredRecords = recordsData.filter(record => {
            const recordDate = new Date(record.appointmentOverview.date)
            return recordDate >= startDate && recordDate <= new Date()
        })

        const totalSpent = filteredRecords.reduce((sum, record) => {
            return sum + parseFloat(record.billing.totalCost.replace("$", ""))
        }, 0)

        const coveredByInsurance = filteredRecords.reduce((sum, record) => {
            return sum + parseFloat(record.billing.insuranceCovered.replace("$", ""))
        }, 0)

        const outOfPocket = filteredRecords.reduce((sum, record) => {
            return sum + parseFloat(record.billing.outOfPocket.replace("$", ""))
        }, 0)

        const amountOwed = filteredRecords.reduce((sum, record) => {
            return sum + parseFloat(record.billing.outstandingBalance.replace("$", ""))
        }, 0)

        return {
            totalSpent,
            coveredByInsurance,
            outOfPocket,
            amountOwed
        }
    }

    const billingData = calculateBillingData(selectedPeriod)

    const processChartData = (period) => {
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear()

        const sortedRecords = [...recordsData].sort((a, b) =>
            new Date(a.appointmentOverview.date) - new Date(b.appointmentOverview.date)
        )

        switch (period) {
            case "Monthly":
                return sortedRecords
                    .filter(record => {
                        const recordDate = new Date(record.appointmentOverview.date)
                        return recordDate.getFullYear() === currentYear
                    })
                    .map(record => ({
                        date: new Date(record.appointmentOverview.date).toLocaleDateString('en-US', {
                            month: 'short'
                        }),
                        amount: parseFloat(record.billing.totalCost.replace("$", ""))
                    }))

            case "Quarterly":
                const quarterlyData = sortedRecords
                    .filter(record => {
                        const recordDate = new Date(record.appointmentOverview.date)
                        return recordDate.getFullYear() === currentYear
                    })
                    .reduce((acc, record) => {
                        const date = new Date(record.appointmentOverview.date)
                        const quarter = Math.floor(date.getMonth() / 3) + 1
                        const key = `Q${quarter}`

                        if (!acc[key]) {
                            acc[key] = 0
                        }
                        acc[key] += parseFloat(record.billing.totalCost.replace("$", ""))
                        return acc
                    }, {})

                return Object.entries(quarterlyData).map(([date, amount]) => ({
                    date,
                    amount
                }))

            case "Yearly":
                const yearlyData = sortedRecords.reduce((acc, record) => {
                    const year = new Date(record.appointmentOverview.date).getFullYear()

                    if (!acc[year]) {
                        acc[year] = 0
                    }
                    acc[year] += parseFloat(record.billing.totalCost.replace("$", ""))
                    return acc
                }, {})

                return Object.entries(yearlyData).map(([date, amount]) => ({
                    date,
                    amount
                }))
        }
    }

    const chartData = processChartData(chartPeriod)

    return (
        <div className="container mx-auto py-10 sm:py-14 md:py-16 lg:py-20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold mb-6">Billing Overview</h2>
                <Link href={`/patient-portal/${patientId}/billing/billing-information`}>

                    <Button variant="ghost" className="flex items-center gap-2 bg-[#D9D9D9] hover:bg-gray-400 text-black">
                        <Wallet />   Billing Information
                    </Button>
                </Link>
            </div>
            {/* Financial Summary Container */}
            <div className="bg-white rounded-lg shadow-all px-6 py-4 mb-6">
                <h3 className="text-2xl font-bold">Financial Summary</h3>


            </div>

            {/* Tabs and Cards Container */}
            <div>
                <Tabs defaultValue="ytd" onValueChange={setSelectedPeriod} className="w-full">
                    <TabsList className="w-fit grid grid-cols-3 mb-6">
                        <TabsTrigger
                            value="ytd"
                            className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
                        >
                            Year to Date
                        </TabsTrigger>
                        <TabsTrigger
                            value="6m"
                            className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
                        >
                            Last 6 Months
                        </TabsTrigger>
                        <TabsTrigger
                            value="1m"
                            className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
                        >
                            Last Month
                        </TabsTrigger>
                    </TabsList>

                    {["ytd", "6m", "1m"].map((period) => (
                        <TabsContent key={period} value={period}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6">
                                <Card className="bg-white shadow-all">
                                    <CardContent className="p-3 sm:p-4 md:p-6">
                                        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Total Spent</h4>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">${billingData.totalSpent}</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-all">
                                    <CardContent className="p-3 sm:p-4 md:p-6">
                                        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Covered by Insurance</h4>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">${billingData.coveredByInsurance}</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-all">
                                    <CardContent className="p-3 sm:p-4 md:p-6">
                                        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Out-of-Pocket</h4>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">${billingData.outOfPocket}</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white shadow-all">
                                    <CardContent className="p-3 sm:p-4 md:p-6">
                                        <h4 className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Amount Owed</h4>
                                        <p className="text-lg sm:text-xl md:text-2xl font-bold">${billingData.amountOwed}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Spending Trends*/}
            <div>
                <div className="bg-white rounded-lg shadow-all px-6 py-4 my-6">
                    <h3 className="text-2xl font-bold">Spending Trends</h3>
                </div>

                {/* Chart Container */}
                <Card className="bg-white shadow-all">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold">Total Spent on Dental Care</h4>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="border-2 bg-[#f3f3f3] ">
                                        {chartPeriod} <ChevronDown className="ml-2 h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setChartPeriod("Monthly")}>
                                        Monthly
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setChartPeriod("Quarterly")}>
                                        Quarterly
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setChartPeriod("Yearly")}>
                                        Yearly
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="h-[200px] sm:h-[300px] md:h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    style={{ backgroundColor: '#f3f3f3' }}
                                    className="rounded-lg"
                                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                                >
                                    <XAxis
                                        dataKey="date"
                                        tick={{ fill: '#666', fontSize: '10px', sm: '12px', md: '14px' }}
                                        tickLine={{ stroke: '#666' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#666', fontSize: '10px', sm: '12px', md: '14px' }}
                                        tickLine={{ stroke: '#666' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`$${value}`, "Amount"]}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="amount"
                                        stroke="#aa18dd"
                                        strokeWidth={2}
                                        dot={{ fill: '#aa18dd' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Cost Breakdown Table */}
                <div className="mt-6">
                    <Card className="bg-white shadow-all">
                        <CardContent className="p-4 sm:p-5 md:p-6">
                            <h4 className="text-xl font-bold mb-4 sm:mb-6">Cost Breakdown Per Visit</h4>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">Date</th>
                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">Procedure</th>
                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">Total Cost</th>
                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">Insurance Covered</th>
                                            <th className="text-left py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-semibold text-muted-foreground whitespace-nowrap">Out-Of-Pocket</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...recordsData]
                                            .sort((a, b) => new Date(b.appointmentOverview.date) - new Date(a.appointmentOverview.date))
                                            .map((record) => (
                                                <tr 
                                                    key={record.id} 
                                                    className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                                                    onClick={() => {
                                                        window.location.href = `/patient-portal/${patientId}/record/${record.id}`
                                                    }}
                                                >
                                                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                                                        {new Date(record.appointmentOverview.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                                                        {record.appointmentOverview.purposeOfVisit}
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                                                        {record.billing.totalCost}
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                                                        {record.billing.insuranceCovered}
                                                    </td>
                                                    <td className="py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base whitespace-nowrap">
                                                        {record.billing.outOfPocket}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Upcoming Bills and Payment History */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Upcoming Bills */}
                <Card className="bg-white shadow-all">
                    <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-6">Upcoming Bills</h4>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {recordsData.flatMap(record =>
                                record.billing.upcomingBills.map(bill => (
                                    <div
                                        key={`${record.id}-${bill.id}`}
                                        className="flex justify-between items-center p-4 border border-gray-200 rounded-sm"
                                    >
                                        <div className="flex flex-col justify-center min-h-[60px]">
                                            <p className="text-base font-medium">{bill.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(bill.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="text-xl font-semibold">{bill.amount}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Payment History */}
                <Card className="bg-white shadow-all">
                    <CardContent className="p-6">
                        <h4 className="text-xl font-bold mb-6">Payment History</h4>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {recordsData.flatMap(record =>
                                record.billing.paymentHistory.map(payment => (
                                    <div
                                        key={`${record.id}-${payment.id}`}
                                        className="flex justify-between items-center p-4 border border-gray-200 rounded-sm min-h-[60px]"
                                    >
                                        <div className="flex flex-col justify-center">
                                            <p className="text-base font-medium">{payment.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {new Date(payment.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-base font-semibold">{payment.amount}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 px-3"
                                                onClick={() => onSelectPayment({
                                                    recordId: record.id,
                                                    totalCost: record.billing.totalCost,
                                                    patientPayment: payment.amount,
                                                    outstandingBalance: record.billing.outstandingBalance,
                                                    insuranceClaimStatus: record.billing.insuranceClaimStatus,
                                                    date: payment.date
                                                })}
                                            >
                                                View Receipt
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    )
} 