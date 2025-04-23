"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-64px)] py-8">
      <div className="max-w-md w-full px-4">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/surprised-cat-computer.png"
            alt="Gato surpreso olhando para o computador"
            fill
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-white">Oops! Página não encontrada</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <p className="text-xl mb-4 text-gray-300">Parece que você encontrou um meme que não existe...</p>
          <p className="text-gray-400 mb-6">
            A página que você está procurando pode ter sido removida, renomeada ou está temporariamente indisponível.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="flex items-center gap-2 border-gray-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>

            <Link href="/">
              <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 w-full">
                <Home className="h-4 w-4" />
                Página Inicial
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-gray-500 text-sm">Erro 404 | Página não encontrada</div>
      </div>
    </div>
  )
}
