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
import { Menu, ShoppingCart, User, LogOut, Home, UtensilsCrossed, Package, Heart, X } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuth()
  const { cart } = useCart()
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Menu", href: "/menu", icon: UtensilsCrossed },
    { name: "Orders", href: "/orders", icon: Package },
  ]

  // Food particles data
  const foodParticles = ['🍕', '🍔', '🌮', '🍟', '🥤', '🍩', '🌭', '🥪', '🍰', '🧁']

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-2xl' 
          : 'bg-gradient-to-r from-red-500 via-red-400 to-orange-400'
      }`}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-orange-600/20"></div>
        
        {/* Floating Food Particles */}
        {foodParticles.map((particle, index) => (
          <div
            key={index}
            className="absolute text-lg opacity-20 animate-float"
            style={{
              left: `${(index * 15) % 100}%`,
              top: `${20 + (index * 10) % 60}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${8 + (index % 4)}s`,
            }}
          >
            {particle}
          </div>
        ))}
        
        {/* Moving Wave Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-wave"></div>
        </div>
        
        {/* Sparkle Effect */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-sparkle"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i * 20) % 40}%`,
                animationDelay: `${i * 1.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group relative z-10">
            <div className="relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-white/30 group-hover:bg-white/30">
              <UtensilsCrossed className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-white drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300">
                Campus Bites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 relative z-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href
                    ? "text-white bg-white/20 backdrop-blur-sm shadow-lg border border-white/30"
                    : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm"
                }`}
              >
                <span className="relative z-10 drop-shadow-sm">{item.name}</span>
                {pathname === item.href && (
                  <div className="absolute inset-0 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm"></div>
                )}
                <div className="absolute inset-0 bg-white/15 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"></div>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3 relative z-10">
            {/* Cart */}
            <Link href="/cart" className="relative group">
              <div className="relative p-2 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                <ShoppingCart className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-400 text-red-600 text-xs font-bold rounded-full border-2 border-white shadow-lg animate-bounce">
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0 rounded-full h-10 w-10 hover:bg-white/20 transition-colors duration-300">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30">
                      <Image 
                        src="/placeholder-user.jpg" 
                        alt={user?.name || 'User'} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white shadow-lg" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-64 bg-white/95 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl p-2 mt-2"
                >
                  <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-red-600">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt={user?.name || 'User'} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">View Profile</p>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenuItem asChild className="mt-2">
                    <Link href="/orders" className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/favorites" className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      <Heart className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-2" />
                  
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="flex items-center space-x-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-300"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Button asChild variant="ghost" className="text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-white/20 hover:bg-white/30 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/30">
                  <Link href="/register">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 transition-colors duration-300 backdrop-blur-sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-lg border-l border-red-200/50">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b border-red-200">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                        <UtensilsCrossed className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-bold text-lg text-red-800">Campus Bites</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                      <X className="h-5 w-5 text-red-600" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          pathname === item.href
                            ? "bg-red-100 text-red-700 border border-red-200 shadow-sm"
                            : "text-red-600 hover:bg-red-50 hover:text-red-700"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Auth */}
                  {!isAuthenticated && (
                    <div className="p-4 border-t border-red-200 space-y-3">
                      <Button asChild variant="outline" className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                      </Button>
                      <Button asChild className="w-full justify-center bg-red-600 hover:bg-red-700 text-white shadow-lg">
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-wave {
          animation: wave 8s linear infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  )
}