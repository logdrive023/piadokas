import { Users } from "lucide-react"

interface OnlineReadersProps {
  count: number
}

export function OnlineReaders({ count }: OnlineReadersProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-3 inline-flex items-center gap-2">
      <Users className="h-4 w-4 text-purple-400" />
      <div>
        <span className="text-xs text-gray-400">Leitores online:</span>
        <span className="ml-2 text-sm font-medium text-white">{count}</span>
      </div>
    </div>
  )
}

export default OnlineReaders
