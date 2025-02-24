"use client"

import { useState, useMemo } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// 更新接口以匹配新的数据结构
interface FilterProps {
  onFilterChange: (filters: {
    date: string;
    dentalOffice: string;
    specialty: string;
    dentist: string;
    reason: string;
  }) => void;
  records: Array<{
    id: number;
    appointmentOverview: {
      date: string;
      provider: string;
      practice: string;
      purposeOfVisit: string;
    };
    diagnosis: {
      conditions: string[];
    };
  }>;
}

// Helper function to get unique values from an array
const getUniqueValues = (array: string[]) => Array.from(new Set(array))

export default function RecordFilters({ onFilterChange, records }: FilterProps) {
  const [date, setDate] = useState("")
  const [dentalOffice, setDentalOffice] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [dentist, setDentist] = useState("")
  const [reason, setReason] = useState("")

  // 根据当前选择的过滤条件获取有效记录
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const dateMatch = !date || record.appointmentOverview.date === date;
      const officeMatch = !dentalOffice || record.appointmentOverview.practice === dentalOffice;
      const providerMatch = !dentist || record.appointmentOverview.provider === dentist;
      const reasonMatch = !reason || record.appointmentOverview.purposeOfVisit === reason;
      return dateMatch && officeMatch && providerMatch && reasonMatch;
    });
  }, [records, date, dentalOffice, dentist, reason]);

  // 动态生成过滤选项，只包含当前有效的选项
  const filterOptions = useMemo(() => {
    return {
      dates: getUniqueValues(filteredRecords.map(record => record.appointmentOverview.date)),
      dentalOffices: getUniqueValues(filteredRecords.map(record => record.appointmentOverview.practice)),
      dentists: getUniqueValues(filteredRecords.map(record => record.appointmentOverview.provider)),
      reasons: getUniqueValues(filteredRecords.map(record => record.appointmentOverview.purposeOfVisit)),
      specialties: ["General Dentistry", "Orthodontics", "Periodontics"],
    };
  }, [filteredRecords]);

  const handleChange = (key: string, value: string) => {
    // 如果选择了 "all"，视为清除该过滤条件
    if (value === 'all') {
      if (key === 'date') setDate("");
      if (key === 'dentalOffice') setDentalOffice("");
      if (key === 'specialty') setSpecialty("");
      if (key === 'dentist') setDentist("");
      if (key === 'reason') setReason("");
      
      const newValues = {
        date: key === 'date' ? "" : date,
        dentalOffice: key === 'dentalOffice' ? "" : dentalOffice,
        specialty: key === 'specialty' ? "" : specialty,
        dentist: key === 'dentist' ? "" : dentist,
        reason: key === 'reason' ? "" : reason,
      };
      onFilterChange(newValues);
    } else {
      // 设置新的过滤值
      if (key === 'date') setDate(value);
      if (key === 'dentalOffice') setDentalOffice(value);
      if (key === 'specialty') setSpecialty(value);
      if (key === 'dentist') setDentist(value);
      if (key === 'reason') setReason(value);

      const newValues = {
        date: key === 'date' ? value : date,
        dentalOffice: key === 'dentalOffice' ? value : dentalOffice,
        specialty: key === 'specialty' ? value : specialty,
        dentist: key === 'dentist' ? value : dentist,
        reason: key === 'reason' ? value : reason,
      };
      onFilterChange(newValues);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-2">
      <div className="space-y-2 ">
        <Label htmlFor="date-filter" className="font-bold text-[14px]">Date</Label>
        <Select value={date} onValueChange={(value) => handleChange('date', value)}>
          <SelectTrigger id="date-filter" className="shadow-all">
            <SelectValue placeholder="Select date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            {filterOptions.dates.map((date) => (
              <SelectItem key={date} value={date}>
                {date}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="office-filter" className="font-bold text-[14px]">Dental Office</Label>
        <Select value={dentalOffice} onValueChange={(value) => handleChange('dentalOffice', value)}>
          <SelectTrigger id="office-filter" className="shadow-all">
            <SelectValue placeholder="Select office" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Offices</SelectItem>
            {filterOptions.dentalOffices.map((office) => (
              <SelectItem key={office} value={office}>
                {office}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialty-filter" className="font-bold text-[14px]">Specialty</Label>
        <Select value={specialty} onValueChange={(value) => handleChange('specialty', value)}>
          <SelectTrigger id="specialty-filter" className="shadow-all">
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {filterOptions.specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dentist-filter" className="font-bold text-[14px]">Dentist</Label>
        <Select value={dentist} onValueChange={(value) => handleChange('dentist', value)}>
          <SelectTrigger id="dentist-filter" className="shadow-all">
            <SelectValue placeholder="Select dentist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dentists</SelectItem>
            {filterOptions.dentists.map((dentist) => (
              <SelectItem key={dentist} value={dentist}>
                {dentist}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason-filter" className="font-bold text-[14px]">Reason for Visit</Label>
        <Select value={reason} onValueChange={(value) => handleChange('reason', value)}>
          <SelectTrigger id="reason-filter" className="shadow-all">
            <SelectValue placeholder="Select reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reasons</SelectItem>
            {filterOptions.reasons.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {reason}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

