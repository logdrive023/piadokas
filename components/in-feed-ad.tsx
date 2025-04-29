"use client"

import AdSenseAd from "./adsense-ad"
import { AD_SLOTS, isAdSenseEnabled } from "@/lib/adsense-config"
import { Card } from "@/components/ui/card"

interface InFeedAdProps {
  className?: string
  index?: number
}

export default function InFeedAd({ className = "", index = 0 }: InFeedAdProps) {
  const adSenseEnabled = isAdSenseEnabled()

  if (!adSenseEnabled) {
    return (
      <Card className={`bg-gray-800 border-gray-700 overflow-hidden ${className}`}>
        <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Publicidade</p>
            <p className="text-gray-500 text-xs">Seu anúncio aqui</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className={`my-6 ${className}`}>
      <div className="text-xs text-gray-500 mb-1">Publicidade</div>
      <AdSenseAd
        slot={AD_SLOTS.IN_FEED.id}
        format="fluid"
        layout="in-feed"
        responsive={true}
        className="w-full overflow-hidden"
        style={{ minHeight: "200px" }}
      />
    </div>
  )
}
