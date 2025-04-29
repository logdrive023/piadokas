"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { ADSENSE_ENABLED } from "@/lib/adsense-config"
import { AdFallback } from "./ad-fallback"

interface AdSenseAdProps {
  slotId: string
  style?: React.CSSProperties
  className?: string
  format?: "auto" | "rectangle" | "horizontal" | "vertical"
  responsive?: boolean
  fallbackText?: string
}

export function AdSenseAd({
  slotId,
  style = { display: "block" },
  className = "",
  format = "auto",
  responsive = true,
  fallbackText,
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ADSENSE_ENABLED && window.adsbygoogle && adRef.current) {
      try {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  if (!ADSENSE_ENABLED) {
    return <AdFallback style={style} text={fallbackText} />
  }

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Será substituído pelo valor real do ambiente
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      ></ins>
    </div>
  )
}

export default AdSenseAd
