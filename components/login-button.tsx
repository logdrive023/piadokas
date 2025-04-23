"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"

export function LoginButton() {
  const { isLoggedIn, logout, user } = useAuth()

  if (isLoggedIn && user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/usuario">
          <Button variant="ghost" size="sm">
            {user.username}
          </Button>
        </Link>
        <Button variant="outline" size="sm" onClick={logout}>
          Sair
        </Button>
      </div>
    )
  }

  return (
    <Link href="/usuario">
      <Button size="sm">Entrar</Button>
    </Link>
  )
}
