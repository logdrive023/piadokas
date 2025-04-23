import { Card } from "@/components/ui/card"

interface SidebarAdProps {
  title?: string
  className?: string
}

export function SidebarAd({ title = "Publicidade", className = "" }: SidebarAdProps) {
  return (
    <Card className={`bg-gray-800 border-gray-700 overflow-hidden ${className}`}>
      <div className="aspect-square bg-gradient-to-r from-gray-700 to-gray-800 flex flex-col items-center justify-center">
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-gray-500 text-xs">Seu anúncio aqui</p>
      </div>
    </Card>
  )
}

export default SidebarAd
