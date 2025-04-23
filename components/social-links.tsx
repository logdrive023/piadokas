import { X, Facebook, Instagram, Youtube, Twitch, Github } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
        aria-label="Twitter"
      >
        <X className="h-4 w-4 text-white" />
      </a>
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="h-4 w-4 text-white" />
      </a>
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="h-4 w-4 text-white" />
      </a>
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
        aria-label="Youtube"
      >
        <Youtube className="h-4 w-4 text-white" />
      </a>
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors"
        aria-label="Twitch"
      >
        <Twitch className="h-4 w-4 text-white" />
      </a>
      <a
        href="#"
        className="w-9 h-9 bg-gray-800 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
        aria-label="Github"
      >
        <Github className="h-4 w-4 text-white" />
      </a>
    </div>
  )
}

export default SocialLinks
