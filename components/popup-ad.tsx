"use client"

import type React from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PopupAdProps {
  onClose: () => void
  adData?: {
    title?: string
    subtitle?: string
    imageUrl?: string
    buttonText?: string
    buttonUrl?: string
  }
}

export const PopupAd: React.FC<PopupAdProps> = ({
  onClose,
  adData = {
    title: "Publicidade",
    subtitle: "Espaço disponível para anúncios",
    imageUrl: "/blank-billboard.png",
    buttonText: "Saiba mais",
    buttonUrl: "#",
  },
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center">
          <h3 className="text-lg font-bold">{adData.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-white/20 text-white"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-4 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">{adData.subtitle}</p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-md mb-4 overflow-hidden">
              <img src={adData.imageUrl || "/placeholder.svg"} alt="Anúncio" className="w-full h-auto object-cover" />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Anúncio</p>
          </div>

          <div className="flex justify-between gap-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open(adData.buttonUrl, "_blank")}
            >
              {adData.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupAd
