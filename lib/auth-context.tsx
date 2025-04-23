"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

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

  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call to authenticate
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Check for admin user
      if (email === "admin@admin.com" && password === "senha1234") {
        setIsLoggedIn(true)
        setUser({
          id: "admin-1",
          username: "Administrador",
          email: "admin@admin.com",
          avatar: "/admin-avatar.png",
          isAdmin: true,
        })
        return true
      }

      // Check for test user
      if (email === "usuario@teste.com" && password === "senha123") {
        setIsLoggedIn(true)
        setUser({
          id: "user-test",
          username: "UsuarioTeste",
          email: "usuario@teste.com",
          avatar: "/abstract-user-icon.png",
          isAdmin: false,
        })
        return true
      }

      // Mock successful login for regular users
      setIsLoggedIn(true)

      // Extract username from email
      const username = email.split("@")[0]

      setUser({
        id: "user-1",
        username: username,
        email: email,
        avatar: "/abstract-user-icon.png",
        isAdmin: false,
      })
      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  // Mock register function
  const register = async (username: string, email: string, password: string) => {
    // In a real app, this would make an API call to register
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock successful registration and auto-login
      setIsLoggedIn(true)
      setUser({
        id: "user-" + Date.now(),
        username: username,
        email: email,
        avatar: "/abstract-user-icon.png",
        isAdmin: false,
      })
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  // Logout function
  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>{children}</AuthContext.Provider>
}

export default AuthProvider
