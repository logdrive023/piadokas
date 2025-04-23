"use client"

import type React from "react"

import type { ReactNode } from "react"
import Link, { type LinkProps } from "next/link"
import { useLoading } from "./loading-provider"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

interface LinkWithLoadingProps extends LinkProps {
  children: ReactNode
  className?: string
}

export function LinkWithLoading({ children, className, href, ...props }: LinkWithLoadingProps) {
  const { startLoading } = useLoading()
  const pathname = usePathname()
  const scrollToTopRef = useRef(false)

  // Função para verificar se o link é para a mesma página
  const isSamePage = () => {
    if (typeof href === "string") {
      // Remove query params e hash para comparação
      const hrefPath = href.split("?")[0].split("#")[0]
      return hrefPath === pathname
    } else if (typeof href === "object" && href.pathname) {
      return href.pathname === pathname
    }
    return false
  }

  // Efeito para rolar para o topo após a navegação
  useEffect(() => {
    if (scrollToTopRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      scrollToTopRef.current = false
    }
  }, [pathname])

  const handleClick = (e: React.MouseEvent) => {
    // Só mostrar loading se estiver navegando para uma página diferente
    if (!isSamePage()) {
      startLoading()
      scrollToTopRef.current = true
    } else {
      // Se for a mesma página, apenas role para o topo
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

export default LinkWithLoading
