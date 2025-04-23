"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Facebook, X, Linkedin, Send, Copy, Check, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ShareButtonsProps {
  url: string
  title: string
  compact?: boolean
}

export function ShareButtons({ url, title, compact = false }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (compact) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Share2 className="h-4 w-4 mr-1" />
            <span>Compartilhar</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-white hover:bg-gray-700"
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}
          >
            <Facebook className="h-4 w-4 mr-2 text-blue-500" />
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-white hover:bg-gray-700"
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, "_blank")}
          >
            <X className="h-4 w-4 mr-2 text-blue-400" />
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-white hover:bg-gray-700"
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank")}
          >
            <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
            LinkedIn
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-white hover:bg-gray-700"
            onClick={() => window.open(`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`, "_blank")}
          >
            <Send className="h-4 w-4 mr-2 text-blue-300" />
            Telegram
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center cursor-pointer text-white hover:bg-gray-700"
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-500" />
                Link copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2 text-gray-400" />
                Copiar link
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        className="bg-blue-600 hover:bg-blue-700 text-white border-blue-700"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, "_blank")}
      >
        <Facebook className="h-4 w-4 mr-2" />
        Facebook
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-blue-400 hover:bg-blue-500 text-white border-blue-500"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, "_blank")}
      >
        <X className="h-4 w-4 mr-2" />
        Twitter
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-blue-700 hover:bg-blue-800 text-white border-blue-800"
        onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, "_blank")}
      >
        <Linkedin className="h-4 w-4 mr-2" />
        LinkedIn
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 text-white border-blue-600"
        onClick={() => window.open(`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`, "_blank")}
      >
        <Send className="h-4 w-4 mr-2" />
        Telegram
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`${copied ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600"} text-white border-gray-600`}
        onClick={handleCopyLink}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 mr-2" />
            Copiado!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copiar link
          </>
        )}
      </Button>
    </div>
  )
}

export default ShareButtons
