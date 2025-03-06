import ProviderBanner from '../components/ProviderBanner'
import DailySchedule from "../components/DailySchedule"

export default function ProviderPortal() {
  return (
    <div className="min-h-screen ">
      <ProviderBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold mb-4  ">Provider Dashboard</h1>
        <DailySchedule />
      </main>
    </div>
  )
}

