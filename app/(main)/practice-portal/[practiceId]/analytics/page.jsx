"use client"
import PracticeBanner from "../../components/PracticeBanner"
import PracticeAnalyticsDashboard from "./components/PracticeAnalyticsDashboard"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen ">
      <PracticeBanner />
      <main className="container mx-auto ">
        <PracticeAnalyticsDashboard />
      </main>
    </div>
  )
}

