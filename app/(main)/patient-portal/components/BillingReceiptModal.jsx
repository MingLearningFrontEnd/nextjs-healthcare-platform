import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BillingReceiptModal({ isOpen, onClose, paymentData, patientId }) {
  if (!paymentData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Billing and Payment Records
          </DialogTitle>
          <DialogDescription className="text-[#767676]">
            Financial information related to the treatment
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 border border-[#d9d9d9] rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <span className="font-medium">Record Number:</span>
              <span>{paymentData.recordId}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Date:</span>
              <span>{new Date(paymentData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Total Cost:</span>
              <span>{paymentData.totalCost}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Patient Payment:</span>
              <span>{paymentData.patientPayment}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Outstanding Balance:</span>
              <span>{paymentData.outstandingBalance}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Insurance Claim:</span>
              <span>{paymentData.insuranceClaimStatus}</span>
            </div>
          </div>

          <Button 
            className="w-full mt-6 bg-[#d9d9d9] text-black" 
            asChild
          >
            <Link href={`/patient-portal/${patientId}/record/${paymentData.recordId}`}>
              View Dental Record
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 