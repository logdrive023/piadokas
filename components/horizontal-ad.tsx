import AdSenseAd from "./adsense-ad"
import { AD_SLOTS, isAdSenseEnabled } from "@/lib/adsense-config"
import AdFallback from "./ad-fallback"

interface HorizontalAdProps {
  className?: string
}

export function HorizontalAd({ className = "" }: HorizontalAdProps) {
  const adSenseEnabled = isAdSenseEnabled()

  if (adSenseEnabled) {
    return (
      <div className={className}>
        <AdSenseAd
          slot={AD_SLOTS.HORIZONTAL_BANNER.id}
          format="horizontal"
          responsive={true}
          className="w-full overflow-hidden"
          style={{ minHeight: "90px" }}
        />
      </div>
    )
  }

  return <AdFallback type="horizontal" className={className} />
}

export default HorizontalAd
