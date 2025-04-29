"use client"

import { useEffect } from "react"

export default function AdSenseScript() {
  useEffect(() => {
    try {
      // Load the AdSense script
      const script = document.createElement("script")
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      script.async = true
      script.crossOrigin = "anonymous"
      script.dataset.adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-xxxxxxxxxxxxxxxx"

      // Add the script to the document
      document.head.appendChild(script)

      // Initialize ads if window.adsbygoogle exists
      if (typeof window !== "undefined") {
        // @ts-ignore
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }

      return () => {
        // Clean up the script when component unmounts
        document.head.removeChild(script)
      }
    } catch (error) {
      console.error("Error loading AdSense script:", error)
    }
  }, [])

  return null
}
