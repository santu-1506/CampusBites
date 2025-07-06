'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, ShoppingCart, User, LogOut, Home, UtensilsCrossed, Package, Heart, X } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Orders', href: '/orders', icon: Package },
  ];

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-r from-[#0a192f] to-[#1e3a5f] shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              className="flex items-center space-x-3"
            >
              <Image
                src="/logo.png"
                alt="Campus Bites Logo"
                width={50}
                height={50}
                priority
                className="transition-all duration-300 group-hover:brightness-110"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-wide group-hover:text-red-400 transition-colors duration-300">
                  Campus Bites
                </span>
                <span className="text-xs text-gray-300 font-medium tracking-wider">
                  Fast • Fresh • Delicious
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <div className="relative flex items-center bg-gray-900/50 backdrop-blur-lg rounded-full p-1 border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    pathname === item.href
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 z-0 rounded-full bg-red-600"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <ThemeToggle />
            </motion.div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/cart" className="relative group">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-900/50 border border-white/10 hover:bg-gray-800/70 transition-colors duration-300">
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 text-white text-xs font-bold rounded-full border-2 border-black/50">
                      {cartItemsCount}
                    </Badge>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative p-0 rounded-full h-10 w-10">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt={user?.name || 'User'} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-gray-900" />
                    </Button>
                  </DropdownMenuTrigger>
                </motion.div>
                <DropdownMenuContent 
                  align="end" 
                  className="w-64 bg-gray-900/80 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl mt-2 p-2 text-white"
                >
                  <div className="p-2 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt={user?.name || 'User'} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{user?.name}</p>
                        <p className="text-sm text-gray-400">View Profile</p>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenuItem asChild className="mt-2 focus:bg-gray-800/80 focus:text-white">
                    <Link href="/orders" className="flex items-center space-x-3 w-full p-2 rounded-lg text-gray-300 hover:bg-gray-800/80 hover:text-white transition-all duration-200">
                      <Package className="h-5 w-5" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild className="focus:bg-gray-800/80 focus:text-white">
                    <Link href="/favorites" className="flex items-center space-x-3 w-full p-2 rounded-lg text-gray-300 hover:bg-gray-800/80 hover:text-white transition-all duration-200">
                      <Heart className="h-5 w-5" />
                      <span>Favorites</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="my-2 bg-white/10" />
                  
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="flex items-center space-x-3 w-full p-2 rounded-lg text-red-500 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 focus:bg-red-500/20 focus:text-red-400"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Login/Signup buttons
              <div className="hidden sm:flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="ghost" className="text-white hover:bg-gray-700/50">
                    <Link href="/login">Login</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-5 py-2">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm bg-gray-900/80 backdrop-blur-lg border-l border-white/10 text-white p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center space-x-3" onClick={() => setIsMenuOpen(false)}>
                      <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                        <UtensilsCrossed className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-lg text-white">Campus Bites</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="rounded-full text-white hover:bg-white/10">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <nav className="flex-1 p-6 space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 text-lg ${
                          pathname === item.href
                            ? "bg-red-600 text-white"
                            : "text-gray-300 hover:bg-gray-800/80"
                        }`}
                      >
                        <item.icon className="h-6 w-6" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </nav>

                  {!isAuthenticated && (
                    <div className="p-6 border-t border-white/10 space-y-4">
                      <Button asChild variant="outline" className="w-full h-12 rounded-xl border-white/20 text-lg text-white hover:bg-white/10 hover:text-white">
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full h-12 bg-red-600 hover:bg-red-700 rounded-xl text-lg">
                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
