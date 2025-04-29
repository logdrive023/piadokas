import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import  PopupProvider  from "@/components/popup-provider"
import { LoadingProvider } from "@/components/loading-provider"
import { Toaster } from "@/components/ui/toaster"
import AdSenseScript from "@/components/adsense-script"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "pIAdokas - Compartilhe e descubra os melhores memes",
  description: "Uma plataforma social para compartilhar e descobrir os melhores memes da internet.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4488733165053759" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background antialiased flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <PopupProvider>
              <LoadingProvider>
                <AdSenseScript />
                <div className="flex flex-col min-h-screen">
                  <SiteHeader />
                  <main className="flex-1 pt-14">{children}</main>
                  <SiteFooter />
                </div>
              </LoadingProvider>
            </PopupProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
