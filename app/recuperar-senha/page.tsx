"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Send, CheckCircle2, LinkIcon } from "lucide-react"
import Link from "next/link"

// Importar a função de API mock no topo do arquivo
import { forgotPasswordApi } from "@/lib/api-mock-auth"

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Substituir a função handleSubmit existente por:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await forgotPasswordApi(email)

      // Mesmo que falhe, não mostramos erro para não revelar quais emails existem
      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password recovery failed:", error)
      setIsSubmitting(false)
      setIsSubmitted(true) // Ainda mostramos como sucesso por segurança
    }
  }

  // URL de exemplo para teste
  const exampleResetUrl = `${window.location.origin}/redefinicao-senha?token=abc123`

  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/usuario" className="inline-flex items-center text-purple-400 hover:text-purple-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para o login</span>
            </Link>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recuperar senha</CardTitle>
              <CardDescription>Digite seu email para receber um link de recuperação de senha.</CardDescription>
            </CardHeader>

            {isSubmitted ? (
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Email enviado!</h3>
                  <p className="text-gray-300 mb-4">
                    Se houver uma conta associada a este email, você receberá um link para redefinir sua senha.
                  </p>
                  <p className="text-gray-400 text-sm mb-6">Verifique sua caixa de entrada e pasta de spam.</p>

                  {/* Link de exemplo para teste */}
                  <div className="bg-gray-700 p-4 rounded-md text-left mb-4">
                    <p className="text-sm text-yellow-300 mb-2 flex items-center">
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Link de teste (apenas para demonstração):
                    </p>
                    <Link href={exampleResetUrl} className="text-xs text-blue-400 hover:underline break-all">
                      {exampleResetUrl}
                    </Link>
                  </div>
                </div>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Enviar link de recuperação
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
