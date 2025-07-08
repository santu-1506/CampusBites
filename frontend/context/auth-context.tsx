"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import { jwtDecode } from "jwt-decode";
import { User } from "@/types"

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

  const isTokenExpired = useCallback((token: string): boolean => {
    try {
      const decoded = jwtDecode<any>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      try {
        if (isTokenExpired(storedToken)) {
          console.log("Token has expired, removing from storage");
          localStorage.removeItem("token");
          setIsLoading(false);
          return;
        }
        
        const decoded = jwtDecode<User>(storedToken);
        setUser(decoded);
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false)
  }, [isTokenExpired])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.success && data.token) {
        const decoded = jwtDecode<User>(data.token);
        setUser(decoded);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          password, 
          role: 'student',
          campus: 'Main Campus' // You might want to make this dynamic
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.success && data.token) {
        const decoded = jwtDecode<User>(data.token);
        setUser(decoded);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }, [])

  const loginWithToken = useCallback((token: string) => {
    try {
      if (isTokenExpired(token)) {
        console.log("Cannot login with expired token");
        return;
      }
      
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }, [isTokenExpired]);

  const logout = useCallback(() => {
    setUser(null)
    setToken(null);
    localStorage.removeItem("token")
  }, []);

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
