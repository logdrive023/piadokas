"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AdSenseAdProps {
  slot: string
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal"
  style?: React.CSSProperties
  className?: string
  responsive?: boolean
  layout?: "in-article" | "in-feed"
}

export default function AdSenseAd({
  slot,
  format = "auto",
  style = {},
  className = "",
  responsive = true,
  layout,
}: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      // Initialize ads if window.adsbygoogle exists
      if (typeof window !== "undefined" && adRef.current) {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error("Error initializing AdSense ad:", error)
    }
  }, [])

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-xxxxxxxxxxxxxxxx"

  return (
    <div className={className} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          overflow: "hidden",
          ...style,
        }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        {...(responsive && { "data-full-width-responsive": "true" })}
        {...(layout && { "data-ad-layout": layout })}
      />
    </div>
  )
}
