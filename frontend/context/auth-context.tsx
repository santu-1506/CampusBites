"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode";

type User = {
  id: string
  name: string
  email?: string
  role: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  loginWithToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // This needs to be implemented to call the backend and get a token
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const user = {
            id: "user_123",
            name: "John Doe",
            email: email,
            role: "student"
          }
          const fakeToken = "fake-jwt-token";
          setUser(user)
          setToken(fakeToken);
          localStorage.setItem("token", fakeToken)
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // This needs to be implemented to call the backend and get a token
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const user = {
            id: "user_" + Math.random().toString(36).substr(2, 9),
            name: name,
            email: email,
            role: "student"
          }
          const fakeToken = "fake-jwt-token-register";
          setUser(user)
          setToken(fakeToken);
          localStorage.setItem("token", fakeToken)
          resolve()
        } else {
          reject(new Error("Invalid registration data"))
        }
      }, 1000)
    })
  }

  const loginWithToken = (token: string) => {
    try {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    setUser(null)
    setToken(null);
    localStorage.removeItem("token")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        token,
        login,
        register,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
