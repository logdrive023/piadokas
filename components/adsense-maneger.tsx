"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"

interface AdSenseStatus {
  enabled: boolean
  clientId: string | null
  message: string
}

export default function AdSenseManager() {
  const [status, setStatus] = useState<AdSenseStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/adsense-status")

        if (!response.ok) {
          throw new Error("Falha ao obter status do AdSense")
        }

        const data = await response.json()
        setStatus(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido")
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Google AdSense</CardTitle>
          <CardDescription>Carregando informações...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configuração do Google AdSense</CardTitle>
          <CardDescription>Ocorreu um erro ao carregar as informações</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração do Google AdSense</CardTitle>
        <CardDescription>Gerencie as configurações de anúncios do Google AdSense</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status && (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="adsense-status">Status do AdSense</Label>
                <p className="text-sm text-muted-foreground">{status.enabled ? "Ativado" : "Desativado"}</p>
              </div>
              <Switch id="adsense-status" checked={status.enabled} disabled={true} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client-id">ID do Cliente (ca-pub-XXXXXXXXXX)</Label>
              <Input id="client-id" value={status.clientId || ""} placeholder="ca-pub-XXXXXXXXXX" disabled={true} />
              <p className="text-xs text-muted-foreground">
                Para alterar estas configurações, atualize as variáveis de ambiente no painel de controle do Vercel.
              </p>
            </div>

            <Alert variant={status.enabled ? "default" : "destructive"} className="mt-4">
              {status.enabled ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <AlertTitle>{status.enabled ? "AdSense Configurado" : "AdSense Desativado"}</AlertTitle>
              <AlertDescription>
                {status.message}
                {!status.enabled && (
                  <p className="mt-2">
                    Para ativar o AdSense, defina as variáveis de ambiente NEXT_PUBLIC_ADSENSE_ENABLED=true e
                    NEXT_PUBLIC_ADSENSE_CLIENT_ID no painel de controle do Vercel.
                  </p>
                )}
              </AlertDescription>
            </Alert>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button disabled={true}>Salvar Alterações</Button>
      </CardFooter>
    </Card>
  )
}
