import { Skeleton } from "@/components/ui/skeleton"
import PracticeBanner from "../../components/PracticeBanner"

export default function SettingsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <PracticeBanner />
      <main className="container mx-auto p-4">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-6 w-full max-w-2xl mb-6" />

        <div className="space-y-2 mb-8">
          <Skeleton className="h-10 w-48" />
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full max-w-md" />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-9 w-32" />
              </div>

              <div className="space-y-6 flex-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                    {i % 2 === 0 && <Skeleton className="h-4 w-full max-w-sm" />}
                  </div>
                ))}
                <Skeleton className="h-10 w-32 mt-4" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

