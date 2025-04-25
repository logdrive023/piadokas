"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

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

  return (
    <Button
      className={`rounded-full shadow-lg ${
        stopped ? "bg-green-600 hover:bg-green-700 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
      }`}
      size="icon"
      onClick={handleToggle}
      title={stopped ? "Retomar rolagem" : "Pausar rolagem"}
    >
      {stopped ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <rect x="6" y="4" width="4" height="16" />
          <rect x="14" y="4" width="4" height="16" />
        </svg>
      )}
    </Button>
  )
}

export default StopScrollButton
