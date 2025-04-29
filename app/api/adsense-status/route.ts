import { NextResponse } from "next/server"

export async function GET() {
  // Verificar se o AdSense está habilitado
  const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true"

  // Obter o ID do cliente AdSense
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || null

  // Verificar se estamos em ambiente de produção
  const isProduction = process.env.NODE_ENV === "production"

  return NextResponse.json({
    enabled,
    clientId,
    isProduction,
  })
}
