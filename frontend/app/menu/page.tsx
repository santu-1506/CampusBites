'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Star,
  Clock,
  MapPin,
  Heart,
  Utensils,
  Sparkles,
  ChefHat,
} from 'lucide-react';
import Image from 'next/image';
import { Canteen } from '@/types';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/lib/constants';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [canteens, setCanteens] = useState<Canteen[]>([]);
  const [filteredCanteens, setFilteredCanteens] = useState<Canteen[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        console.log('🔍 Fetching canteens from:', API_ENDPOINTS.CANTEENS);
        const response = await fetch(API_ENDPOINTS.CANTEENS);
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch canteens: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📋 Received data:', data);
        console.log('🏢 Number of canteens:', data.data?.length || 0);
        
        const visibleCanteens = (data.data || []).filter(
          (c: Canteen) => c.is_verified === true && c.isBanned === false 
        );
        setCanteens(visibleCanteens);
        setFilteredCanteens(visibleCanteens);
      } catch (error) {
        console.error('❌ Error fetching canteens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, []);

  useEffect(() => {
    const filtered = canteens.filter(
      (canteen) =>
        canteen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        canteen.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCanteens(filtered);
  }, [searchQuery, canteens]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 20,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-[#0a192f] dark:via-[#1e3a5f] dark:to-[#0f172a] flex items-center justify-center transition-colors duration-500'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className='w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4'
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='text-gray-900 dark:text-white text-xl font-light'>
            Discovering your favorite canteens...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 dark:from-[#0a192f] dark:via-[#1e3a5f] dark:to-[#0f172a] relative overflow-hidden transition-colors duration-500'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Light mode background */}
        <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-500">
          <motion.div
            variants={floatingVariants}
            animate='animate'
            className='absolute top-20 left-20 w-32 h-32 bg-purple-300/10 rounded-full blur-xl'
          />
          <motion.div
            variants={floatingVariants}
            animate='animate'
            style={{ animationDelay: '2s' }}
            className='absolute top-40 right-32 w-24 h-24 bg-red-300/15 rounded-full blur-xl'
          />
          <motion.div
            variants={floatingVariants}
            animate='animate'
            style={{ animationDelay: '4s' }}
            className='absolute bottom-32 left-16 w-40 h-40 bg-blue-300/10 rounded-full blur-2xl'
          />
        </div>

        {/* Dark mode background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
          <motion.div
            variants={floatingVariants}
            animate='animate'
            className='absolute top-20 left-20 w-32 h-32 bg-red-500/10 rounded-full blur-xl'
          />
          <motion.div
            variants={floatingVariants}
            animate='animate'
            style={{ animationDelay: '2s' }}
            className='absolute top-40 right-32 w-24 h-24 bg-red-500/15 rounded-full blur-xl'
          />
          <motion.div
            variants={floatingVariants}
            animate='animate'
            style={{ animationDelay: '4s' }}
            className='absolute bottom-32 left-16 w-40 h-40 bg-white/5 rounded-full blur-2xl'
          />
        </div>

        {/* Subtle light rays */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: [0.05, 0.15, 0.05], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='absolute top-0 left-1/2 w-96 h-96 bg-gradient-conic from-red-500/10 via-transparent to-red-500/10 -translate-x-1/2 -translate-y-1/2'
        />
      </div>

      <div className='relative z-10'>
        {/* Hero Section with Search */}
        <motion.section
          initial='hidden'
          animate='visible'
          variants={searchVariants}
          className='pt-24 pb-16 px-6'>
          <div className='max-w-7xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className='mb-8'>
              <h1 className='text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-red-600 to-rose-600 dark:from-white dark:via-red-200 dark:to-rose-200 bg-clip-text text-transparent'>
                Campus Canteens
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className='w-24 h-1 bg-gradient-to-r from-red-500 to-rose-500 mx-auto mb-6'
              />
              <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-light'>
                Discover delicious meals from your favorite campus canteens, delivered fresh and fast
              </p>
            </motion.div>

            {/* Cinematic Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='relative max-w-2xl mx-auto'>
              <div className='relative group'>
                <Search className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-6 h-6 group-hover:text-red-500 transition-colors duration-300' />
                <Input
                  type='text'
                  placeholder='Search canteens, cuisines, or dishes...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-16 pr-6 py-6 bg-white/80 dark:bg-white/10 backdrop-blur-xl border-gray-200/50 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 hover:bg-white/90 dark:hover:bg-white/15'
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: searchQuery ? 1 : 0 }}
                  className='absolute right-6 top-1/2 transform -translate-y-1/2'>
                  <Sparkles className='w-5 h-5 text-red-400' />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Restaurant Grid */}
        <motion.section
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='px-6 pb-24'>
          <div className='max-w-7xl mx-auto'>
            <AnimatePresence mode='wait'>
              {filteredCanteens.length > 0 ? (
                <motion.div
                  key='restaurants'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                  {filteredCanteens.map((canteen, index) => (
                    <motion.div
                      key={canteen._id}
                      variants={cardVariants}
                      whileHover={{
                        scale: 1.05,
                        rotateY: 5,
                        transition: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      onHoverStart={() => setHoveredCard(canteen._id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className='group relative'>
                      <Card className='bg-white/90 dark:bg-white/10 backdrop-blur-xl border-gray-200/50 dark:border-white/20 overflow-hidden hover:bg-white/95 dark:hover:bg-white/15 transition-all duration-500 h-full shadow-lg'>
                        <div className='relative overflow-hidden'>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className='relative'>
                            <Image
                              src={canteen.image || '/placeholder.svg'}
                              alt={canteen.name}
                              width={400}
                              height={250}
                              className='w-full h-64 object-cover'
                            />

                            {/* Cinematic overlay */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: hoveredCard === canteen._id ? 1 : 0,
                              }}
                              className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'
                            />
                          </motion.div>

                          {/* Floating badges */}
                          <div className='absolute top-4 left-4 flex flex-col gap-2'>
                            {canteen.featured && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}>
                                <Badge className='bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 shadow-lg'>
                                  <Sparkles className='w-4 h-4 mr-1' />
                                  Featured
                                </Badge>
                              </motion.div>
                            )}
                            {canteen.discount && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.1 }}>
                                <Badge className='bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 shadow-lg'>
                                  {canteen.discount}
                                </Badge>
                              </motion.div>
                            )}
                          </div>

                          {/* Heart button */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='absolute top-4 right-4'>
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-gray-300/50 dark:border-white/30 bg-white/70 dark:bg-white/20 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/30 rounded-full w-10 h-10 p-0'>
                              <Heart className='w-4 h-4' />
                            </Button>
                          </motion.div>

                          {/* Closed overlay */}
                          <AnimatePresence>
                            {!canteen.isOpen && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center'>
                                <Badge
                                  variant='destructive'
                                  className='text-lg px-6 py-2 font-bold'>
                                  Closed
                                </Badge>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <CardHeader className='pb-4'>
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <CardTitle className='text-2xl text-gray-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-200 transition-colors'>
                                {canteen.name}
                              </CardTitle>
                              <CardDescription className='text-gray-600 dark:text-gray-300 flex items-center gap-2'>
                                <ChefHat className='w-4 h-4' />
                                {canteen.cuisine}
                              </CardDescription>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className='flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full'>
                              <Star className='w-4 h-4 text-yellow-400 fill-current' />
                              <span className='text-gray-900 dark:text-white font-bold'>
                                {canteen.rating}
                              </span>
                            </motion.div>
                          </div>
                        </CardHeader>

                        <CardContent className='pt-0'>
                          <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300 mb-6'>
                            <div className='flex items-center gap-2'>
                              <Clock className='w-4 h-4 text-red-400' />
                              <span>{canteen.deliveryTime}</span>
                            </div>
                            <div className='flex items-center gap-2'>
                              <MapPin className='w-4 h-4 text-red-400' />
                              <span>{canteen.distance}</span>
                            </div>
                          </div>

                          <Link href={`/menu/${canteen._id}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}>
                              <Button
                                className='w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-500/25'
                                disabled={!canteen.isOpen}>
                                <Utensils className='w-5 h-5 mr-2' />
                                {canteen.isOpen ? 'View Menu' : 'Closed'}
                              </Button>
                            </motion.div>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key='no-results'
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className='text-center py-20'>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
                    className='w-32 h-32 bg-gradient-to-r from-red-500/20 to-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-8'>
                    <Search className='w-16 h-16 text-red-400' />
                  </motion.div>
                  <h3 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                    No canteens found
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto'>
                    Try adjusting your search to discover amazing campus canteens
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
