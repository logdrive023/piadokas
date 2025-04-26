"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"
import LinkWithLoading from "@/components/link-with-loading"
import { useToast } from "@/components/ui/use-toast"
import { fetchProfileData, updateProfileData, updatePassword, sendPasswordResetLink } from "@/lib/api-mock-settings"

export default function SettingsPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isProfileLoading, setIsProfileLoading] = useState(true)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const { toast } = useToast()

  // Carregar dados do perfil ao montar o componente
  useEffect(() => {
    const loadProfileData = async () => {
      setIsProfileLoading(true)
      try {
        const userId = "user-test" // Normalmente viria do contexto de autenticação
        const profileData = await fetchProfileData(userId)
        setUsername(profileData.username)
        setEmail(profileData.email)
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do perfil.",
          variant: "destructive",
        })
      } finally {
        setIsProfileLoading(false)
      }
    }

    loadProfileData()
  }, [toast])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const userId = "user-test" // Normalmente viria do contexto de autenticação
      const result = await updateProfileData(userId, {
        username,
        email,
      })

      if (result.success) {
        setSuccessMessage("Perfil atualizado com sucesso!")
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso!",
        })
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setErrorMessage(result.error || "Erro ao atualizar perfil.")
        toast({
          title: "Erro",
          description: result.error || "Erro ao atualizar perfil.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      setErrorMessage("Ocorreu um erro ao atualizar o perfil.")
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o perfil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    if (newPassword !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!")
      toast({
        title: "Erro",
        description: "As senhas não coincidem!",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const userId = "user-test" // Normalmente viria do contexto de autenticação
      const result = await updatePassword(userId, {
        currentPassword,
        newPassword,
      })

      if (result.success) {
        setSuccessMessage("Senha atualizada com sucesso!")
        toast({
          title: "Sucesso",
          description: "Senha atualizada com sucesso!",
        })
        setTimeout(() => setSuccessMessage(""), 3000)
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setErrorMessage(result.error || "Erro ao atualizar senha.")
        toast({
          title: "Erro",
          description: result.error || "Erro ao atualizar senha.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao atualizar senha:", error)
      setErrorMessage("Ocorreu um erro ao atualizar a senha.")
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a senha.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")

    try {
      const result = await sendPasswordResetLink(forgotPasswordEmail)

      if (result.success) {
        setShowForgotPassword(false)
        setForgotPasswordEmail("")
        toast({
          title: "Sucesso",
          description: "Link de redefinição de senha enviado para seu email.",
        })
      } else {
        setErrorMessage(result.error || "Erro ao enviar link de redefinição.")
        toast({
          title: "Erro",
          description: result.error || "Erro ao enviar link de redefinição.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error)
      setErrorMessage("Ocorreu um erro ao solicitar redefinição de senha.")
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao solicitar redefinição de senha.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <LinkWithLoading href={`/user/user-1`}>
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </LinkWithLoading>
        <h1 className="text-3xl font-bold">Configurações da Conta</h1>
      </div>

      {successMessage && (
        <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sucesso</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mb-6 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isProfileLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
        </div>
      ) : (
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="password">Senha</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <form onSubmit={handleProfileUpdate}>
                <CardHeader>
                  <CardTitle>Informações do Perfil</CardTitle>
                  <CardDescription>
                    Atualize suas informações de perfil aqui. Estas informações serão exibidas publicamente.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/diverse-user-profiles.png" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" type="button">
                      Alterar foto
                    </Button>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="username">Nome de usuário</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar alterações"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card>
              <form onSubmit={handlePasswordUpdate}>
                <CardHeader>
                  <CardTitle>Alterar Senha</CardTitle>
                  <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Senha atual</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="new-password">Nova senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 items-start">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Atualizando..." : "Atualizar senha"}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    Esqueci minha senha
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {showForgotPassword ? (
        <Card className="mt-6">
          <form onSubmit={handleForgotPassword}>
            <CardHeader>
              <CardTitle>Esqueci minha senha</CardTitle>
              <CardDescription>Informe seu email para receber um link de redefinição de senha.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="forgot-password-email">Email</Label>
                <Input
                  id="forgot-password-email"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setShowForgotPassword(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar link"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      ) : null}
    </div>
  )
}
