'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
import { useMobile } from '@/hooks/use-mobile';
import {
  Menu,
  ShoppingCart,
  User,
  LogOut,
  Home,
  UtensilsCrossed,
  Package,
  Store,
  X,
} from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const { cart } = useCart();
  const isMobile = useMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: UtensilsCrossed },
    { name: 'Store', href: '/campus/store', icon: Store },
    { name: 'Orders', href: '/orders', icon: Package },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-2xl'
          : 'bg-gradient-to-r from-red-500 via-red-400 to-orange-400'
      }`}>
      <div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link href='/' className='flex items-center space-x-3 group'>
            <div className='relative w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-white/30 group-hover:bg-white/30'>
              <UtensilsCrossed className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300' />
            </div>
            <div className='hidden sm:block'>
              <span className='text-xl font-bold text-white drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300'>
                Campus Bites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-1'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href
                    ? 'text-white bg-white/20 backdrop-blur-sm shadow-lg border border-white/30'
                    : 'text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm'
                }`}>
                <span className='relative z-10 drop-shadow-sm'>
                  {item.name}
                </span>
                {pathname === item.href && (
                  <div className='absolute inset-0 bg-white/20 rounded-lg border border-white/30 backdrop-blur-sm'></div>
                )}
                <div className='absolute inset-0 bg-white/15 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'></div>
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className='flex items-center space-x-3'>
            {/* Cart */}
            <Link href='/cart' className='relative group'>
              <div className='relative p-2 rounded-lg hover:bg-white/20 transition-all duration-300 backdrop-blur-sm'>
                <ShoppingCart className='w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-sm' />
                {cartItemsCount > 0 && (
                  <Badge className='absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-yellow-400 text-red-600 text-xs font-bold rounded-full border-2 border-white shadow-lg animate-bounce'>
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='relative p-0 rounded-full h-10 w-10 hover:bg-white/20 transition-colors duration-300'>
                    <div className='relative w-8 h-8 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm border border-white/30'>
                      <Image
                        src='/placeholder-user.jpg'
                        alt={user?.name || 'User'}
                        fill
                        className='object-cover'
                      />
                    </div>
                    <span className='absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white shadow-lg' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuItem className='flex items-center gap-2'>
                    <User className='w-4 h-4' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className='flex items-center gap-2 text-red-600'>
                    <LogOut className='w-4 h-4' />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className='flex items-center space-x-2'>
                <Link href='/login'>
                  <Button
                    variant='ghost'
                    className='text-white hover:bg-white/20'>
                    Login
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button className='bg-white text-red-600 hover:bg-gray-100'>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant='ghost'
              size='sm'
              className='md:hidden text-white hover:bg-white/20'
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='md:hidden bg-white/95 backdrop-blur-sm border-t border-white/20'>
          <nav className='container mx-auto px-4 py-4 space-y-2'>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
                onClick={() => setIsMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className='pt-4 border-t border-gray-200 space-y-2'>
                <Link href='/login'>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button
                    className='w-full'
                    onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
