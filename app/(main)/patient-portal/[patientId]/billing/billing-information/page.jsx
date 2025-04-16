import PatientBanner from "../../../components/PatientBanner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusCircle, CreditCard, Trash2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const insuranceData = {
    insuranceName: "Dental Care Plus",
    policyNumber: "DCP-2024-78945612",
    groupNumber: "GRP-123456",
    renewalDate: "2025-01-01",
    expirationDate: "2024-12-31",
    providerContact: {
        phone: "(800) 123-4567",
        email: "claims@dentalcareplus.com",
        website: "www.dentalcareplus.com"
    },
    deductible: {
        total: 1500,
        met: 750
    },
    outOfPocket: {
        total: 5000,
        met: 2150
    }
};

const BillingInformation = ({ params }) => {
    const patientId = params.patientId;

    return (
        <div className="min-h-screen bg-transparent">
            <div className="container mx-auto py-10">
                {/* title and back button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Billing Information</h2>
                    <Link href={`/patient-portal/${patientId}/billing`}>
                        <Button variant="ghost" className="flex items-center gap-2 bg-[#D9D9D9] hover:bg-gray-400 text-black">
                            <ArrowLeft className="h-5 w-5" />
                            Back to Billing Overview
                        </Button>
                    </Link>
                </div>

                {/* current insurance plan */}
                <div className="bg-white rounded-lg shadow-all px-6 py-4 mb-6">
                    <h3 className="text-2xl font-bold">Current Insurance Plan</h3>
                </div>

                {/* details of the insurance plan */}
                <Card className="shadow-all mb-6">
                    <CardContent className="p-6">

                        <div className="space-y-6">
                            {/* Insurance Name and Next Renewal Date  */}
                            <div>
                                <p className="text-1xl font-bold">{insuranceData.insuranceName}</p>
                                <p className="text-sm ">Next Renewal Date: <span className="text-sm ">{new Date(insuranceData.renewalDate).toLocaleDateString()}</span></p>

                            </div>



                            {/* Deductible Progress */}
                            <div>
                                <h4 className="text-base font-semibold mb-2">Deductible Progress</h4>
                                <div className="space-y-2">
                                    <Progress value={(insuranceData.deductible.met / insuranceData.deductible.total) * 100} className="w-full h-3" />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm ">${insuranceData.deductible.met}</p>
                                            <p className="text-sm ">of</p>
                                            <p className="text-sm ">${insuranceData.deductible.total}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Out-of-Pocket Maximum */}
                            <div>
                                <h4 className="text-base font-semibold mb-2">Out-of-Pocket Maximum Progress</h4>
                                <div className="space-y-2">
                                    <Progress value={(insuranceData.outOfPocket.met / insuranceData.outOfPocket.total) * 100} className="w-full h-3" />
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm ">${insuranceData.outOfPocket.met}</p>
                                            <p className="text-sm ">of</p>
                                            <p className="text-sm ">${insuranceData.outOfPocket.total}</p>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            {/* Insurance Provider Contact */}
                            <div>
                                <h4 className="text-sm font-semibold ">Insurance Provider Contact</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm ">{insuranceData.providerContact.phone}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* payment methods */}
                <Card className="shadow-all">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold">Payment Methods</h4>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <PlusCircle className="h-4 w-4" />
                                        Add Payment Method
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Payment Method</DialogTitle>
                                        <DialogDescription>
                                            Enter your card information to save it for future payments
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="cardName">Name on Card</Label>
                                            <Input id="cardName" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="cardNumber">Card Number</Label>
                                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="expiry">Expiry Date</Label>
                                                <Input id="expiry" placeholder="MM/YY" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cvc">CVC</Label>
                                                <Input id="cvc" placeholder="123" />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full">Add Card</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <div className="space-y-4">
                            {/* 已保存的支付方式列表 */}
                            <div className="border rounded-lg p-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="h-5 w-5" />
                                        <div>
                                            <p className="font-medium">•••• •••• •••• 4242</p>
                                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default BillingInformation;