import PracticeBanner from "../components/PracticeBanner.jsx"
import PracticeTree from "../components/PracticeTree"

export default function PracticePortal() {
  return (
    <div className="min-h-screen">
      <PracticeBanner />
      <main className="container mx-auto p-4 mt-12">
        <h1 className="text-3xl font-bold mb-4  ">Practice Dashborad</h1>
        <PracticeTree />
      </main>
    </div>
  )
}

