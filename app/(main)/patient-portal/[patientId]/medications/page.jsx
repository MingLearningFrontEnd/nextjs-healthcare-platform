'use client'

import { useState } from "react";
import PatientBanner from "../../components/PatientBanner";
import AddMedicationModal from "../../components/AddMedicationModal";
import MedicationContent from "../../components/MedicationContent";
import { format } from "date-fns";

// 在组件外部定义模拟数据
const mockMedications = {
  current: {
    "Antibiotics": [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        reason: "Dental infection",
        prescribedDate: "2024-02-15",
        lastRefill: "2024-02-28",
        prescribedBy: "Dr. Emily Carter",
        notes: "Take with food, complete full course",
      },
      {
        name: "Azithromycin",
        dosage: "250mg",
        reason: "Sinus infection",
        prescribedDate: "2024-01-20",
        lastRefill: "2024-02-01",
        prescribedBy: "Dr. Michael Lee",
        notes: "Take on empty stomach",
      }
    ],
    "Pain Relief": [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        reason: "Post-procedure pain",
        prescribedDate: "2024-02-10",
        lastRefill: "2024-02-25",
        prescribedBy: "Dr. Emily Carter",
        notes: "Take as needed for pain",
      },
      {
        name: "Acetaminophen",
        dosage: "500mg",
        reason: "Tooth pain",
        prescribedDate: "2024-02-01",
        lastRefill: "2024-02-15",
        prescribedBy: "Dr. Sarah Wilson",
        notes: "Do not exceed 4000mg per day",
      }
    ]
  },
  past: {
    "Antibiotics": [
      {
        name: "Penicillin",
        dosage: "250mg",
        reason: "Root canal treatment",
        prescribedDate: "2023-11-15",
        lastRefill: "2023-12-01",
        prescribedBy: "Dr. Emily Carter",
        notes: "Course completed",
      }
    ],
    "Pain Relief": [
      {
        name: "Naproxen",
        dosage: "500mg",
        reason: "Wisdom tooth extraction",
        prescribedDate: "2023-10-20",
        lastRefill: "2023-11-05",
        prescribedBy: "Dr. Michael Lee",
        notes: "Treatment completed",
      }
    ]
  }
};

const Medications = () => {
    const [open, setOpen] = useState(false);
    const [editingMedication, setEditingMedication] = useState(null);
    const [medications, setMedications] = useState(mockMedications);

    const handleSubmit = (medicationData) => {
        const newMedicationRecord = {
            name: medicationData.name,
            dosage: medicationData.dosage,
            reason: medicationData.description,
            prescribedDate: medicationData.prescribedDate ? format(medicationData.prescribedDate, "yyyy-MM-dd") : "",
            lastRefill: medicationData.lastRefillDate ? format(medicationData.lastRefillDate, "yyyy-MM-dd") : "",
            prescribedBy: medicationData.prescribedBy,
            notes: medicationData.notes,
        };

        const targetSection = medicationData.status === 'current' ? 'current' : 'past';
        const normalizedCategory = medicationData.category
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        setMedications(prev => {
            const updatedMedications = JSON.parse(JSON.stringify(prev));
            
            const existingCategory = Object.keys(updatedMedications[targetSection]).find(
                cat => cat.toLowerCase() === normalizedCategory.toLowerCase()
            );
            
            const categoryToUse = existingCategory || normalizedCategory;
            
            if (!updatedMedications[targetSection]) {
                updatedMedications[targetSection] = {};
            }
            
            if (!updatedMedications[targetSection][categoryToUse]) {
                updatedMedications[targetSection][categoryToUse] = [];
            }

            // 如果是编辑状态，先删除原有记录
            if (editingMedication) {
                const { section, category, index } = editingMedication;
                updatedMedications[section][category].splice(index, 1);
                
                if (updatedMedications[section][category].length === 0) {
                    delete updatedMedications[section][category];
                }
            }
            
            // 添加新记录
            if (!updatedMedications[targetSection][categoryToUse]) {
                updatedMedications[targetSection][categoryToUse] = [];
            }
            updatedMedications[targetSection][categoryToUse].push(newMedicationRecord);
            
            return updatedMedications;
        });

        setEditingMedication(null);
        setOpen(false);
    };

    const handleDelete = (section, category, index) => {
        setMedications(prev => {
            const updatedMedications = JSON.parse(JSON.stringify(prev));
            updatedMedications[section][category].splice(index, 1);
            
            if (updatedMedications[section][category].length === 0) {
                delete updatedMedications[section][category];
            }
            
            return updatedMedications;
        });
    };

    const handleEdit = (medicationData) => {
        setEditingMedication(medicationData);
        setOpen(true);
    };

    return (
        <div className="min-h-screen bg-transparent">
            <PatientBanner />
            <MedicationContent 
                medications={medications}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAddNew={() => setOpen(true)}
            />
            <AddMedicationModal 
                open={open}
                onOpenChange={setOpen}
                onSubmit={handleSubmit}
                editingMedication={editingMedication}
            />
        </div>
    );
};

export default Medications;