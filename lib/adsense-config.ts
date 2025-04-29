export interface AdSlot {
    id: string
    name: string
    description: string
  }
  
  export const AD_SLOTS = {
    HORIZONTAL_BANNER: {
      id: "1234567890", // Replace with your actual AdSense slot ID
      name: "Horizontal Banner",
      description: "Banner horizontal para o feed principal",
    },
    SIDEBAR_SQUARE: {
      id: "0987654321", // Replace with your actual AdSense slot ID
      name: "Sidebar Square",
      description: "Anúncio quadrado para a barra lateral",
    },
    POPUP_AD: {
      id: "1122334455", // Replace with your actual AdSense slot ID
      name: "Popup Ad",
      description: "Anúncio popup",
    },
    IN_FEED: {
      id: "5566778899", // Replace with your actual AdSense slot ID
      name: "In-Feed Ad",
      description: "Anúncio entre os posts do feed",
    },
  }
  
  export const isAdSenseEnabled = () => {
    // Check if AdSense is enabled based on environment variables
    return !!process.env.NEXT_PUBLIC_ADSENSE_ENABLED && process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"
  }
  