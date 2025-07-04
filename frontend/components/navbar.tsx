"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useMobile } from "@/hooks/use-mobile"
import { Menu, ShoppingCart, User, LogOut, Sparkles, Home, UtensilsCrossed, Package, Heart } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  const { cart } = useCart()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Menu", href: "/menu", icon: UtensilsCrossed },
    { name: "Orders", href: "/orders", icon: Package },
  ]

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-700/50"
          : "bg-gray-900/80 backdrop-blur-md border-b border-gray-800/30"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-red-500/5 animate-pulse"></div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative z-10">
        <div className="flex items-center">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 text-white hover:bg-gray-800/50 hover:scale-110 transition-all duration-300 rounded-xl"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900/95 backdrop-blur-xl border-gray-700">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-8 mt-4">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-1 mr-3 animate-pulse">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="Campus Bites Logo"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-bold text-lg bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                      Campus Bites
                    </span>
                  </div>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                          pathname === item.href
                            ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 text-white border border-orange-500/30"
                            : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-1 mr-3 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/25">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Campus Bites Logo"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-xl bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent group-hover:from-orange-300 group-hover:to-red-400 transition-all duration-300">
                Campus Bites
              </span>
              <div className="text-xs text-gray-400 -mt-1">Fast • Fresh • Delicious</div>
            </div>
          </Link>

          {!isMobile && (
            <nav className="ml-8 flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl hover:scale-105 group ${
                    pathname === item.href
                      ? "text-white bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Cart */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-gray-800/50 hover:scale-110 transition-all duration-300 rounded-xl group"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-gradient-to-r from-orange-500 to-red-500 border-0 text-xs font-bold animate-pulse shadow-lg">
                  {cartItemsCount}
                </Badge>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          {!isMobile && (
            <>
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative rounded-full text-white hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 p-2 group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                        </div>
                        <div className="hidden lg:block text-left">
                          <p className="font-medium text-sm text-white group-hover:text-orange-400 transition-colors">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-400">Premium Member</p>
                        </div>
                        <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
                      </div>
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-gray-800/95 backdrop-blur-xl border-gray-700 shadow-2xl rounded-xl p-2 min-w-[200px]"
                  >
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-2">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-white">{user?.name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-700 my-2" />
                    <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                      <Link href="/profile" className="flex items-center gap-2 p-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="text-gray-300 hover:bg-gray-700/50 rounded-lg cursor-pointer">
                      <Link href="/orders" className="flex items-center gap-2 p-2">
                        <Package className="h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700 my-2" />
                    <DropdownMenuItem
                      onClick={logout}
                      className="text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg cursor-pointer p-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-3">
                  <Button
                    asChild
                    variant="ghost"
                    className="text-sm text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 rounded-xl px-4"
                  >
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm rounded-xl px-6 py-2 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25 group"
                  >
                    <Link href="/register" className="flex items-center gap-2">
                      Sign Up
                      <Sparkles className="h-3 w-3 group-hover:animate-spin" />
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
    </header>
  )
}
