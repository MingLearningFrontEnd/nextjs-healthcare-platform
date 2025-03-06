import ProviderBanner from "../../components/ProviderBanner"
import ProviderSettings from "./components/ProviderSettings"

export default function SettingsPage() {
  return (
    <div className="min-h-screen ">
      <ProviderBanner />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 mt-12">Account Settings</h1>
       
        <ProviderSettings />
      </main>
    </div>
  )
}

