import AdSenseAd from "./adsense-ad"
import { AD_SLOTS, isAdSenseEnabled } from "@/lib/adsense-config"
import AdFallback from "./ad-fallback"

interface SidebarAdProps {
  title?: string
  className?: string
}

export function SidebarAd({ title = "Publicidade", className = "" }: SidebarAdProps) {
  const adSenseEnabled = isAdSenseEnabled()

  if (adSenseEnabled) {
    return (
      <div className={className}>
        <p className="text-gray-400 text-sm mb-2">{title}</p>
        <AdSenseAd
          slot={AD_SLOTS.SIDEBAR_SQUARE.id}
          format="rectangle"
          responsive={true}
          className="w-full overflow-hidden"
          style={{ minHeight: "250px" }}
        />
      </div>
    )
  }

  return <AdFallback type="sidebar" className={className} />
}

export default SidebarAd
