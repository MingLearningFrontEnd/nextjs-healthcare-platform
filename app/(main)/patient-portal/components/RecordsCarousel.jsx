"use client"

import { useState } from "react"
import {  ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useGesture } from "@use-gesture/react"
import { useRouter } from "next/navigation"
import RecordFilters from './RecordFilters'
import FilterIcon from '@/public/assets/fluent_data-funnel-20-filled.svg'
import { recordsData } from './DetailedRecordView'

export default function RecordsCarousel({ patientId }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filteredRecords, setFilteredRecords] = useState(recordsData)
  const router = useRouter()
  const [showFilters, setShowFilters] = useState(false)

  const handleFilterChange = (filters) => {
    const filtered = recordsData.filter(record => {
      const dateMatch = !filters.date || record.appointmentOverview.date === filters.date;
      const providerMatch = !filters.dentist || record.appointmentOverview.provider === filters.dentist;
      const practiceMatch = !filters.dentalOffice || record.appointmentOverview.practice === filters.dentalOffice;
      const reasonMatch = !filters.reason || record.appointmentOverview.purposeOfVisit === filters.reason;

      return dateMatch && providerMatch && practiceMatch && reasonMatch;
    });

    setFilteredRecords(filtered);
    setCurrentIndex(0);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const nextRecord = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredRecords.length - 1 ? 0 : prevIndex + 1
    )

  }

  const prevRecord = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredRecords.length - 1 : prevIndex - 1
    )
  }

  const getVisibleRecords = () => {
    if (filteredRecords.length === 0) {
      return [];
    }

    const visibleRecords = [];
    // 根据过滤后的记录数量决定显示范围
    const range = Math.min(2, Math.floor((filteredRecords.length - 1) / 2));

    // 只循环需要显示的卡片数量
    for (let i = -range; i <= range; i++) {
      const index = (currentIndex + i + filteredRecords.length) % filteredRecords.length;
      visibleRecords.push({
        ...filteredRecords[index],
        position: i,
        uniqueKey: `${filteredRecords[index].id}-${i}`
      });
    }
    return visibleRecords;
  };

  const bind = useGesture({
    onDrag: ({ movement: [mx], direction: [xDir], cancel, first, last }) => {
      if (first) {
        cancel()
      }
      if (last) {
        if (Math.abs(mx) > 50) {
          if (xDir > 0) {
            prevRecord()
          } else {
            nextRecord()
          }
        }
      }
    },
  })

  const handleCardClick = (recordNumber, position) => {
    if (position === 0) {
      router.push(`/patient-portal/${patientId}/record/${recordNumber}`)
    }
  }

  if (filteredRecords.length === 0) {
    return (
      <div className="bg-white rounded-sm overflow-hidden">
        <div className="relative w-full overflow-hidden pt-8 pb-20 bg-white rounded-md">
          <h2 className="text-center lg:text-2xl font-bold mb-4">Previous Dental Records</h2>
          <button
            onClick={toggleFilters}
            className="absolute top-4 right-4 p-2 bg-[#D9D9D9] rounded-sm"
            aria-label="Toggle Filters"
          >
            <FilterIcon />
          </button>
          <div className="text-center py-10">
            No records match the selected filters
          </div>
        </div>
        {showFilters && (
          <div className="top-0 right-0 z-10 bg-white p-4 px-6 mt-10">
            <RecordFilters
              onFilterChange={handleFilterChange}
              records={recordsData}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-transparent rounded-sm  ">
      <div className="relative  mx-auto  pt-8 pb-16 bg-transparent rounded-md ">
        <div className="flex bg-white justify-between  align-middle px-4 py-6 rounded-sm shadow-all">
          <h2 className=" font-bold lg:text-3xl  md:text-2xl sm:text-2xl">Dental Records</h2>
          <button
            onClick={toggleFilters}
            className=" mr-2 p-2 bg-[#D9D9D9] rounded-md z-10 hover:bg-gray-400"
            aria-label="Toggle Filters"
          >
            <FilterIcon />
          </button>
        </div>

        <div
          {...bind()}
          className="flex justify-center items-center min-h-[300px] md:min-h-[400px] cursor-grab active:cursor-grabbing relative overflow-hidden"
        >
          {getVisibleRecords().map((record) => (
            <Card
              key={record.uniqueKey}
              className={cn(
                "absolute w-[360px] md:w-[430px] lg:w-[650px] ",
                "transition-all duration-500 ease-in-out",
                {
                  "z-30 opacity-100 cursor-pointer": record.position === 0,
                  "z-20 opacity-100 hidden md:block": Math.abs(record.position) === 1,
                  "z-10 opacity-100 hidden lg:block": Math.abs(record.position) === 2,
                }
              )}
              style={{
                transform: `translateX(${record.position * 45}%) scale(${record.position === 0 ? 1 :
                    Math.abs(record.position) === 1 ? 0.9 :
                      0.8
                  })`,
                transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                filter: `blur(${Math.abs(record.position) * 1}px)`,
              }}
              onClick={() => handleCardClick(record.id, record.position)}
            >
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl md:text-2xl font-semibold">Visit Summary</h3>
                  <span className="text-sm md:text-base font-medium px-2 py-1 rounded">
                    #{record.id}
                  </span>
                </div>

                <div className="space-y-2 md:space-y-3 text-sm md:text-lg">
                  <p>
                    <strong>Date:</strong> {record.appointmentOverview.date}
                  </p>
                  <p>
                    <strong>Provider:</strong> {record.appointmentOverview.provider}
                  </p>
                  <p>
                    <strong>Practice:</strong> {record.appointmentOverview.practice}
                  </p>
                  <p>
                    <strong>Reason:</strong> {record.appointmentOverview.purposeOfVisit}
                  </p>
                  <p>
                    <strong>Diagnosis:</strong> {record.diagnosis.conditions.join(", ")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-3 px-4  rounded-full ">
          <Button
            variant="ghost"
            size="icon"
            className=" z-50 "
            onClick={prevRecord}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            {filteredRecords.length > 0 && filteredRecords.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  currentIndex === index ? "bg-purple-700  " : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
                aria-label={`Go to record ${index + 1}`}
              />
            ))}
          </div>


          <Button
            variant="ghost"
            className="z-50  "
            onClick={nextRecord}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
      {showFilters && (
        <div className=" w-full ">
          <RecordFilters
            onFilterChange={handleFilterChange}
            records={recordsData}
          />
        </div>
      )}
    </div>
  )
}

