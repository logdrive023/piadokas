"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import Image from "next/image"

interface CryptoWallet {
  name: string
  address: string
  icon: string
  color: string
}

export function CryptoDonationSection() {
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null)

  const wallets: CryptoWallet[] = [
    {
      name: "Bitcoin",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      icon: "/bitcoin-symbol-gold.png",
      color: "bg-orange-500",
    },
    {
      name: "Ethereum",
      address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      icon: "/ethereum-crystal.png",
      color: "bg-blue-500",
    },
    {
      name: "Binance",
      address: "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23",
      icon: "/binance-coin-logo.png",
      color: "bg-yellow-500",
    },
    {
      name: "Solana",
      address: "5XpXfHT3Xos8T9EnhSpSFZ5XmHHx5WJ6Vg5LPkPYc2o2",
      icon: "/abstract-solana.png",
      color: "bg-purple-500",
    },
  ]

  const copyToClipboard = (address: string, name: string) => {
    navigator.clipboard.writeText(address)
    setCopiedWallet(name)
    setTimeout(() => setCopiedWallet(null), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Doe com Criptomoedas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div key={wallet.name} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full ${wallet.color} flex items-center justify-center`}>
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={16} height={16} />
                </div>
                <span className="font-medium text-sm">{wallet.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs"
                onClick={() => copyToClipboard(wallet.address, wallet.name)}
              >
                {copiedWallet === wallet.name ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default CryptoDonationSection
