'use client'

import DetailedRecordView from '../../../components/DetailedRecordView.jsx'
import PatientBanner from "../../../components/PatientBanner.jsx"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft} from "lucide-react"
import { useParams } from 'next/navigation';

export default function RecordPage() {
  const params = useParams();
  const patientId = params.patientId;
  const recordId = Number.parseInt(params.id, 10);

  return (
    <div className="min-h-screen ">
      <PatientBanner />
      <main className="container mx-auto p-4 pb-20">
        <div className='flex justify-between mt-20 mb-8 '>
          <h2 className="text-3xl font-bold ">Dental Records</h2>
          <div >
            <Button asChild variant="outline" className='bg-[#d9d9d9] text-black'>
              <Link href={`/patient-portal/${patientId}`}>
              <ArrowLeft className="mr-2 h-4 w-4  " />
                Back to Portal
              </Link>
            </Button>
          </div>
        </div>
        <div>
        <h2 className="text-2xl font-bold mb-6 bg-white py-4 px-4 rounded-md shadow-all">Dental Number: #{recordId}</h2>
        </div>
        <DetailedRecordView
          recordId={recordId}
          patientId={patientId}
        />
      </main>
    </div>
  )
}

