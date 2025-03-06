import ProviderBanner from "../../components/ProviderBanner"
import ProviderCalendar from "./components/ProviderCalendar"

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <ProviderBanner />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Provider Calendar</h1>
        <p className="mb-6 text-lg text-muted-foreground">View and manage your appointments calendar.</p>
        <ProviderCalendar />
      </main>
    </div>
  )
}

