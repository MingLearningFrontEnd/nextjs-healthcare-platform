'use client'

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// 样式常量
const inputStyles = "rounded-sm text-xs sm:text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base";
const selectTriggerStyles = "text-xs sm:text-sm md:text-base";
const selectValueStyles = "placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base";

const AddMedicationModal = ({ open, onOpenChange, onSubmit, editingMedication }) => {
    const initialState = {
        name: "",
        dosage: "",
        category: "",
        prescribedDate: "",
        lastRefill: "",
        prescribedBy: "",
        description: "",
        status: "",
        timeOfDay: "",
        count: "",
        dailyDose: "",
        notes: "",
    };

    const [newMedication, setNewMedication] = useState(initialState);
    const [prescribedDate, setPrescribedDate] = useState(null);
    const [lastRefillDate, setLastRefillDate] = useState(null);
    const [prescribedDateOpen, setPrescribedDateOpen] = useState(false);
    const [lastRefillDateOpen, setLastRefillDateOpen] = useState(false);

    // 处理编辑状态
    useEffect(() => {
        if (editingMedication) {
            setNewMedication({
                name: editingMedication.medication.name || "",
                dosage: editingMedication.medication.dosage || "",
                category: editingMedication.category || "",
                description: editingMedication.medication.reason || "",
                prescribedBy: editingMedication.medication.prescribedBy || "",
                status: editingMedication.section || "",
                notes: editingMedication.medication.notes || "",
                timeOfDay: "",
                count: "",
                dailyDose: "",
            });
            
            setPrescribedDate(editingMedication.medication.prescribedDate ? 
                new Date(editingMedication.medication.prescribedDate) : null);
            setLastRefillDate(editingMedication.medication.lastRefill ? 
                new Date(editingMedication.medication.lastRefill) : null);
        } else {
            resetForm();
        }
    }, [editingMedication]);

    // 重置表单
    const resetForm = () => {
        setNewMedication(initialState);
        setPrescribedDate(null);
        setLastRefillDate(null);
    };

    const handleInputChange = (field, value) => {
        setNewMedication(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...newMedication,
            prescribedDate,
            lastRefillDate
        });
        resetForm();
    };

    // 处理 modal 关闭
    const handleOpenChange = (open) => {
        if (!open) {
            resetForm();
        }
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px] w-[90%] max-h-[85vh] overflow-y-auto rounded-sm">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl">
                        {editingMedication ? 'Edit Medication' : 'Add New Medication'}
                    </DialogTitle>
                    <DialogDescription className="sr-only">
                        {editingMedication ? 'Edit medication form' : 'Add new medication form'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 px-1 sm:px-2">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    name="name"
                                    value={newMedication.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    placeholder="Medication name" 
                                    className={inputStyles}
                                    autoComplete="off"
                                />
                            </div>
                            
                            <div className="grid gap-2">
                                <Label htmlFor="dosage">Dosage</Label>
                                <Input 
                                    id="dosage" 
                                    name="dosage"
                                    value={newMedication.dosage}
                                    onChange={(e) => handleInputChange('dosage', e.target.value)}
                                    placeholder="Enter dosage" 
                                    className={inputStyles} 
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="category">Medication Category</Label>
                                <Input 
                                    id="category" 
                                    name="category"
                                    value={newMedication.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    placeholder="Medication Category" 
                                    className={inputStyles}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="prescribedDate">Prescribed Date</Label>
                                <Popover open={prescribedDateOpen} onOpenChange={setPrescribedDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${inputStyles}`}
                                            id="prescribedDate"
                                            name="prescribedDate"
                                            type="button"
                                            aria-label="Select prescribed date"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {prescribedDate ? format(prescribedDate, "PPP") : <span className={inputStyles}>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={prescribedDate}
                                            onSelect={(date) => {
                                                setPrescribedDate(date);
                                                setPrescribedDateOpen(false);
                                            }}
                                            initialFocus
                                            id="calendar-prescribed"
                                            name="calendar-prescribed"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="lastRefillDate">Last Refill</Label>
                                <Popover open={lastRefillDateOpen} onOpenChange={setLastRefillDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`w-full justify-start text-left font-normal ${inputStyles}`}
                                            id="lastRefillDate"
                                            name="lastRefillDate"
                                            type="button"
                                            aria-label="Select last refill date"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {lastRefillDate ? format(lastRefillDate, "PPP") : <span className={inputStyles}>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={lastRefillDate}
                                            onSelect={(date) => {
                                                setLastRefillDate(date);
                                                setLastRefillDateOpen(false);
                                            }}
                                            initialFocus
                                            id="calendar-refill"
                                            name="calendar-refill"
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="prescribedBy">Prescribed By</Label>
                                <Select 
                                    value={newMedication.prescribedBy}
                                    onValueChange={(value) => handleInputChange('prescribedBy', value)}
                                    name="prescribedBy"
                                >
                                    <SelectTrigger className={selectTriggerStyles} id="prescribedBy">
                                        <SelectValue placeholder="Select provider" className={selectValueStyles} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Dr. Emily Carter">Dr. Emily Carter</SelectItem>
                                        <SelectItem value="Dr. Michael Lee">Dr. Michael Lee</SelectItem>
                                        <SelectItem value="Dr. Sarah Wilson">Dr. Sarah Wilson</SelectItem>
                                        <SelectItem value="other">Other (Fill in)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Input 
                                    id="description" 
                                    name="description"
                                    value={newMedication.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    placeholder="Enter description" 
                                    className={inputStyles}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Select 
                                    value={newMedication.status}
                                    onValueChange={(value) => handleInputChange('status', value)}
                                    name="status"
                                >
                                    <SelectTrigger className={selectTriggerStyles} id="status">
                                        <SelectValue placeholder="Select status" className={selectValueStyles} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="current">Current</SelectItem>
                                        <SelectItem value="past">Past</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="timeOfDay">Time of Day</Label>
                                <Select 
                                    value={newMedication.timeOfDay}
                                    onValueChange={(value) => handleInputChange('timeOfDay', value)}
                                    name="timeOfDay"
                                >
                                    <SelectTrigger className={selectTriggerStyles} id="timeOfDay">
                                        <SelectValue placeholder="Select time" className={selectValueStyles} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="bid">2 times a day (BID)</SelectItem>
                                        <SelectItem value="tid">3 times a day (TID)</SelectItem>
                                        <SelectItem value="qid">4 times a day (QID)</SelectItem>
                                        <SelectItem value="5times">5 times a day</SelectItem>
                                        <SelectItem value="3hours">Every 3 hours</SelectItem>
                                        <SelectItem value="4hours">Every 4 hours</SelectItem>
                                        <SelectItem value="6hours">Every 6 hours</SelectItem>
                                        <SelectItem value="8hours">Every 8 hours</SelectItem>
                                        <SelectItem value="12hours">Every 12 hours</SelectItem>
                                        <SelectItem value="24hours">Every 24 hours</SelectItem>
                                        <SelectItem value="bedtime">Bedtime</SelectItem>
                                        <SelectItem value="meals">With meals</SelectItem>
                                        <SelectItem value="meals_bedtime">With meals and at bedtime</SelectItem>
                                        <SelectItem value="injectable">Injectable antibiotics</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="count">Count</Label>
                                <Input 
                                    id="count" 
                                    name="count"
                                    type="number" 
                                    min={1} 
                                    value={newMedication.count}
                                    onChange={(e) => handleInputChange('count', e.target.value)}
                                    placeholder="Enter count" 
                                    className={inputStyles}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="dailyDose">Daily Dose</Label>
                                <Input 
                                    id="dailyDose" 
                                    name="dailyDose"
                                    value={newMedication.dailyDose}
                                    onChange={(e) => handleInputChange('dailyDose', e.target.value)}
                                    placeholder="Enter daily dose" 
                                    className={inputStyles}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea 
                                    id="notes" 
                                    name="notes"
                                    value={newMedication.notes}
                                    onChange={(e) => handleInputChange('notes', e.target.value)}
                                    placeholder="Additional notes" 
                                    className={`resize-none min-h-[100px] ${inputStyles}`}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <Button 
                            type="submit"
                            className="w-full bg-[#D9D9D9] hover:bg-gray-400 text-black"
                        >
                            {editingMedication ? 'Save Changes' : 'Add Medication To List'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddMedicationModal; 