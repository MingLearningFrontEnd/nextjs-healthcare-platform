"use client"

import { useState } from "react"
import PatientBanner from "../../components/PatientBanner"
import BillingContent from "../../components/BillingContent"
import BillingReceiptModal from "../../components/BillingReceiptModal"


export default function Page({ params }) {
    const [selectedPayment, setSelectedPayment] = useState(null)
    const patientId = params.patientId

    return (
        <div className="min-h-screen bg-transparent">
            <BillingContent 
                patientId={patientId}
                onSelectPayment={setSelectedPayment}
            />
            <BillingReceiptModal 
                isOpen={!!selectedPayment}
                onClose={() => setSelectedPayment(null)}
                paymentData={selectedPayment}
                patientId={patientId}
            />
        </div>
    )
}