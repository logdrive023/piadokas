"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HorizontalAd } from "@/components/horizontal-ad"
import { Bitcoin, Coins, Copy, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DonatePage() {
  const cryptoWallets = [
    { name: "Bitcoin (BTC)", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", icon: "bitcoin" },
    { name: "Ethereum (ETH)", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", icon: "ethereum" },
    { name: "Binance Coin (BNB)", address: "bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23", icon: "bnb" },
    { name: "Solana (SOL)", address: "7owK36xtnD5D4J8txw8MzB8L1kGNULaWxmz9KGdXgCnE", icon: "solana" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Endereço copiado para a área de transferência!")
  }

  return (
    <div className="flex justify-center">
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Apoie o PiAdokas</h1>
        </div>

        <div className="text-center mb-12">
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sua doação ajuda a manter nossa plataforma funcionando e livre de anúncios excessivos. Agradecemos qualquer
            contribuição!
          </p>
        </div>

        <HorizontalAd className="mb-8" />

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-6 w-6" />
                Doação em Criptomoedas
              </CardTitle>
              <CardDescription>Envie criptomoedas diretamente para nossas carteiras</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {cryptoWallets.map((wallet, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {wallet.icon === "bitcoin" && <Bitcoin className="h-6 w-6 text-yellow-500" />}
                        {wallet.icon === "ethereum" && (
                          <Image src="/ethereum-crystal.png" width={24} height={24} alt="Ethereum" />
                        )}
                        {wallet.icon === "bnb" && (
                          <Image src="/binance-coin-logo.png" width={24} height={24} alt="BNB" />
                        )}
                        {wallet.icon === "solana" && (
                          <Image src="/abstract-solana.png" width={24} height={24} alt="Solana" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{wallet.name}</h3>
                      <p className="text-sm text-muted-foreground break-all">{wallet.address}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="flex-shrink-0"
                      onClick={() => copyToClipboard(wallet.address)}
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copiar endereço</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <HorizontalAd className="my-8" />

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Por que doar?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-4">
                  O PiAdokas é uma plataforma dedicada a trazer alegria e diversão através de memes e conteúdo
                  humorístico. Mantemos a plataforma com o mínimo de anúncios possível para garantir a melhor
                  experiência aos usuários.
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-4">Suas doações ajudam a:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-purple-400 mb-2">Manter os servidores funcionando</h4>
                    <p className="text-gray-300">
                      Seus recursos ajudam a cobrir os custos de hospedagem e infraestrutura necessários para manter o
                      site rápido e estável.
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-blue-400 mb-2">Desenvolver novos recursos</h4>
                    <p className="text-gray-300">
                      Suas contribuições permitem que continuemos inovando e adicionando novas funcionalidades para
                      melhorar sua experiência.
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-green-400 mb-2">Melhorar a experiência do usuário</h4>
                    <p className="text-gray-300">
                      Investimos em design e usabilidade para tornar a navegação mais intuitiva e agradável para todos.
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="text-lg font-medium text-amber-400 mb-2">Reduzir a dependência de anúncios</h4>
                    <p className="text-gray-300">
                      Com seu apoio, podemos minimizar a quantidade de publicidade e manter o conteúdo como
                      protagonista.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-800 rounded-lg p-6 text-center">
                  <p className="text-xl text-white mb-2">
                    Agradecemos imensamente qualquer contribuição, independentemente do valor.
                  </p>
                  <p className="text-lg text-purple-300">
                    Cada doação faz diferença para manter nossa comunidade ativa e saudável!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <HorizontalAd className="mt-8" />
      </div>
    </div>
  )
}
