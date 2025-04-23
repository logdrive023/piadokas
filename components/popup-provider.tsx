"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import PopupAd from "./popup-ad"

interface PopupContextType {
  showPopup: (content: ReactNode) => void
  hidePopup: () => void
}

const PopupContext = createContext<PopupContextType | undefined>(undefined)

export function usePopup() {
  const context = useContext(PopupContext)
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider")
  }
  return context
}

interface PopupProviderProps {
  children: ReactNode
  // Configurações para o popup de anúncio
  adConfig?: {
    initialDelay?: number // Tempo inicial antes do primeiro popup (ms)
    frequency?: number // Frequência de exibição (ms)
    enabled?: boolean // Se os popups de anúncios estão habilitados
    sessionLimit?: number // Número máximo de popups por sessão
    adData?: {
      title?: string
      subtitle?: string
      imageUrl?: string
      buttonText?: string
      buttonUrl?: string
    }
  }
}

export default function PopupProvider({
  children,
  adConfig = {
    initialDelay: 30000, // 30 segundos por padrão
    frequency: 300000, // 5 minutos por padrão
    enabled: true,
    sessionLimit: 3, // Máximo de 3 popups por sessão
  },
}: PopupProviderProps) {
  const [popupContent, setPopupContent] = useState<ReactNode | null>(null)
  const [showAdPopup, setShowAdPopup] = useState(false)
  const [popupCount, setPopupCount] = useState(0)

  // Gerenciar exibição de popups de anúncios
  useEffect(() => {
    if (!adConfig.enabled) return

    // Verificar se já atingiu o limite de popups por sessão
    if (popupCount >= (adConfig.sessionLimit || 3)) return

    // Mostrar o primeiro popup após o atraso inicial
    const initialTimer = setTimeout(() => {
      setShowAdPopup(true)
      setPopupCount((prev) => prev + 1)
    }, adConfig.initialDelay || 30000)

    return () => clearTimeout(initialTimer)
  }, [adConfig.enabled, adConfig.initialDelay, adConfig.sessionLimit, popupCount])

  // Configurar timer para popups recorrentes
  useEffect(() => {
    if (!adConfig.enabled || !adConfig.frequency) return

    const recurringTimer = setInterval(() => {
      // Verificar se já atingiu o limite de popups por sessão
      if (popupCount >= (adConfig.sessionLimit || 3)) {
        clearInterval(recurringTimer)
        return
      }

      // Não mostrar se já houver outro popup aberto
      if (!popupContent) {
        setShowAdPopup(true)
        setPopupCount((prev) => prev + 1)
      }
    }, adConfig.frequency)

    return () => clearInterval(recurringTimer)
  }, [adConfig.enabled, adConfig.frequency, adConfig.sessionLimit, popupCount, popupContent])

  const showPopup = (content: ReactNode) => {
    setPopupContent(content)
    document.body.style.overflow = "hidden" // Prevent scrolling when popup is open
  }

  const hidePopup = () => {
    setPopupContent(null)
    document.body.style.overflow = "" // Re-enable scrolling
  }

  const hideAdPopup = () => {
    setShowAdPopup(false)
  }

  return (
    <PopupContext.Provider value={{ showPopup, hidePopup }}>
      {children}
      {popupContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative bg-background rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
            {popupContent}
          </div>
        </div>
      )}
      {showAdPopup && <PopupAd onClose={hideAdPopup} adData={adConfig.adData} />}
    </PopupContext.Provider>
  )
}
