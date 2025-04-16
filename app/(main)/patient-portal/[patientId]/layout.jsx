'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData } from '@/app/store/slices/paitentSlice';
import PatientBanner from "../components/PatientBanner";
import ErrorPage from "@/components/ui/ErrorPage";

export default function PatientPortalLayout({ children, params }) {
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patientSlice);
  const { patientId } = params;

  useEffect(() => {
    if (patientId  && (!patient || String(patient.id) !== String(patientId))) {
      dispatch(fetchPatientData(patientId));
    }
  }, [dispatch, patientId, patient]);

  if (error) {
    return (
      <ErrorPage 
        title="Unable to Load Patient Data"
        message="We encountered an error while trying to load the patient information."
        error={error}
      />
    );
  }

  if (loading && !patient) {
    return <div className=" min-h-screen py-20 text-center text-3xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      {patient && <PatientBanner patient={patient} />}
      {children}
    </div>
  );
} 