'use client'
import { useEffect } from "react";
import PatientBanner from "../components/PatientBanner"
import RecordsCarousel from "../components/RecordsCarousel"
import TeethModel from "../components/TeethModel"
import TeethModel3D from "../components/TeethModel3D"
import DiagnosticTreatmentView from "../components/DiagnosticTreatmentView"
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData } from '../../../store/slices/paitentSlice';



export default function PatientPortal({ params }) {
  const { patientId } = params || { patientId: null };
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patientSlice);





  useEffect(() => {
    dispatch(fetchPatientData(patientId));
    // dispatch(fetchPatientNotesData(patientId))
    // dispatch(fetchProcNotesData(patientId))
  }, [dispatch, patientId]);

  if (loading) {
    return <div className="min-h-screen ">
      <div className="text-3xl font-bold mb-4 text-center mt-6">
        Loading patient data...
      </div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen ">Error: {error}</div>;
  }

  return (

    <div className="min-h-screen " >
      
      <PatientBanner />
      <main className="container mx-auto pb-32">
        <div className="space-y-8 mt-12">
          <section >
            
            <RecordsCarousel patientId={patientId} />
          </section>

          <section >
            <div className="bg-white py-6 px-4 mb-6 prounded-sm overflow-hidden shadow-all rounded-sm ">
              <h2 className=" font-bold lg:text-3xl  md:text-2xl sm:text-2xl   ">3D Model</h2>
            </div>
            <TeethModel
             patientId={patientId} />
          </section>

          <section className=" rounded-sm ">
              <h2 className="lg:text-3xl  md:text-2xl sm:text-2xl font-bold mb-8  bg-white  px-4 py-6 rounded-sm shadow-all">Diagnostics and Treatments</h2>
              <DiagnosticTreatmentView patientId={patientId} />
          </section>
        </div>
      </main>
    </div>
  )
}

