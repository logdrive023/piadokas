"use client"

import { redirect } from "next/navigation"
import { useAuth } from "./auth-context"

// Função para verificar se o usuário está autenticado e redirecionar se não estiver
export function requireAuth() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    redirect("/forbidden")
  }
}

// Função para verificar se o usuário é administrador e redirecionar se não for
export function requireAdmin() {
  const { isLoggedIn, user } = useAuth()

  if (!isLoggedIn || !user?.isAdmin) {
    redirect("/forbidden")
  }
}
