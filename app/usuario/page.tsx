"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { usePopup } from "@/components/popup-provider"
import TermsPopup from "@/components/terms-popup"
import PrivacyPopup from "@/components/privacy-popup"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function UserPage() {
  const { showPopup, hidePopup } = usePopup()
  const [activeTab, setActiveTab] = useState("login")
  const { login, register, isLoggedIn } = useAuth()
  const router = useRouter()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if already logged in
  if (isLoggedIn && typeof window !== "undefined") {
    router.push("/")
    return null
  }

  const showTermsPopup = () => {
    showPopup(<TermsPopup onClose={() => hidePopup()} />)
  }

  const showPrivacyPopup = () => {
    showPopup(<PrivacyPopup onClose={() => hidePopup()} />)
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const success = await login(loginData.email, loginData.password)
      if (success) {
        router.push("/")
      } else {
        setError("Email ou senha inválidos.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao fazer login. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("As senhas não coincidem.")
      return
    }

    if (!registerData.acceptTerms) {
      setError("Você precisa aceitar os termos de uso e política de privacidade.")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await register(registerData.username, registerData.email, registerData.password)

      if (success) {
        // Mostrar modal de agradecimento em vez de redirecionar imediatamente
        setShowSuccessModal(true)
        // Limpar o formulário
        setRegisterData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        })
      } else {
        setError("Não foi possível criar sua conta. Tente novamente.")
      }
    } catch (err) {
      setError("Ocorreu um erro ao registrar. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Adicionar função para fechar a modal e mudar para a aba de login
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setActiveTab("login")
    // Rolar para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Adicionar função para rolar para o topo quando mudar de aba
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Rolar para o topo da página
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Voltar para a página inicial</span>
            </Link>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mb-4 bg-red-900/20 border-red-800">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="login">
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="email-login">Email</Label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password-login">Senha</Label>
                      <Link href="/recuperar-senha">
                        <Button variant="link" className="text-xs text-purple-400 p-0 h-auto">
                          Esqueceu a senha?
                        </Button>
                      </Link>
                    </div>
                    <Input
                      id="password-login"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={loginData.remember}
                      onCheckedChange={(checked) => setLoginData({ ...loginData, remember: checked as boolean })}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                    >
                      Lembrar de mim
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                  </Button>

                  <div className="text-center text-sm text-gray-400">
                    Não tem uma conta?{" "}
                    <Button
                      variant="link"
                      className="text-purple-400 p-0 h-auto"
                      onClick={() => handleTabChange("register")}
                    >
                      Cadastre-se
                    </Button>
                  </div>

                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-center text-xs text-gray-500 mb-2">Credenciais de administrador para teste:</p>
                    <div className="bg-gray-700 p-2 rounded text-xs text-gray-300 font-mono">
                      <div>Email: admin@admin.com</div>
                      <div>Senha: senha1234</div>
                    </div>
                  </div>

                  <div className="border-t border-gray-700 pt-4 mt-4">
                    <p className="text-center text-xs text-gray-500 mb-2">Credenciais de usuário regular para teste:</p>
                    <div className="bg-gray-700 p-2 rounded text-xs text-gray-300 font-mono">
                      <div>Email: usuario@teste.com</div>
                      <div>Senha: senha123</div>
                    </div>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="seunome123"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={registerData.username}
                      onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-register">Email</Label>
                    <Input
                      id="email-register"
                      type="email"
                      placeholder="seu@email.com"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-register">Senha</Label>
                    <Input
                      id="password-register"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-confirm">Confirmar senha</Label>
                    <Input
                      id="password-confirm"
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-700 border-gray-600 text-white"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      className="mt-1"
                      checked={registerData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setRegisterData({ ...registerData, acceptTerms: checked as boolean })
                      }
                      required
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
                      >
                        Eu li e aceito os{" "}
                        <button type="button" className="text-purple-400 hover:underline" onClick={showTermsPopup}>
                          Termos de Uso
                        </button>{" "}
                        e{" "}
                        <button type="button" className="text-purple-400 hover:underline" onClick={showPrivacyPopup}>
                          Política de Privacidade
                        </button>
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Criando conta..." : "Criar conta"}
                  </Button>

                  <div className="text-center text-sm text-gray-400">
                    Já tem uma conta?{" "}
                    <Button
                      variant="link"
                      className="text-purple-400 p-0 h-auto"
                      onClick={() => handleTabChange("login")}
                    >
                      Faça login
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modal de sucesso após cadastro */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Cadastro realizado com sucesso!</h3>
              <p className="text-gray-300 mb-6">
                Obrigado por se cadastrar no PiAdokas! Sua conta foi criada com sucesso.
              </p>
              <Button onClick={handleCloseSuccessModal} className="bg-purple-600 hover:bg-purple-700 text-white">
                Fazer login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
