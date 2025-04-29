import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check if AdSense is enabled
    const isEnabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"
    const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""

    // Return the status
    return NextResponse.json({
      enabled: isEnabled,
      clientId: isEnabled ? clientId : null,
      message: isEnabled ? "AdSense está ativado e configurado" : "AdSense está desativado ou não configurado",
    })
  } catch (error) {
    console.error("Erro ao verificar status do AdSense:", error)
    return NextResponse.json({ error: "Erro ao verificar status do AdSense" }, { status: 500 })
  }
}
