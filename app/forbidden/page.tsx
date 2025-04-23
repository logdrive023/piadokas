"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, Lock } from "lucide-react"
import Link from "next/link"

export default function Forbidden() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[80vh] py-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <Lock className="h-24 w-24 text-red-500 opacity-50" />
          </div>
          <Image
            src="/surprised-at-pump.png"
            alt="Pessoa surpresa"
            fill
            className="object-contain opacity-75"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold mb-4 text-white">Acesso Negado</h1>

        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <p className="text-xl mb-4 text-gray-300">Você não tem permissão para acessar esta página</p>
          <p className="text-gray-400 mb-6">
            Esta área é restrita ou requer privilégios especiais. Se você acredita que deveria ter acesso, entre em
            contato com o administrador.
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

        <div className="text-gray-500 text-sm">Erro 403 | Acesso Negado</div>
      </div>
    </div>
  )
}
