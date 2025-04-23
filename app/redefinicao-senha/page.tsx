"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, AlertCircle, CheckCircle2, Lock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

// Token válido para teste
const VALID_TOKEN = "abc123"

export default function RedefinicaoSenhaPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [isValidToken, setIsValidToken] = useState(false)
  const [isTokenChecked, setIsTokenChecked] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Verificar o token quando a página carrega
  useEffect(() => {
    // Simular verificação do token
    if (token === VALID_TOKEN) {
      setIsValidToken(true)
    } else {
      setIsValidToken(false)
    }
    setIsTokenChecked(true)
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validar senhas
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    setIsSubmitting(true)

    try {
      // Simular chamada de API para alterar a senha
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Sucesso
      setIsSuccess(true)

      // Redirecionar para a página de login após 3 segundos
      setTimeout(() => {
        router.push("/usuario")
      }, 3000)
    } catch (err) {
      setError("Ocorreu um erro ao redefinir sua senha. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Renderizar mensagem de carregamento enquanto verifica o token
  if (!isTokenChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    )
  }

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
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-purple-400" />
                Redefinir senha
              </CardTitle>
              <CardDescription>
                {isValidToken
                  ? "Digite sua nova senha para continuar."
                  : "O link de redefinição de senha é inválido ou expirou."}
              </CardDescription>
            </CardHeader>

            {!isValidToken ? (
              <CardContent className="pt-6">
                <Alert className="bg-red-900/20 border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">
                    O token de redefinição é inválido ou expirou. Por favor, solicite um novo link de redefinição de
                    senha.
                  </AlertDescription>
                </Alert>
                <div className="mt-6 text-center">
                  <Link href="/recuperar-senha">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Solicitar novo link</Button>
                  </Link>
                </div>
              </CardContent>
            ) : isSuccess ? (
              <CardContent className="pt-6">
                <div className="text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Senha alterada com sucesso!</h3>
                  <p className="text-gray-300 mb-4">
                    Sua senha foi redefinida. Você será redirecionado para a página de login em instantes.
                  </p>
                  <Link href="/usuario">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Ir para o login</Button>
                  </Link>
                </div>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert className="bg-red-900/20 border-red-800">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Nova senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                        Redefinindo...
                      </>
                    ) : (
                      "Redefinir senha"
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
