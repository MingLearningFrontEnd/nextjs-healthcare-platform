'use client'
import RecordsCarousel from "../components/RecordsCarousel"
import TeethModel from "../components/TeethModel"
import DiagnosticTreatmentView from "../components/DiagnosticTreatmentView"
import { useSelector } from 'react-redux';

export default function PatientPortal({ params }) {
  const { patient } = useSelector((state) => state.patientSlice);
  const { patientId } = params;
  if (!patient) return null;

  return (
    <main className="container mx-auto pb-32">
      <div className="space-y-8 mt-12">
        <section>
          <RecordsCarousel patientId={patientId} />
        </section>

        <section>
          <div className="bg-white py-6 px-4 mb-6 rounded-sm overflow-hidden shadow-all">
            <h2 className="font-bold lg:text-3xl md:text-2xl sm:text-2xl">3D Model</h2>
          </div>
          <TeethModel patientId={patientId} />
        </section>

        <section className="rounded-sm">
          <h2 className="lg:text-3xl md:text-2xl sm:text-2xl font-bold mb-8 bg-white px-4 py-6 rounded-sm shadow-all">
            Diagnostics and Treatments
          </h2>
          <DiagnosticTreatmentView patientId={patientId} />
        </section>
      </div>
    </main>
  );
}

