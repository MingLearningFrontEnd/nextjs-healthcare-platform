export const analyticsData = [
  {
    id: 1,
    date: "2024-01",
    month: "Jan",
    provider: "dr-smith",
    providerName: "Dr. Smith",
    location: "downtown",
    locationName: "Downtown Dental",
    procedure: "cleaning",
    procedureName: "Cleaning",
    revenue: 45000,
    payer: "delta-dental",
    payerName: "Delta Dental",
    patients: 150,
    appointments: 180,
    claims: {
      approved: 120,
      pending: 30,
      rejected: 10,
      avgValue: 210,
      resolutionDays: 15
    }
  },
  {
    id: 2,
    date: "2024-01",
    month: "Jan",
    provider: "dr-johnson",
    providerName: "Dr. Johnson",
    location: "suburban",
    locationName: "Suburban Smiles",
    procedure: "filling",
    procedureName: "Filling",
    revenue: 38000,
    payer: "cigna",
    payerName: "Cigna",
    patients: 95,
    appointments: 110,
    claims: {
      approved: 85,
      pending: 15,
      rejected: 5,
      avgValue: 280,
      resolutionDays: 12
    }
  },
  {
    id: 3,
    date: "2024-01",
    month: "Jan",
    provider: "dr-williams",
    providerName: "Dr. Williams",
    location: "west-end",
    locationName: "West End Dental",
    procedure: "root-canal",
    procedureName: "Root Canal",
    revenue: 52000,
    payer: "aetna",
    payerName: "Aetna",
    patients: 75,
    appointments: 85,
    claims: {
      approved: 65,
      pending: 20,
      rejected: 8,
      avgValue: 450,
      resolutionDays: 18
    }
  },
  {
    id: 4,
    date: "2024-02",
    month: "Feb",
    provider: "dr-smith",
    providerName: "Dr. Smith",
    location: "downtown",
    locationName: "Downtown Dental",
    procedure: "cleaning",
    procedureName: "Cleaning",
    revenue: 48000,
    payer: "united",
    payerName: "United Healthcare",
    patients: 160,
    appointments: 185,
    claims: {
      approved: 140,
      pending: 25,
      rejected: 12,
      avgValue: 220,
      resolutionDays: 14
    }
  },
  {
    id: 5,
    date: "2024-02",
    month: "Feb",
    provider: "dr-patel",
    providerName: "Dr. Patel",
    location: "suburban",
    locationName: "Suburban Smiles",
    procedure: "filling",
    procedureName: "Filling",
    revenue: 42000,
    payer: "self-pay",
    payerName: "Self Pay",
    patients: 88,
    appointments: 100,
    claims: {
      approved: 0,
      pending: 0,
      rejected: 0,
      avgValue: 350,
      resolutionDays: 0
    }
  },
  {
    id: 6,
    date: "2024-02",
    month: "Feb",
    provider: "dr-williams",
    providerName: "Dr. Williams",
    location: "west-end",
    locationName: "West End Dental",
    procedure: "crown",
    procedureName: "Crown",
    revenue: 65000,
    payer: "delta-dental",
    payerName: "Delta Dental",
    patients: 82,
    appointments: 95,
    claims: {
      approved: 75,
      pending: 15,
      rejected: 5,
      avgValue: 650,
      resolutionDays: 16
    }
  },
  {
    id: 7,
    date: "2024-03",
    month: "Mar",
    provider: "dr-johnson",
    providerName: "Dr. Johnson",
    location: "downtown",
    locationName: "Downtown Dental",
    procedure: "root-canal",
    procedureName: "Root Canal",
    revenue: 58000,
    payer: "cigna",
    payerName: "Cigna",
    patients: 70,
    appointments: 85,
    claims: {
      approved: 62,
      pending: 18,
      rejected: 5,
      avgValue: 580,
      resolutionDays: 20
    }
  },
  {
    id: 8,
    date: "2024-03",
    month: "Mar",
    provider: "dr-patel",
    providerName: "Dr. Patel",
    location: "west-end",
    locationName: "West End Dental",
    procedure: "cleaning",
    procedureName: "Cleaning",
    revenue: 41000,
    payer: "aetna",
    payerName: "Aetna",
    patients: 145,
    appointments: 165,
    claims: {
      approved: 130,
      pending: 25,
      rejected: 10,
      avgValue: 195,
      resolutionDays: 13
    }
  },
  {
    id: 9,
    date: "2024-03",
    month: "Mar",
    provider: "dr-smith",
    providerName: "Dr. Smith",
    location: "suburban",
    locationName: "Suburban Smiles",
    procedure: "crown",
    procedureName: "Crown",
    revenue: 72000,
    payer: "united",
    payerName: "United Healthcare",
    patients: 90,
    appointments: 105,
    claims: {
      approved: 82,
      pending: 15,
      rejected: 8,
      avgValue: 680,
      resolutionDays: 15
    }
  }
]

// 辅助函数来处理数据转换
export const transformData = {
  // 按月份汇总收入
  getRevenueByMonth: (filtered = analyticsData) => {
    return filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.month)
      if (existing) {
        existing.revenue += curr.revenue
      } else {
        acc.push({ name: curr.month, revenue: curr.revenue })
      }
      return acc
    }, [])
  },

  // 按位置汇总收入
  getRevenueByLocation: (filtered = analyticsData) => {
    return filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.locationName)
      if (existing) {
        existing.revenue += curr.revenue
      } else {
        acc.push({ name: curr.locationName, revenue: curr.revenue })
      }
      return acc
    }, [])
  },

  // 按医生汇总收入
  getRevenueByProvider: (filtered = analyticsData) => {
    return filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.providerName)
      if (existing) {
        existing.revenue += curr.revenue
      } else {
        acc.push({ name: curr.providerName, revenue: curr.revenue })
      }
      return acc
    }, [])
  },

  // 按支付来源汇总
  getPaymentSourceData: (filtered = analyticsData) => {
    return filtered.reduce((acc, curr) => {
      const existing = acc.find(item => item.name === curr.payerName)
      if (existing) {
        existing.value += curr.revenue
      } else {
        acc.push({ name: curr.payerName, value: curr.revenue })
      }
      return acc
    }, [])
  },

  // 获取理赔数据
  getClaimsData: (filtered = analyticsData) => {
    return filtered.reduce((acc, curr) => {
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
  },

  // 过滤数据
  filterData: (data, filters) => {
    return data.filter(item => {
      if (filters.provider !== "all-providers" && item.provider !== filters.provider) return false
      if (filters.procedure !== "all-procedures" && item.procedure !== filters.procedure) return false
      if (filters.location !== "all-locations" && item.location !== filters.location) return false
      if (filters.payer !== "all-payers" && item.payer !== filters.payer) return false
      if (filters.time !== "all-time") {
        // 处理时间过滤
        const itemDate = new Date(item.date)
        const now = new Date()
        switch (filters.time) {
          case "today":
            return itemDate.toDateString() === now.toDateString()
          case "week":
            const weekAgo = new Date(now.setDate(now.getDate() - 7))
            return itemDate >= weekAgo
          case "month":
            return itemDate.getMonth() === now.getMonth() && 
                   itemDate.getFullYear() === now.getFullYear()
          case "quarter":
            const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
            return itemDate >= quarterStart
          case "year":
            return itemDate.getFullYear() === now.getFullYear()
          default:
            return true
        }
      }
      return true
    })
  }
} 