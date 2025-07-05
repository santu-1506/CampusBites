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

export default function LandingPageClient() {
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
                      repeat: Infinity,
                      duration: 12,
                      ease: "linear",
                    }}
                  >
                    <motion.span className="text-4xl">🚗</motion.span>
                  </motion.div>
                </motion.div>
                
                {/* Other orbiting elements */}
                <motion.div className="absolute w-full h-full" animate={{rotate: -360}} transition={{ease: "linear", duration: 25, repeat: Infinity}}>
                  <motion.div className="absolute top-[20%] left-[80%] text-3xl" style={{transform: "translateZ(100px)"}}>📦</motion.div>
                  <motion.div className="absolute top-[80%] left-[10%] text-2xl" style={{transform: "translateZ(-80px)"}}>🎓</motion.div>
                  <motion.div className="absolute top-[5%] left-[15%] text-4xl" style={{transform: "translateZ(120px)"}}>💖</motion.div>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-24 bg-gray-900/50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="text-red-500">CampusBites</span>?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're not just another food app. We're built by students, for students, with features that matter to you.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10 text-red-400" />,
                title: "Lightning-Fast Delivery",
                description:
                  "Get your food in minutes. Our delivery partners are always on the move.",
              },
              {
                icon: <Heart className="w-10 h-10 text-red-400" />,
                title: "Curated for You",
                description:
                  "Discover exclusive deals and combos from your favorite campus canteens.",
              },
              {
                icon: <Truck className="w-10 h-10 text-red-400" />,
                title: "Real-Time Tracking",
                description:
                  "Know exactly where your order is, from the kitchen to your doorstep.",
              },
              {
                icon: <GraduationCap className="w-10 h-10 text-red-400" />,
                title: "Student-Friendly Prices",
                description:
                  "Enjoy delicious meals that won't break the bank. Pocket-friendly is our promise.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800/60 transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-center justify-center bg-red-500/10 rounded-full w-20 h-20 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

       {/* How It Works Section */}
       <motion.section
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
       >
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center mb-16" variants={itemVariants}>
            Get Started in <span className="text-red-500">3 Easy Steps</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-700 hidden md:block" />
            
            {/* Step 1 */}
            <motion.div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-16" variants={itemVariants}>
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3 text-red-400">1. Browse & Select</h3>
                <p className="text-gray-400">Explore menus from all campus canteens in one place. Find your favorite dish or try something new!</p>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute w-8 h-8 bg-red-500 rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-4 border-black hidden md:block" />
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                  <p>Browse Screen Mockup</p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-16" variants={itemVariants}>
              <div className="relative flex justify-center items-center md:order-2">
                <div className="absolute w-8 h-8 bg-red-500 rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-4 border-black hidden md:block" />
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                   <p>Cart/Checkout Mockup</p>
                </div>
              </div>
              <div className="text-center md:text-right mt-8 md:mt-0 md:order-1">
                <h3 className="text-3xl font-bold mb-3 text-red-400">2. Place Your Order</h3>
                <p className="text-gray-400">Add items to your cart, choose your payment method, and confirm your order in a few taps.</p>
              </div>
            </motion.div>

             {/* Step 3 */}
             <motion.div className="md:grid md:grid-cols-2 md:gap-12 items-center" variants={itemVariants}>
              <div className="text-center md:text-left mb-8 md:mb-0">
                <h3 className="text-3xl font-bold mb-3 text-red-400">3. Track & Enjoy</h3>
                <p className="text-gray-400">Follow your order in real-time and get notified when it's arriving. Hot and fresh, right at your door!</p>
              </div>
              <div className="relative flex justify-center items-center">
                <div className="absolute w-8 h-8 bg-red-500 rounded-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-4 border-black hidden md:block" />
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                  <p>Tracking Screen Mockup</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 bg-gradient-to-r from-red-600 to-rose-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-4xl font-extrabold mb-4" variants={itemVariants}>
            Ready to End Hunger Games?
          </motion.h2>
          <motion.p className="text-red-200 text-lg max-w-2xl mx-auto mb-8" variants={itemVariants}>
            Join thousands of students and get your meals on time, every time. Sign up now and get exclusive launch offers!
          </motion.p>
          <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-200 font-bold px-8 py-4 text-lg rounded-full shadow-2xl"
            >
              <Link href="/register">
                Sign Up for Free
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} CampusBites. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/about" className="text-gray-400 hover:text-white">About</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 