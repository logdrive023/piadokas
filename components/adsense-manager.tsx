"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { adSlots } from "@/lib/adsense-config"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Copy, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdSenseStatus {
  enabled: boolean
  clientId: string | null
  isProduction: boolean
}

export function AdSenseManager() {
  const [status, setStatus] = useState<AdSenseStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchAdSenseStatus()
  }, [])

  const fetchAdSenseStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/adsense-status")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      console.error("Erro ao buscar status do AdSense:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar as configurações do AdSense",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copiado!",
      description: "Texto copiado para a área de transferência",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Configurações do AdSense</CardTitle>
          <CardDescription>Carregando informações...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Status do AdSense</CardTitle>
              <CardDescription>Configuração atual do Google AdSense</CardDescription>
            </div>
            <Button variant="outline" size="icon" onClick={fetchAdSenseStatus}>
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Atualizar</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Status</div>
                <div className="flex items-center gap-2">
                  {status?.enabled ? (
                    <>
                      <Badge variant="success" className="bg-green-500">
                        Ativo
                      </Badge>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </>
                  ) : (
                    <>
                      <Badge variant="destructive">Desativado</Badge>
                      <AlertCircle className="h-4 w-4 text-destructive" />
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Ambiente</div>
                <div>
                  {status?.isProduction ? (
                    <Badge variant="default">Produção</Badge>
                  ) : (
                    <Badge variant="outline">Desenvolvimento</Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">ID do Cliente</div>
              <div className="flex items-center gap-2">
                <code className="relative rounded bg-muted px-[0.5rem] py-[0.3rem] font-mono text-sm">
                  {status?.clientId || "Não configurado"}
                </code>
                {status?.clientId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(status.clientId || "")}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar ID do cliente</span>
                  </Button>
                )}
              </div>
            </div>

            {!status?.enabled && (
              <div className="rounded-md bg-amber-500/15 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-500">Atenção</h3>
                    <div className="mt-2 text-sm text-amber-500">
                      <p>
                        O AdSense está desativado. Configure a variável de ambiente{" "}
                        <code className="bg-amber-500/20 px-1 py-0.5 rounded">NEXT_PUBLIC_ADSENSE_ENABLED</code> como{" "}
                        <code className="bg-amber-500/20 px-1 py-0.5 rounded">true</code> para ativar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {status?.enabled && !status?.clientId && (
              <div className="rounded-md bg-destructive/15 p-4 mt-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-destructive">Erro de configuração</h3>
                    <div className="mt-2 text-sm text-destructive">
                      <p>
                        O AdSense está ativado, mas o ID do cliente não está configurado. Configure a variável de
                        ambiente{" "}
                        <code className="bg-destructive/20 px-1 py-0.5 rounded">NEXT_PUBLIC_ADSENSE_CLIENT_ID</code>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Slots de Anúncios</CardTitle>
          <CardDescription>Slots de anúncios configurados na aplicação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(adSlots).length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">Nenhum slot de anúncio configurado</div>
            ) : (
              <div className="grid gap-4">
                {Object.entries(adSlots).map(([key, slot]) => (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <div className="font-medium">{slot.name}</div>
                      <div className="text-sm text-muted-foreground">{slot.description}</div>
                      <code className="text-xs bg-muted px-1 py-0.5 rounded mt-1 inline-block">{slot.id}</code>
                    </div>
                    <div className="text-sm">
                      <div className="text-muted-foreground">
                        {slot.width}x{slot.height}
                      </div>
                      <Badge variant="outline" className="mt-1">
                        {slot.format}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Total de slots: <span className="font-medium">{Object.keys(adSlots).length}</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => copyToClipboard(JSON.stringify(adSlots, null, 2))}>
            <Copy className="h-4 w-4 mr-2" />
            Exportar configuração
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instruções de Implementação</CardTitle>
          <CardDescription>Como adicionar anúncios nas páginas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Anúncio Horizontal</h3>
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { HorizontalAd } from "@/components/horizontal-ad"

// Na sua página ou componente
<HorizontalAd />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Anúncio na Barra Lateral</h3>
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { SidebarAd } from "@/components/sidebar-ad"

// Na sua página ou componente
<SidebarAd />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Anúncio no Feed</h3>
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { InFeedAd } from "@/components/in-feed-ad"

// Na sua página ou componente
<InFeedAd />`}</code>
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Anúncio Personalizado</h3>
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  <code>{`import { AdSenseAd } from "@/components/adsense-ad"

// Na sua página ou componente
<AdSenseAd slotId="seu-slot-id" style={{ width: 300, height: 250 }} />`}</code>
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdSenseManager
