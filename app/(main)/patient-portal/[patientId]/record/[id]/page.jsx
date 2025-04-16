'use client'

import DetailedRecordView from '../../../components/DetailedRecordView.jsx'
import PatientBanner from "../../../components/PatientBanner.jsx"
import { useParams } from 'next/navigation';

export default function RecordPage() {
  const params = useParams();
  const patientId = params.patientId;
  const recordId = Number.parseInt(params.id, 10);

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto p-4 pb-20">
        <div className=' mt-20 mb-10 '>
          <h2 className="text-3xl font-bold ">Dental Records</h2>
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

