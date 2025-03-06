import ProviderBanner from "../../components/ProviderBanner"
import PatientsList from "./components/PatientsList"

export default function PatientsPage() {
  return (
    <div className="min-h-screen ">
      <ProviderBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold mb-8">Patient Management</h1>
        <PatientsList />
      </main>
    </div>
  )
}

