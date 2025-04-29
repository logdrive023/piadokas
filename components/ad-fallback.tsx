import type React from "react"

interface AdFallbackProps {
  style?: React.CSSProperties
  text?: string
}

export function AdFallback({ style = { display: "block", width: "100%", height: "250px" }, text }: AdFallbackProps) {
  return (
    <div
      style={style}
      className="bg-muted/30 flex items-center justify-center text-center text-muted-foreground text-sm border border-dashed rounded-md"
    >
      <div>
        <p>{text || "Publicidade"}</p>
        <p className="text-xs mt-1">Seu anúncio aqui</p>
      </div>
    </div>
  )
}

export default AdFallback
