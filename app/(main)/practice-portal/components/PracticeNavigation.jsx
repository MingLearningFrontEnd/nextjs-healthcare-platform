import Link from "next/link"
import { Settings, Building2, Users, LayoutDashboard, BarChart, Menu, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PracticeNavigation({ practiceId }) {
  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Dashboard", 
      href: `/practice-portal/${practiceId}` 
    },
    { 
      icon: BarChart, 
      label: "Analytics", 
      href: `/practice-portal/${practiceId}/analytics` 
    },
    { 
      icon: Users, 
      label: "Providers", 
      href: `/practice-portal/${practiceId}/providers` 
    },
    { 
      icon: Building2, 
      label: "Practices", 
      href: `/practice-portal/${practiceId}/practices` 
    },
    { 
      icon: Settings, 
      label: "Settings", 
      href: `/practice-portal/${practiceId}/settings` 
    },
  ]

  return (
    <nav className="pt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex items-center gap-6 px-4 mr-7 w-full bg-[#D9D9D9] hover:bg-gray-400 sm:w-[150px] md:w-[170px] lg:w-[200px] text-base sm:text-base data-[state=open]:border-2 data-[state=open]:border-[#7B61FF]"
          >
            <Menu className="!w-6 !h-6 sm:w-9 sm:h-9" />
            <span>Menu</span>
          </Button>
        </DropdownMenuTrigger>
        
        {/* 响应式下拉菜单 */}
        <DropdownMenuContent 
          align="end" 
          className="w-[200px sm:w-[150px] md:w-[170px] lg:w-[200px] p-2 shadow-md bg-[#D9D9D9] rounded-lg"
        >
          {navItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <Link href={item.href} className="flex items-center gap-6 hover:bg-gray-100 rounded-md active:border-2 active:border-[#360984]">
                <item.icon className="!w-6 !h-6 sm:!w-4 sm:!h-4 lg:!w-6 lg:!h-6" />
                <span className="text-sm sm:text-sm md:text-base lg:text-lg">{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}

