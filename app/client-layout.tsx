"use client"

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import PopupProvider from "@/components/popup-provider"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/lib/auth-context"
import { LoadingProvider } from "@/components/loading-provider"
import { useEffect } from "react"
import ScrollToTop from "@/components/scroll-to-top"

function ScrollToTopComponent() {
  useEffect(() => {
    // Função para rolar para o topo quando a rota muda
    const handleRouteChange = () => {
      window.scrollTo(0, 0)
    }

    // Adicionar o evento de mudança de rota
    window.addEventListener("popstate", handleRouteChange)

    // Limpar o evento quando o componente é desmontado
    return () => {
      window.removeEventListener("popstate", handleRouteChange)
    }
  }, [])

  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <AuthProvider>
        <LoadingProvider>
          <PopupProvider
            adConfig={{
              initialDelay: 45000, // 45 segundos para o primeiro popup
              frequency: 300000, // 5 minutos entre popups
              enabled: true,
              sessionLimit: 3, // Máximo de 3 popups por sessão
              adData: {
                title: "Publicidade",
                subtitle: "Os melhores produtos para você!",
                imageUrl: "/vibrant-sale-banner.png",
                buttonText: "Ver oferta",
                buttonUrl: "#",
              },
            }}
          >
            <div className="min-h-screen flex flex-col">
              <SiteHeader />
              <div className="pt-[72px] md:pt-[64px] flex-grow">{children}</div>
              <SiteFooter />
            </div>
          </PopupProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
    <ScrollToTop />
  )
}
