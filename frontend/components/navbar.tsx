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

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Menu", href: "/menu", icon: UtensilsCrossed },
    { name: "Orders", href: "/orders", icon: Package },
  ]

  return (
    <header
      className="fixed top-0 z-50 w-full bg-gradient-to-r from-red-600 to-rose-500 shadow-lg"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2 text-white hover:bg-gray-800 rounded-lg">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-black/90 backdrop-blur-lg border-gray-800 text-white">
                <div className="flex flex-col h-full p-4">
                  <Link href="/" className="flex items-center gap-3 mb-8">
                    <Image src="/placeholder-logo.svg" alt="Campus Bites Logo" width={32} height={32} />
                    <span className="font-bold text-xl text-white">Campus Bites</span>
                  </Link>
                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                          pathname === item.href
                            ? "bg-red-600/20 text-red-300"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white"
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

          <Link href="/" className="flex items-center gap-3">
            <Image src="/placeholder-logo.svg" alt="Campus Bites Logo" width={40} height={40} />
            <span className="hidden sm:block font-bold text-xl text-white">Campus Bites</span>
          </Link>
        </div>

        {!isMobile && (
          <nav className="flex items-center bg-red-900/20 rounded-full">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-red-100 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className="relative text-white hover:bg-white/20 rounded-full">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-bold border-2 border-black">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative p-0 rounded-full h-10 w-10 hover:bg-white/20">
                  <Image src="/placeholder-user.jpg" alt={user?.name || 'User'} layout="fill" objectFit="cover" className="rounded-full" />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900/90 backdrop-blur-lg border-gray-800 text-white w-56 rounded-xl mt-2">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800 rounded-t-lg">
                    <Image src="/placeholder-user.jpg" alt={user?.name || 'User'} width={40} height={40} className="rounded-full" />
                    <div>
                      <p className="font-semibold">{user?.name}</p>
                      <p className="text-xs text-gray-400">View Profile</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem asChild className="p-0">
                  <Link href="/orders" className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer hover:bg-gray-800">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0">
                  <Link href="/favorites" className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer hover:bg-gray-800">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span>Favorites</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 w-full px-3 py-2 cursor-pointer text-red-400 hover:!text-red-400 hover:!bg-red-600/20 rounded-b-lg">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button asChild variant="ghost" className="text-white hover:bg-white/20 rounded-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-white text-red-600 hover:bg-gray-200 font-semibold rounded-full shadow-lg transition-all transform hover:scale-105">
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
