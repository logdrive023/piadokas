"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Shield, LogOut, User, PlusCircle, Trophy, Heart, Mail, LogIn } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { NotificationBell } from "@/components/notification-bell"
import { SearchBar } from "@/components/search-bar"
import LinkWithLoading from "./link-with-loading"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SiteHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <LinkWithLoading href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-white">
              Pi<span className="text-purple-500">Adokas</span>
            </span>
          </LinkWithLoading>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {showSearch ? (
            <SearchBar onClose={() => setShowSearch(false)} />
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-gray-400">
              <Search className="h-4 w-4" />
            </Button>
          )}

          <NotificationBell />

          <nav className="hidden md:flex items-center space-x-2">
            <LinkWithLoading href="/create" className="text-sm font-medium">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white">
                Criar Post
              </Button>
            </LinkWithLoading>
            <LinkWithLoading href="/rankings" className="text-sm font-medium">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Rankings
              </Button>
            </LinkWithLoading>
            <LinkWithLoading href="/donate" className="text-sm font-medium">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Doar
              </Button>
            </LinkWithLoading>
            <LinkWithLoading href="/contato" className="text-sm font-medium">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                Contato
              </Button>
            </LinkWithLoading>
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
                      {user?.isAdmin && <Shield className="h-3.5 w-3.5" />}
                      {user?.username || "Minha Conta"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                    {user?.isAdmin && (
                      <DropdownMenuItem className="text-white hover:bg-gray-700 cursor-pointer" asChild>
                        <LinkWithLoading href="/admin">
                          <Shield className="h-4 w-4 mr-2 text-amber-500" />
                          Painel Admin
                        </LinkWithLoading>
                      </DropdownMenuItem>
                    )}
                    {!user?.isAdmin && (
                      <DropdownMenuItem className="text-white hover:bg-gray-700 cursor-pointer" asChild>
                        <LinkWithLoading href={`/user/${user?.id}`}>
                          <User className="h-4 w-4 mr-2 text-blue-400" />
                          Meu Perfil
                        </LinkWithLoading>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-white hover:bg-gray-700 cursor-pointer" onClick={() => logout()}>
                      <LogOut className="h-4 w-4 mr-2 text-red-400" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {user?.isAdmin && <Badge className="bg-amber-600 text-white">Admin</Badge>}
              </div>
            ) : (
              <LinkWithLoading href="/usuario">
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
                  Entrar
                </Button>
              </LinkWithLoading>
            )}
          </nav>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-400">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-800 text-white border-gray-700">
              <div className="grid gap-4 py-4">
                {isLoggedIn && user?.isAdmin && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-amber-600">Administrador</Badge>
                      <span className="text-sm text-gray-300">{user.email}</span>
                    </div>
                    <LinkWithLoading
                      href="/admin"
                    >
                      <Shield className="h-4 w-4" />
                      Painel de Administração
                    </LinkWithLoading>
                    <div className="h-px bg-gray-700" />
                  </>
                )}
                <LinkWithLoading
                  href="/create"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  Criar Post
                </LinkWithLoading>
                <div className="h-px bg-gray-700" />
                <LinkWithLoading
                  href="/rankings"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                  <Trophy className="h-4 w-4" />
                  Rankings
                </LinkWithLoading>
                <div className="h-px bg-gray-700" />
                <LinkWithLoading
                  href="/donate"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                  <Heart className="h-4 w-4" />
                  Doar
                </LinkWithLoading>
                <div className="h-px bg-gray-700" />
                <LinkWithLoading
                  href="/contato"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  Contato
                </LinkWithLoading>
                <div className="h-px bg-gray-700" />
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-sm text-gray-300">{user?.username || "Minha Conta"}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => logout()}
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Sair
                      </Button>
                    </div>
                    {!user?.isAdmin && (
                      <LinkWithLoading
                        href={`/user/${user?.id}`}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                      >
                        <User className="h-4 w-4 mr-1" />
                        Meu Perfil
                      </LinkWithLoading>
                    )}
                  </>
                ) : (
                  <LinkWithLoading
                    href="/usuario"
                    className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </LinkWithLoading>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
