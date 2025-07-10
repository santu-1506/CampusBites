"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Gift } from "lucide-react"

const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function RegisterPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true)
    try {
      await register(values.name, values.email, values.password)
      toast({
        title: "Welcome to Campus Bites! 🎉",
        description: "Your account has been created successfully",
      }) 
      router.push("/menu")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An error occurred during registration. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] via-[#1e3a5f] to-[#0f172a] flex items-center justify-center relative overflow-hidden">
      {/* Professional Navy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse delay-2000"></div>

        {/* Floating Food Icons */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center animate-float">
          <span className="text-2xl">🎂</span>
        </div>
        <div className="absolute top-40 left-32 w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center animate-float-delayed">
          <span className="text-xl">🥤</span>
        </div>
        <div className="absolute bottom-32 right-16 w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center animate-bounce-slow">
          <span className="text-xl">🍜</span>
        </div>
        <div className="absolute bottom-20 left-20 w-10 h-10 bg-pink-500/10 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-lg">🍰</span>
        </div>
      </div>

      <div className="flex w-full max-w-6xl mx-auto relative z-10">
        {/* Left Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl animate-slide-in-left">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Join Campus Bites!</h2>
                <p className="text-slate-300">
                  Already have an account?{" "}
                  <Link href="/login" className="text-red-400 hover:text-red-300 font-medium transition-colors">
                    Sign in here
                  </Link>
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" suppressHydrationWarning>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your full name"
                              autoComplete="name"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl h-12 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                              placeholder="Enter your email"
                              type="email"
                              autoComplete="email"
                              className="pl-10 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl h-12 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                              placeholder="Create a password"
                              type={showPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl h-12 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input
                              placeholder="Confirm your password"
                              type={showConfirmPassword ? "text" : "password"}
                              autoComplete="new-password"
                              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-slate-400 rounded-xl h-12 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all backdrop-blur-sm"
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25 group"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white/10 backdrop-blur-xl px-4 text-slate-400">Or sign up with</span>
                  </div>
                </div>

                <div className="mt-6">
                  <a href="http://localhost:8080/api/auth/google" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238
	C43.021,36.697,44,34.0,44,30C44,22.659,43.862,21.35,43.611,20.083z" />
                      </svg>
                      Sign up with Google
                    </Button>
                  </a>
                </div>
              </div>

              <p className="mt-6 text-xs text-center text-slate-500">
                By creating an account, you agree to our{" "}
                <Link href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-red-400 hover:text-red-300 transition-colors">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 relative">
          <div className="text-center animate-slide-in-right">
            {/* Special Offer */}
            <div className="mb-8 p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Bonus!</h2>
              <p className="text-red-300 font-semibold text-lg">Get 20% OFF on your first order</p>
              <p className="text-slate-400 text-sm mt-2">Plus free delivery for your first month</p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Instant Access</h3>
                  <p className="text-slate-400 text-sm">Start ordering immediately after signup</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">💎</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Premium Features</h3>
                  <p className="text-slate-400 text-sm">Order tracking, favorites, and more</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Loyalty Rewards</h3>
                  <p className="text-slate-400 text-sm">Earn points with every order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
