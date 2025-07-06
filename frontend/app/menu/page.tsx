"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Clock, MapPin, Heart, Utensils, Sparkles, ChefHat } from "lucide-react"
import Image from "next/image"
import { Canteen } from "@/types"
import Link from "next/link"

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [restaurants, setRestaurants] = useState<Canteen[]>([])
  const [filteredRestaurants, setFilteredRestaurants] = useState<Canteen[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await fetch("/api/v1/canteens")
        if (!response.ok) {
          throw new Error("Failed to fetch canteens")
        }
        const data = await response.json()
        setRestaurants(data.data)
        setFilteredRestaurants(data.data)
      } catch (error) {
        console.error("Error fetching canteens:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCanteens()
  }, [])

  useEffect(() => {
    const filtered = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredRestaurants(filtered)
  }, [searchQuery, restaurants])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  }

  const searchVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white text-xl font-light"
          >
            Preparing your culinary journey...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-40 right-32 w-24 h-24 bg-pink-500/10 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-32 left-16 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
        />
        
        {/* Cinematic light rays */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: [0.1, 0.3, 0.1], rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-conic from-purple-500/20 via-transparent to-purple-500/20 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section with Search */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={searchVariants}
          className="pt-24 pb-16 px-6"
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Menu
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
              />
              <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                Discover extraordinary culinary experiences crafted by passionate chefs
              </p>
            </motion.div>

            {/* Cinematic Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-hover:text-purple-400 transition-colors duration-300" />
                <Input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-6 bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl text-white placeholder-gray-400 text-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: searchQuery ? 1 : 0 }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2"
                >
                  <Sparkles className="w-5 h-5 text-purple-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Restaurant Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="px-6 pb-24"
        >
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {filteredRestaurants.length > 0 ? (
                <motion.div
                  key="restaurants"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredRestaurants.map((restaurant, index) => (
                    <motion.div
                      key={restaurant._id}
                      variants={cardVariants}
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: 5,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      onHoverStart={() => setHoveredCard(restaurant._id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="group relative"
                    >
                      <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-500 h-full">
                        <div className="relative overflow-hidden">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                          >
                            <Image
                              src={restaurant.image || "/placeholder.svg"}
                              alt={restaurant.name}
                              width={400}
                              height={250}
                              className="w-full h-64 object-cover"
                            />
                            
                            {/* Cinematic overlay */}
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: hoveredCard === restaurant._id ? 1 : 0 }}
                              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            />
                          </motion.div>

                          {/* Floating badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                            {restaurant.featured && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-3 py-1 shadow-lg">
                                  <Sparkles className="w-4 h-4 mr-1" />
                                  Featured
                                </Badge>
                              </motion.div>
                            )}
                            {restaurant.discount && (
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.1 }}
                              >
                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold px-3 py-1 shadow-lg">
                                  {restaurant.discount}
                                </Badge>
                              </motion.div>
                            )}
                          </div>

                          {/* Heart button */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4"
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-full w-10 h-10 p-0"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </motion.div>

                          {/* Closed overlay */}
                          <AnimatePresence>
                            {!restaurant.isOpen && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
                              >
                                <Badge variant="destructive" className="text-lg px-6 py-2 font-bold">
                                  Closed
                                </Badge>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <CardTitle className="text-2xl text-white mb-2 group-hover:text-purple-200 transition-colors">
                                {restaurant.name}
                              </CardTitle>
                              <CardDescription className="text-gray-300 flex items-center gap-2">
                                <ChefHat className="w-4 h-4" />
                                {restaurant.cuisine}
                              </CardDescription>
                            </div>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full"
                            >
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white font-bold">{restaurant.rating}</span>
                            </motion.div>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-sm text-gray-300 mb-6">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span>{restaurant.deliveryTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-purple-400" />
                              <span>{restaurant.distance}</span>
                            </div>
                          </div>

                          <Link href={`/menu/${restaurant._id}`}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                                disabled={!restaurant.isOpen}
                              >
                                <Utensils className="w-5 h-5 mr-2" />
                                {restaurant.isOpen ? "View Menu" : "Closed"}
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
                  key="no-results"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="text-center py-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                    className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <Search className="w-16 h-16 text-purple-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-4">No matches found</h3>
                  <p className="text-gray-400 text-lg max-w-md mx-auto">
                    Try adjusting your search to discover amazing restaurants
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
