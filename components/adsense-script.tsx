"use client"

import { useEffect } from "react"
import Script from "next/script"
import { ADSENSE_CLIENT_ID, ADSENSE_ENABLED } from "@/lib/adsense-config"

export function AdSenseScript() {
  useEffect(() => {
    // Inicializar o AdSense quando o componente montar
    if (ADSENSE_ENABLED && window.adsbygoogle) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  if (!ADSENSE_ENABLED || !ADSENSE_CLIENT_ID) {
    return null
  }

  return (
    <Script
      id="adsense-script"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onError={(e) => {
        console.error("AdSense script failed to load", e)
      }}
    />
  )
}

export default AdSenseScript
