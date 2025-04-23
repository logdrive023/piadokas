"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Pause, Play, ArrowUp } from "lucide-react"

interface StopScrollButtonProps {
  onToggle: (stopped: boolean) => void
}

export function StopScrollButton({ onToggle }: StopScrollButtonProps) {
  const [stopped, setStopped] = useState(false)

  const handleToggle = () => {
    const newState = !stopped
    setStopped(newState)
    onToggle(newState)

    if (newState) {
      // Se estiver parando o scroll, apenas alterar a opacidade
      const feedElement = document.getElementById("meme-feed")
      if (feedElement) {
        feedElement.style.opacity = "0.5"
        feedElement.style.pointerEvents = "none"
      }
    } else {
      // Se estiver retomando o scroll, restaurar opacidade
      const feedElement = document.getElementById("meme-feed")
      if (feedElement) {
        feedElement.style.opacity = "1"
        feedElement.style.pointerEvents = "auto"
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <Button
        className="rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
        size="icon"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      <Button
        className={`rounded-full shadow-lg ${
          stopped ? "bg-green-600 hover:bg-green-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
        size="icon"
        onClick={handleToggle}
      >
        {stopped ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
      </Button>
    </div>
  )
}

export default StopScrollButton
