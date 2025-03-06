'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

const MedicationContent = ({medications,onEdit,onDelete,onAddNew}) => {
    return (
        <div className="container mx-auto py-8">
            <div className="rounded-sm sm:p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold">Medications</h2>
                    <Button
                        onClick={onAddNew}
                        className="bg-[#D9D9D9] hover:bg-gray-400 text-black flex items-center gap-2"
                    >
                        <Plus className="h-5 w-5" />
                        Add Medications
                    </Button>
                </div>

                <div className="mt-6">
                    <Tabs defaultValue="tracker" className="w-full">
                        <TabsList className="w-fit grid grid-cols-2  mb-6">
                            <TabsTrigger
                                value="tracker"
                                className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all"
                            >
                                Daily Tracker
                            </TabsTrigger>
                            <TabsTrigger
                                value="list"
                                className="text-base font-semibold px-5 py-3 bg-[#D9D9D9] data-[state=active]:bg-white data-[state=active]:shadow-all "
                            >
                                Medication List
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="tracker">
                            {/* Daily Tracker content will go here */}
                        </TabsContent>

                        <TabsContent value="list">
                            <div className="space-y-6">
                                {/* Current Medications */}
                                <div>
                                    <div className="bg-white rounded-lg shadow-all p-4 sm:p-6 flex items-baseline gap-0">
                                        <h3 className="text-xl sm:text-2xl font-semibold">Current Medications</h3>
                                        <span className="mx-2 text-muted-foreground">-</span>
                                        <p className="text-sm sm:text-base text-muted-foreground">
                                            Medications you are currently taking
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        {Object.entries(medications.current).map(([category, meds]) => (
                                            <div key={category} className="bg-white p-4 rounded-sm shadow-all mb-4">
                                                <h4 className="text-lg font-semibold mb-4">{category}</h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Name</TableHead>
                                                            <TableHead>Dosage</TableHead>
                                                            <TableHead>Reason</TableHead>
                                                            <TableHead>Prescribed Date</TableHead>
                                                            <TableHead>Last Refill</TableHead>
                                                            <TableHead>Prescribed By</TableHead>
                                                            <TableHead>Notes</TableHead>
                                                            <TableHead>Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {meds.map((med, index) => (
                                                            <TableRow key={`${category}-${index}`}>
                                                                <TableCell>{med.name}</TableCell>
                                                                <TableCell>{med.dosage}</TableCell>
                                                                <TableCell>{med.reason}</TableCell>
                                                                <TableCell>{med.prescribedDate}</TableCell>
                                                                <TableCell>{med.lastRefill}</TableCell>
                                                                <TableCell>{med.prescribedBy}</TableCell>
                                                                <TableCell>{med.notes}</TableCell>
                                                                <TableCell>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                            >
                                                                                <EllipsisVertical className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end" className="w-[160px]">
                                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                            <DropdownMenuItem onClick={() => onEdit({
                                                                                section: 'current',
                                                                                category: category,
                                                                                index: index,
                                                                                medication: med
                                                                            })}>
                                                                                Edit
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem disabled>
                                                                                Add to Daily Tracker
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                className="text-[#ff4dc4] focus:text-[#ff4dc4]"
                                                                                onClick={() => onDelete('current', category, index)}
                                                                            >
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Past Medications */}
                                <div>
                                    <div className="bg-white rounded-lg shadow-all p-4 sm:p-6 flex items-baseline gap-0">
                                        <h3 className="text-xl sm:text-2xl font-semibold">Past Medications</h3>
                                        <span className="mx-2 text-muted-foreground">-</span>
                                        <p className="text-sm sm:text-base text-muted-foreground">
                                            Medications you were previously taking
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        {Object.entries(medications.past).map(([category, meds]) => (
                                            <div key={category} className="bg-white p-4 rounded-sm shadow-all mb-4">
                                                <h4 className="text-lg font-semibold mb-4">{category}</h4>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Name</TableHead>
                                                            <TableHead>Dosage</TableHead>
                                                            <TableHead>Reason</TableHead>
                                                            <TableHead>Prescribed Date</TableHead>
                                                            <TableHead>Last Refill</TableHead>
                                                            <TableHead>Prescribed By</TableHead>
                                                            <TableHead>Notes</TableHead>
                                                            <TableHead>Actions</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {meds.map((med, index) => (
                                                            <TableRow key={`${category}-${index}`}>
                                                                <TableCell>{med.name}</TableCell>
                                                                <TableCell>{med.dosage}</TableCell>
                                                                <TableCell>{med.reason}</TableCell>
                                                                <TableCell>{med.prescribedDate}</TableCell>
                                                                <TableCell>{med.lastRefill}</TableCell>
                                                                <TableCell>{med.prescribedBy}</TableCell>
                                                                <TableCell>{med.notes}</TableCell>
                                                                <TableCell>
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button
                                                                                variant="ghost"
                                                                                className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                            >
                                                                                <EllipsisVertical className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end" className="w-[160px]">
                                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                                            <DropdownMenuItem onClick={() => onEdit({
                                                                                section: 'past',
                                                                                category: category,
                                                                                index: index,
                                                                                medication: med
                                                                            })}>
                                                                                Edit
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem disabled>
                                                                                Add to Daily Tracker
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem
                                                                                className="text-[#ff4dc4] focus:text-[#ff4dc4]"
                                                                                onClick={() => onDelete('past', category, index)}
                                                                            >
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default MedicationContent; 