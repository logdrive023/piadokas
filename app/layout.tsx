import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/site-header"
import PopupProvider from "@/components/popup-provider"
import { SiteFooter } from "@/components/site-footer"
import { AuthProvider } from "@/lib/auth-context"
import { LoadingProvider } from "@/components/loading-provider"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "PiAdokas - O melhor site de memes do Brasil",
  description: "Compartilhe, curta e comente os melhores memes da internet.",
    generator: 'PiAdokas'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <LoadingProvider>
              <ScrollToTop />
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
      </body>
    </html>
  )
}
