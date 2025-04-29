export interface AdSlot {
  id: string
  name: string
  description: string
  format: string
  width: number
  height: number
}

export const adSlots: Record<string, AdSlot> = {
  horizontal: {
    id: "1234567890", // Substitua pelo seu ID de slot real
    name: "Banner Horizontal",
    description: "Banner horizontal para o topo ou meio da página",
    format: "banner",
    width: 728,
    height: 90,
  },
  sidebar: {
    id: "0987654321", // Substitua pelo seu ID de slot real
    name: "Sidebar Retangular",
    description: "Anúncio retangular para a barra lateral",
    format: "rectangle",
    width: 300,
    height: 250,
  },
  inFeed: {
    id: "1122334455", // Substitua pelo seu ID de slot real
    name: "In-Feed",
    description: "Anúncio nativo para inserção no feed de conteúdo",
    format: "in-feed",
    width: 468,
    height: 60,
  },
  popup: {
    id: "5544332211", // Substitua pelo seu ID de slot real
    name: "Pop-up",
    description: "Anúncio em formato pop-up",
    format: "popup",
    width: 300,
    height: 250,
  },
}

export const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"
export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""

export const isAdSenseEnabled = () => {
  return process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"
}
