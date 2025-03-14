import Link from "next/link"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Patient {
  id: number
  name: string
}

interface PatientNodeProps {
  patient: Patient
}

export default function PatientNode({ patient }: PatientNodeProps) {
  return (
    <div className="patient-node">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/patient-portal?id=${patient.id}`}>
              <div className="patient-box p-1 border rounded-lg bg-white text-[10px] sm:text-xs cursor-pointer hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap overflow-hidden text-ellipsis max-w-[80px] sm:max-w-[100px]">
                <p className="truncate">{patient.name}</p>
              </div>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{patient.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

