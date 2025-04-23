import { Card } from "@/components/ui/card"

interface HorizontalAdProps {
  className?: string
}

export function HorizontalAd({ className = "" }: HorizontalAdProps) {
  return (
    <Card className={`bg-gray-800 border-gray-700 overflow-hidden ${className}`}>
      <div className="aspect-[6/1] sm:aspect-[8/1] bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Publicidade</p>
          <p className="text-gray-500 text-xs">Seu anúncio aqui</p>
        </div>
      </div>
    </Card>
  )
}

export default HorizontalAd
