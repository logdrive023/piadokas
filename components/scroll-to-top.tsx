"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Rolar para o topo quando o pathname mudar
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
