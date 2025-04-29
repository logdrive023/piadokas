import { AdSenseAd } from "./adsense-ad"
import { adSlots } from "@/lib/adsense-config"

interface InFeedAdProps {
  className?: string
}

export function InFeedAd({ className = "" }: InFeedAdProps) {
  return (
    <div className={`my-6 ${className}`}>
      <AdSenseAd
        slotId={adSlots.inFeed.id}
        style={{ display: "block", width: "100%", height: "60px" }}
        format="horizontal"
        fallbackText="Anúncio no Feed"
      />
    </div>
  )
}

export default InFeedAd
