import type { Metadata } from "next"
import AdSenseManager from "@/components/adsense-manager"

export const metadata: Metadata = {
  title: "Configuração do AdSense | Painel de Administração",
  description: "Gerencie as configurações do Google AdSense para o site",
}

export default function AdSensePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Configuração do Google AdSense</h1>
      <div className="grid gap-6">
        <AdSenseManager />
      </div>
    </div>
  )
}
