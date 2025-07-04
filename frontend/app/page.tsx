"use client"

import { useEffect, useRef, FC } from "react"
import Link from "next/link"
import { motion, useInView, animate, Variants, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Zap, Truck, Heart, GraduationCap, Search, ArrowRight } from "lucide-react"

interface CounterProps {
  to: number
  isPlus?: boolean
  suffix?: string
}

const Counter: FC<CounterProps> = ({ to, isPlus = false, suffix = "" }) => {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const inViewRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(inViewRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (node) {
            node.textContent = String(Math.round(value))
          }
        },
      })
      return () => controls.stop()
    }
  }, [isInView, to])

  return (
    <span ref={inViewRef}>
      <span ref={nodeRef}>0</span>
      {isPlus && "+"}
      {suffix}
    </span>
  )
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      mouseX.set(event.clientX - rect.left - rect.width / 2)
      mouseY.set(event.clientY - rect.top - rect.height / 2)
    }
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Professional Hero Section */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: "1000px" }}
      >
        {/* Subtle Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/80 to-black"></div>
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          ></motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          {/* Shooting Stars */}
          <motion.div
            className="absolute top-1/4 left-0 w-48 h-1 bg-white/40 rounded-full"
            style={{ filter: "blur(2px)" }}
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: "100vw", opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 5, ease: "linear" }}
          />
          <motion.div
            className="absolute top-1/2 right-0 w-32 h-0.5 bg-white/30 rounded-full"
            style={{ filter: "blur(1px)" }}
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: "-100vw", opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 7, ease: "linear" }}
          />
          {/* Floating Food Icons */}
          <motion.div
            className="absolute top-1/4 left-1/4 text-6xl"
            style={{ textShadow: "0 0 15px rgba(255, 165, 0, 0.5)" }}
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            🍔
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 text-5xl"
            style={{ textShadow: "0 0 15px rgba(255, 215, 0, 0.5)" }}
            animate={{ y: [0, 20, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            🍕
          </motion.div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <motion.div 
                className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6"
                variants={itemVariants}
              >
                <Star className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-medium">#1 Campus Food Delivery</span>
              </motion.div>

              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                variants={itemVariants}
              >
                <span className="block text-white">Late Night</span>
                <span className="block bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                  Cravings?
                </span>
              </motion.h1>

              <motion.p 
                className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0"
                variants={itemVariants}
              >
                Don't let hunger slow you down. Get your favorite meals delivered fast,
                <span className="text-red-400 font-semibold"> 24/7</span>, right to your hostel room.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                variants={itemVariants}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 text-lg rounded-full shadow-lg shadow-red-500/20 transition-all duration-300"
                  >
                    <Link href="/menu">
                      Order Now <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-red-700 text-red-700 hover:bg-gray-800 hover:text-white backdrop-blur-sm font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300"
                  >
                    <Link href="#demo">
                      <span className="mr-2 play-icon">▶</span>
                      Watch Demo
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Content - Cool Animation */}
            <motion.div
              className="relative hidden lg:flex items-center justify-center"
              style={{ rotateX, rotateY }}
            >
              <div className="relative w-96 h-96" style={{ transformStyle: "preserve-3d" }}>
                {/* Planet Earth */}
                <motion.div
                  className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-full shadow-2xl shadow-blue-500/30"
                  style={{ x: "-50%", y: "-50%", transform: "translateZ(50px)" }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute inset-0 rounded-full opacity-20 bg-black" />
                  <motion.span
                    className="absolute top-1/2 left-1/2 text-5xl"
                    style={{ x: "-50%", y: "-50%" }}
                  >
                    🌍
                  </motion.span>
                </motion.div>

                {/* Orbiting Car */}
                <motion.div
                  className="absolute w-full h-full"
                  style={{ transform: "translateZ(20px)" }}
                  animate={{ rotate: 360 }}
                  transition={{ ease: "linear", duration: 12, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-24 h-24"
                    style={{ x: "-50%", y: "-50%" }}
                    animate={{
                      rotate: -360,
                      x: "14rem",
                      y: ["0rem", "1.5rem", "0rem", "-1.5rem", "0rem"],
                    }}
                    transition={{
                      rotate: { ease: "linear", duration: 12, repeat: Infinity },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    }}
                  >
                    <div className="flex items-center justify-center h-full drop-shadow-lg">
                      <span className="text-5xl">🏎️</span>
                      <span className="text-xl font-bold text-white ml-2 -mt-4">Cb</span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Background Rings */}
                <motion.div
                  className="absolute inset-0 border-2 border-red-500/20 rounded-full"
                  style={{ transform: "translateZ(0px)" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="absolute inset-8 border-2 border-red-500/30 rounded-full"
                  style={{ transform: "translateZ(-20px)" }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div 
          className="absolute bottom-10 left-0 right-0 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4">
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-full p-4 flex items-center justify-around max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white"><Counter to={100} isPlus /></div>
                  <div className="text-xs text-gray-400">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white"><Counter to={1000} isPlus /></div>
                  <div className="text-xs text-gray-400">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white"><Counter to={15} suffix="min" /></div>
                  <div className="text-xs text-gray-400">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs text-gray-400">Service</div>
                </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Why Choose Section */}
      <motion.section 
        className="py-24 bg-black"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">
                Campus Bites?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're dedicated to providing the ultimate campus food experience—fast, reliable, and tailored for students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Get your food in minutes, not hours.",
                color: "text-red-400",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Direct Delivery",
                description: "Delivered straight to your hostel, no hassle.",
                color: "text-blue-400",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Quality Guaranteed",
                description: "Fresh, hygienic meals from trusted kitchens.",
                color: "text-pink-400",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Student-Friendly",
                description: "Exclusive deals and affordable prices for you.",
                color: "text-green-400",
              },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-6 transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.03, boxShadow: "0px 10px 30px rgba(239, 68, 68, 0.1)" }}
              >
                  <div className={`mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Search Section */}
      <motion.section 
        className="py-24 bg-gradient-to-b from-black to-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              What are you{" "}
              <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent">craving</span>?
            </h2>
          </motion.div>

          <motion.div className="max-w-2xl mx-auto mb-8" variants={itemVariants}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-16 pr-24 py-7 bg-gray-900/70 border-2 border-gray-700 rounded-full text-white placeholder-gray-500 text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
              />
              <Button className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 rounded-full px-6 py-2.5 font-semibold">
                Search
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-wrap justify-center gap-3"
            variants={sectionVariants}
          >
            {["Pizza", "Burger", "Chinese", "South Indian", "Desserts", "Beverages"].map((category, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -4, scale: 1.05 }}>
                <Button
                  variant="outline"
                  className="border-gray-700 bg-gray-900/50 text-gray-300 hover:bg-gray-800 hover:border-red-500/50 hover:text-white rounded-full px-5 py-2 transition-all duration-300"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
