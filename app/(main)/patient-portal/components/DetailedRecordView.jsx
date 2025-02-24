"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for the detailed record view (expanded for all 9 records)
export const recordsData = [
  {
    id: 9,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2025-01-16",
      purposeOfVisit: "Tooth Pain",
      provider: "Dr. Emily Carter, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Patient reported severe pain in the lower left molar area.",
      "X-rays revealed a possible cavity in tooth #19.",
      "Recommended immediate treatment to prevent further decay.",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2024-07-22",
      procedures: ["Filling on tooth #14 (2024)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "Mild anxiety during procedures",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Possible cavity on tooth #19",
        periodontalCharting: "Healthy gums, no significant pocketing",
      },
      diagnosticImages: ["Bitewing X-rays", "Periapical X-ray of tooth #19"],
      softTissueExam: "No abnormalities detected",
    },
    diagnosis: {
      conditions: [
        "Dental caries on tooth #14",
        "Sensitivity in tooth #24",
        "Gum inflammation around tooth #47"
      ],
      severity: "high",
    },
    treatmentPlans: {
      shortTerm: ["Filling for tooth #19"],
      longTerm: ["Regular check-ups every 6 months", "Maintain good oral hygiene"],
      patientConsent: "Patient agreed to proposed treatment plan",
    },
    treatmentRecords: {
      procedures: [
        "Composite filling on tooth #14",
        "Fluoride treatment on tooth #24",
        "Deep cleaning around tooth #47"
      ],
      anesthesia: "Local anesthesia administered",
      postTreatmentNotes: "Patient tolerated procedure well, advised to avoid chewing on treated area for 24 hours",
      status: "completed",
    },
    billing: {
      totalCost: "$250",
      insuranceClaim: "Submitted on 2025-01-16, pending approval",
      patientPayment: "$50 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 8,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2024-11-03",
      purposeOfVisit: "Regular Checkup",
      provider: "Dr. Michael Lee, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Patient reported no issues or concerns.",
      "Routine cleaning and examination performed.",
      "Advised patient to maintain current oral hygiene routine.",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Emily Carter at SmileBright Dental",
      lastVisitDate: "2024-05-15",
      procedures: ["Filling on tooth #14 (2024)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None reported",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "All teeth present, no visible decay",
        periodontalCharting: "Healthy gums, no significant pocketing",
      },
      diagnosticImages: ["Bitewing X-rays"],
      softTissueExam: "No abnormalities detected",
    },
    diagnosis: {
      conditions: ["Healthy teeth and gums"],
      severity: "medium",
    },
    treatmentPlans: {
      shortTerm: ["Continue regular oral hygiene routine"],
      longTerm: ["Regular check-ups every 6 months"],
      patientConsent: "Patient agreed to proposed treatment plan",
    },
    treatmentRecords: {
      procedures: ["Dental cleaning and polishing"],
      anesthesia: "None required",
      postTreatmentNotes: "Routine cleaning completed without complications",
      status: "pending",
    },
    billing: {
      totalCost: "$150",
      insuranceClaim: "Submitted on 2024-11-03, approved",
      patientPayment: "$20 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 7,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2024-07-22",
      purposeOfVisit: "Teeth Whitening",
      provider: "Dr. Emily Carter, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Patient requested professional teeth whitening treatment",
      "Pre-treatment shade assessment completed",
      "Treatment completed successfully with noticeable improvement",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2024-03-15",
      procedures: ["Regular cleaning (2024)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "All teeth present and healthy",
        periodontalCharting: "Normal gum health",
      },
      diagnosticImages: ["Pre-whitening photos"],
      softTissueExam: "Normal",
    },
    diagnosis: {
      conditions: ["Teeth staining suitable for whitening treatment"],
      severity: "low",
    },
    treatmentPlans: {
      shortTerm: ["Professional teeth whitening"],
      longTerm: ["Maintain results with good oral hygiene"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Professional teeth whitening procedure"],
      anesthesia: "None required",
      postTreatmentNotes: "Treatment completed successfully, patient satisfied with results",
      status: "completed",
    },
    billing: {
      totalCost: "$500",
      insuranceClaim: "Cosmetic procedure - not covered",
      patientPayment: "$500",
      outstandingBalance: "$0",
    },
  },
  {
    id: 6,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2024-03-15",
      purposeOfVisit: "Gum Sensitivity",
      provider: "Dr. Sarah Johnson, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Patient reported increased gum sensitivity",
      "Examination revealed early signs of gingivitis",
      "Recommended improved flossing technique and specialized toothpaste",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2023-11-07",
      procedures: ["Regular cleaning (2023)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Early signs of gingivitis",
      toothLoss: "None",
      dentalAnxiety: "Mild",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Mild gum inflammation around molars",
        periodontalCharting: "Slight bleeding on probing",
      },
      diagnosticImages: ["Periodontal probing measurements"],
      softTissueExam: "Mild gum inflammation",
    },
    diagnosis: {
      conditions: ["Mild gingivitis"],
      severity: "medium",
    },
    treatmentPlans: {
      shortTerm: ["Deep cleaning", "Improved oral hygiene routine"],
      longTerm: ["Regular periodontal maintenance"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Periodontal scaling and root planing"],
      anesthesia: "Local anesthesia",
      postTreatmentNotes: "Patient tolerated procedure well",
      status: "completed",
    },
    billing: {
      totalCost: "$300",
      insuranceClaim: "Submitted on 2024-03-15, approved",
      patientPayment: "$60 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 5,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2023-11-07",
      purposeOfVisit: "Regular Checkup",
      provider: "Dr. Michael Lee, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Routine checkup",
      "Minor plaque buildup detected",
      "Recommended more frequent flossing",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Emily Carter at SmileBright Dental",
      lastVisitDate: "2024-05-15",
      procedures: ["Filling on tooth #14 (2024)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None reported",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "All teeth present, no visible decay",
        periodontalCharting: "Healthy gums, no significant pocketing",
      },
      diagnosticImages: ["Bitewing X-rays"],
      softTissueExam: "No abnormalities detected",
    },
    diagnosis: {
      conditions: ["Healthy teeth and gums"],
      severity: "low",
    },
    treatmentPlans: {
      shortTerm: ["Continue regular oral hygiene routine"],
      longTerm: ["Regular check-ups every 6 months"],
      patientConsent: "Patient agreed to proposed treatment plan",
    },
    treatmentRecords: {
      procedures: ["Professional cleaning", "Plaque removal"],
      anesthesia: "None required",
      postTreatmentNotes: "Routine cleaning completed",
      status: "completed",
    },
    billing: {
      totalCost: "$150",
      insuranceClaim: "Submitted on 2023-11-07, approved",
      patientPayment: "$20 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 4,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2023-06-30",
      purposeOfVisit: "Tooth Extraction",
      provider: "Dr. Emily Carter, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Tooth extraction scheduled",
      "Pre-operative instructions provided",
      "Post-operative care instructions",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2023-05-01",
      procedures: ["Regular cleaning (2023)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Healthy teeth",
        periodontalCharting: "Healthy gums",
      },
      diagnosticImages: ["X-rays"],
      softTissueExam: "Healthy",
    },
    diagnosis: {
      conditions: ["Impacted wisdom tooth"],
      severity: "high",
    },
    treatmentPlans: {
      shortTerm: ["Tooth extraction"],
      longTerm: ["Post-operative care"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Wisdom tooth extraction"],
      anesthesia: "Local anesthesia with sedation",
      postTreatmentNotes: "Successful extraction of wisdom tooth",
      status: "completed",
    },
    billing: {
      totalCost: "$500",
      insuranceClaim: "Submitted on 2023-06-30, approved",
      patientPayment: "$500",
      outstandingBalance: "$0",
    },
  },
  {
    id: 3,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2023-02-14",
      purposeOfVisit: "Regular Checkup",
      provider: "Dr. Sarah Johnson, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Routine checkup",
      "Healthy teeth and gums",
      "Recommended regular dental visits",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2022-12-01",
      procedures: ["Regular cleaning (2022)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Healthy teeth",
        periodontalCharting: "Healthy gums",
      },
      diagnosticImages: ["X-rays"],
      softTissueExam: "Healthy",
    },
    diagnosis: {
      conditions: ["Healthy teeth and gums"],
      severity: "low",
    },
    treatmentPlans: {
      shortTerm: ["Regular dental check-up"],
      longTerm: ["Regular dental visits"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Routine cleaning and examination"],
      anesthesia: "None required",
      postTreatmentNotes: "Routine cleaning completed",
      status: "completed",
    },
    billing: {
      totalCost: "$100",
      insuranceClaim: "Submitted on 2023-02-14, approved",
      patientPayment: "$20 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 2,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2022-09-05",
      purposeOfVisit: "Dental Filling",
      provider: "Dr. Michael Lee, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Small cavity in molar",
      "Composite filling completed",
      "Post-operative instructions",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2022-07-01",
      procedures: ["Regular cleaning (2022)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Small cavity in molar",
        periodontalCharting: "Healthy gums",
      },
      diagnosticImages: ["X-rays"],
      softTissueExam: "Healthy",
    },
    diagnosis: {
      conditions: ["Small cavity in molar"],
      severity: "medium",
    },
    treatmentPlans: {
      shortTerm: ["Composite filling"],
      longTerm: ["Regular dental visits"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Composite filling"],
      anesthesia: "None required",
      postTreatmentNotes: "Post-operative instructions",
      status: "completed",
    },
    billing: {
      totalCost: "$150",
      insuranceClaim: "Submitted on 2022-09-05, approved",
      patientPayment: "$50 copay",
      outstandingBalance: "$0",
    },
  },
  {
    id: 1,
    appointmentOverview: {
      fullName: "Jane Doe",
      contactDetails: "jane.doe@email.com | (555) 123-4567",
      emergencyContact: "John Doe (Husband) | (555) 987-6543",
      insuranceInformation: {
        provider: "DentalCare Plus",
        policyNumber: "DCP123456789",
        expiryDate: "2025-12-31",
      },
      date: "2022-05-01",
      purposeOfVisit: "Initial Consultation",
      provider: "Dr. Emily Carter, DDS",
      practice: "SmileBright Dental, Chicago, IL",
    },
    providerNotes: [
      "Comprehensive dental exam completed",
      "Treatment plan created",
      "Post-operative instructions",
    ],
    medicalHistory: {
      allergies: ["Penicillin"],
      currentMedications: ["Lisinopril 10mg daily"],
      medicalConditions: ["Hypertension"],
      pastSurgeries: ["Appendectomy (2020)"],
      familyHistory: ["Father: Type 2 Diabetes"],
      lifestyle: "Non-smoker, occasional alcohol use",
    },
    dentalHistory: {
      previousDentist: "Dr. Johnson at City Dental",
      lastVisitDate: "2021-12-01",
      procedures: ["Regular cleaning (2021)"],
      orthodonticTreatment: "None",
      periodontalHistory: "Healthy gums",
      toothLoss: "None",
      dentalAnxiety: "None",
    },
    clinicalExamination: {
      initialExam: {
        toothCharting: "Comprehensive dental exam completed",
        periodontalCharting: "Healthy gums",
      },
      diagnosticImages: ["X-rays"],
      softTissueExam: "Healthy",
    },
    diagnosis: {
      conditions: ["Comprehensive dental exam completed"],
      severity: "low",
    },
    treatmentPlans: {
      shortTerm: ["Treatment plan created"],
      longTerm: ["Regular dental visits"],
      patientConsent: "Patient agreed to treatment plan",
    },
    treatmentRecords: {
      procedures: ["Full dental examination", "X-rays", "Treatment plan creation"],
      anesthesia: "None required",
      postTreatmentNotes: "Post-operative instructions",
      status: "completed",
    },
    billing: {
      totalCost: "$200",
      insuranceClaim: "Submitted on 2022-05-01, approved",
      patientPayment: "$50 copay",
      outstandingBalance: "$0",
    },
  },
]

export default function DetailedRecordView({recordId, patientId}) {
  const searchParams = useSearchParams()
  const selectedTooth = searchParams.get("tooth")
  const initialTab = searchParams.get("tab") || "appointment"
  
  const [activeTab, setActiveTab] = useState(initialTab)
  const record = recordsData.find((r) => r.id === recordId) || recordsData[0]

  const tabsConfig = {
    appointment: {
      title: "Appointment Overview",
      description: "Patient and appointment details",
      content: (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-sm sm:text-base">Full Name</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.fullName}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Contact Details</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.contactDetails}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Emergency Contact</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.emergencyContact}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Insurance Information</dt>
            <dd className="text-sm sm:text-base">
              Provider: {record.appointmentOverview.insuranceInformation.provider}
              <br />
              Policy Number: {record.appointmentOverview.insuranceInformation.policyNumber}
              <br />
              Expiry Date: {record.appointmentOverview.insuranceInformation.expiryDate}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Date</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.date}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Purpose of Visit</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.purposeOfVisit}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Provider</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.provider}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Practice</dt>
            <dd className="text-sm sm:text-base">{record.appointmentOverview.practice}</dd>
          </div>
        </dl>
      )
    },
    "provider-notes": {
      title: "Provider Notes",
      description: "Notes from the dental provider",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {record.providerNotes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      )
    },
    history: {
      title: "History",
      description: "Patient medical and dental background",
      content: (
        <div className="space-y-4">
          <Card>
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-semibold">Medical History</h3>
            </div>
            <CardContent className="p-4 sm:p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Allergies</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.allergies.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Current Medications</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.currentMedications.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Medical Conditions</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.medicalConditions.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Past Surgeries</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.pastSurgeries.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Family Medical/Dental History</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.familyHistory.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Lifestyle</dt>
                  <dd className="text-sm sm:text-base">{record.medicalHistory.lifestyle}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <div className="p-4 sm:p-6 border-b">
              <h3 className="text-lg sm:text-xl font-semibold">Dental History</h3>
            </div>
            <CardContent className="p-4 sm:p-6">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Previous Dentist</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.previousDentist}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Last Visit Date</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.lastVisitDate}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Procedures</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.procedures.join(", ")}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Orthodontic Treatment</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.orthodonticTreatment}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Periodontal History</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.periodontalHistory}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Tooth Loss</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.toothLoss}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-sm sm:text-base">Dental Anxiety</dt>
                  <dd className="text-sm sm:text-base">{record.dentalHistory.dentalAnxiety}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      )
    },
    examination: {
      title: "Clinical Examination Details",
      description: "Findings from the dental examination",
      content: (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-sm sm:text-base">Tooth Charting</dt>
            <dd className="text-sm sm:text-base">{record.clinicalExamination.initialExam.toothCharting}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Periodontal Charting</dt>
            <dd className="text-sm sm:text-base">
              {record.clinicalExamination.initialExam.periodontalCharting}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Diagnostic Images</dt>
            <dd className="text-sm sm:text-base">{record.clinicalExamination.diagnosticImages.join(", ")}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Soft Tissue Exam</dt>
            <dd className="text-sm sm:text-base">{record.clinicalExamination.softTissueExam}</dd>
          </div>
        </dl>
      )
    },
    diagnosis: {
      title: "Diagnosis",
      description: "Diagnosed conditions and findings",
      content: (
        <ul className="list-disc pl-5 space-y-2">
          {record.diagnosis.conditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>
      )
    },
    "treatment-plans": {
      title: "Treatment Plans",
      description: "Proposed short-term and long-term treatment plans",
      content: (
        <dl className="grid grid-cols-1 gap-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-sm sm:text-base">Short-Term Treatment Plan</dt>
            <dd className="text-sm sm:text-base">
              <ul className="list-disc pl-5">
                {record.treatmentPlans.shortTerm.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Long-Term Treatment Plan</dt>
            <dd className="text-sm sm:text-base">
              <ul className="list-disc pl-5">
                {record.treatmentPlans.longTerm.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Patient Consent</dt>
            <dd className="text-sm sm:text-base">{record.treatmentPlans.patientConsent}</dd>
          </div>
        </dl>
      )
    },
    "treatment-records": {
      title: "Treatment Records",
      description: "Details of procedures performed and post-treatment notes",
      content: (
        <dl className="grid grid-cols-1 gap-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-sm sm:text-base">Procedures Performed</dt>
            <dd className="text-sm sm:text-base">
              <ul className="list-disc pl-5">
                {record.treatmentRecords.procedures.map((procedure, index) => (
                  <li key={index}>{procedure}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Anesthesia/Medication Administered</dt>
            <dd className="text-sm sm:text-base">{record.treatmentRecords.anesthesia}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Post-Treatment Notes</dt>
            <dd className="text-sm sm:text-base">{record.treatmentRecords.postTreatmentNotes}</dd>
          </div>
        </dl>
      )
    },
    billing: {
      title: "Billing and Payment Records",
      description: "Financial information related to the treatment",
      content: (
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <div>
            <dt className="font-semibold text-sm sm:text-base">Total Cost</dt>
            <dd className="text-sm sm:text-base">{record.billing.totalCost}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Insurance Claim</dt>
            <dd className="text-sm sm:text-base">{record.billing.insuranceClaim}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Patient Payment</dt>
            <dd className="text-sm sm:text-base">{record.billing.patientPayment}</dd>
          </div>
          <div>
            <dt className="font-semibold text-sm sm:text-base">Outstanding Balance</dt>
            <dd className="text-sm sm:text-base">{record.billing.outstandingBalance}</dd>
          </div>
        </dl>
      )
    },
  }

  const tabsList = [
    { value: "appointment", label: "Appointment" },
    { value: "provider-notes", label: "Provider Notes" },
    { value: "history", label: "History" },
    { value: "examination", label: "Examination" },
    { value: "diagnosis", label: "Diagnosis" },
    { value: "treatment-plans", label: "Treatment Plans" },
    { value: "treatment-records", label: "Treatment Records" },
    { value: "billing", label: "Billing" },
  ]

  return (
    <div className="min-h-screen pb-20">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* xs 屏幕显示下拉菜单 */}
        <div className="block sm:hidden mb-6 ">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full bg-white shadow-all py-3 text-base font-bold">
              <SelectValue>
                {tabsList.find(tab => tab.value === activeTab)?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {tabsList.map(tab => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* sm 及以上屏幕显示 TabsList */}
        <TabsList className="hidden sm:grid w-full sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">
          {tabsList.map(tab => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className="bg-white shadow-all data-[state=active]:bg-[#d9d9d9] transition-colors p-3 text-sm sm:text-base"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabsList.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-all p-4 sm:p-6 flex items-baseline gap-0">
                <h3 className="text-xl sm:text-2xl font-semibold">{tabsConfig[tab.value].title}</h3>
                <span className="mx-2 text-muted-foreground">-</span>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {tabsConfig[tab.value].description}
                </p>
              </div>
              <Card>
                <CardContent className="p-4 sm:p-6 shadow-all rounded-md">
                  {tabsConfig[tab.value].content}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

