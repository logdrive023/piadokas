"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

// Importar as funções de API mock no topo do arquivo
import { loginApi, registerApi } from "@/lib/api-mock-auth"

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  isAdmin?: boolean
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const { toast } = useToast()

  // Mock login function
  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi({ email, password })

      if (response.success && response.user) {
        setIsLoggedIn(true)
        setUser(response.user)
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  // Mock register function
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await registerApi({ username, email, password })

      if (response.success && response.user) {
        setIsLoggedIn(true)
        setUser(response.user)
        return true
      }

      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado da sua conta",
    })
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
