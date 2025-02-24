'use client'
import { usePathname } from "next/navigation"

const ClientWrapper = ({ children }) => {
    const pathname = usePathname()
    if (typeof children === 'function') {
        return <>{children(pathname)}</>
    }
    return <>{children}</>
}

export default ClientWrapper