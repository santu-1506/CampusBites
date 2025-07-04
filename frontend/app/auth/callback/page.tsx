"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { loginWithToken } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const processedRef = useRef(false)

  useEffect(() => {
    // Prevent processing multiple times
    if (processedRef.current || isProcessing) {
      return
    }

    const processAuth = async () => {
      try {
        processedRef.current = true
        setIsProcessing(true)
        
        const token = searchParams.get("token")
        console.log("Token received:", token ? "Yes" : "No")
        
        if (token) {
          console.log("Attempting to login with token...")
          loginWithToken(token)
          
          // Wait a bit for the context to update, then redirect
          setTimeout(() => {
            router.push("/menu")
          }, 1000)
        } else {
          console.error("No token found in URL")
          setError("No authentication token received")
          setTimeout(() => router.push("/login"), 3000)
        }
      } catch (err) {
        console.error("Error in auth callback:", err)
        setError("Authentication failed")
        setTimeout(() => router.push("/login"), 3000)
      }
    }

    processAuth()
  }, []) // Empty dependency array to run only once

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-semibold text-red-500">Authentication Error</h1>
          <p className="text-gray-400">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-orange-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold">Authenticating...</h1>
        <p className="text-gray-400">Please wait while we log you in.</p>
      </div>
    </div>
  )
} 