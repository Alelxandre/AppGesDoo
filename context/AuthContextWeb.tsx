"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthState()
  }, [])

  const checkAuthState = async () => {
    try {
      // Utiliser localStorage au lieu d'AsyncStorage pour le web
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'authentification:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'une API call
      if (email === "test@test.com" && password === "password") {
        const userData: User = {
          id: "1",
          email,
          name: "Utilisateur Test",
        }
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        return true
      }
      return false
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return false
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Simulation d'une API call
      const userData: User = {
        id: Date.now().toString(),
        email,
        name,
      }
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      return true
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      localStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Erreur de déconnexion:", error)
    }
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider")
  }
  return context
}
