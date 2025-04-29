import { Card } from "@/components/ui/card"

interface AdFallbackProps {
  type: "horizontal" | "sidebar" | "popup"
  className?: string
}

export default function AdFallback({ type, className = "" }: AdFallbackProps) {
  if (type === "horizontal") {
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

  if (type === "sidebar") {
    return (
      <Card className={`bg-gray-800 border-gray-700 overflow-hidden ${className}`}>
        <div className="aspect-square bg-gradient-to-r from-gray-700 to-gray-800 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm">Publicidade</p>
          <p className="text-gray-500 text-xs">Seu anúncio aqui</p>
        </div>
      </Card>
    )
  }

  if (type === "popup") {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 rounded-md mb-4 overflow-hidden">
        <div className="aspect-video flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Publicidade</p>
            <p className="text-gray-500 text-xs">Seu anúncio aqui</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
