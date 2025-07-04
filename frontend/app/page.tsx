import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Zap, Truck, Heart, GraduationCap, Search } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Food Icons */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center animate-float">
            <span className="text-2xl">🍕</span>
          </div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center animate-float-delayed">
            <span className="text-xl">🍔</span>
          </div>
          <div className="absolute bottom-32 left-16 w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center animate-bounce-slow">
            <span className="text-xl">🌮</span>
          </div>
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-lg">🥗</span>
          </div>
          <div className="absolute top-1/2 left-10 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center animate-ping">
            <span className="text-sm">☕</span>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-8 animate-fade-in">
                <Star className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">Rated #1 Campus Food Delivery</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                <span className="block text-white">Late Night</span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                  Cravings?
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed animate-slide-up delay-200">
                We deliver <span className="text-orange-400 font-semibold">24/7</span> to your hostel room
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up delay-300">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg rounded-full shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105"
                >
                  <Link href="/menu">
                    Order Now
                    <span className="ml-2">→</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-gray-600 text-white hover:bg-gray-800 backdrop-blur-sm font-semibold px-8 py-4 text-lg rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Link href="#demo">
                    <span className="mr-2">▶</span>
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in delay-500">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">100+</div>
                  <div className="text-sm text-gray-400">Restaurants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">1000+</div>
                  <div className="text-sm text-gray-400">Happy Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">15min</div>
                  <div className="text-sm text-gray-400">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">24/7</div>
                  <div className="text-sm text-gray-400">Service</div>
                </div>
              </div>
            </div>

            {/* Right Content - Floating Food Illustration */}
            <div className="lg:w-1/2 relative">
              <div className="relative w-full max-w-lg mx-auto">
                {/* Main Food Illustration */}
                <div className="relative">
                  <div className="w-80 h-80 mx-auto relative animate-float">
                    {/* Layered Food Illustration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-green-600/20 rounded-full transform rotate-12 animate-spin-slow"></div>
                    <div className="absolute inset-4 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full transform -rotate-6 animate-spin-reverse"></div>
                    <div className="absolute inset-8 bg-gradient-to-br from-orange-400/40 to-red-500/40 rounded-full transform rotate-3 animate-pulse"></div>
                    <div className="absolute inset-12 bg-gradient-to-br from-red-400/50 to-pink-500/50 rounded-full animate-bounce-slow"></div>

                    {/* Center Food Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl animate-bounce-gentle">🌮</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements Around Food */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center animate-float shadow-lg">
                  <span className="text-2xl">🍟</span>
                </div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-float-delayed shadow-lg">
                  <span className="text-2xl">🥤</span>
                </div>
                <div className="absolute top-1/2 -right-12 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                  <span className="text-xl">🍰</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Campus Bites?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We're not just another food delivery app. We're your campus food companion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Average delivery time of just 15 minutes",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: "Hassle Delivery",
                description: "Direct delivery to your room or pickup points",
                color: "from-blue-400 to-purple-500",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Quality Food",
                description: "Fresh, hygienic meals from verified restaurants",
                color: "from-pink-400 to-red-500",
              },
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: "Student Friendly",
                description: "Special discounts and affordable pricing",
                color: "from-green-400 to-emerald-500",
              },
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What are you{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">craving</span>{" "}
              today?
            </h2>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for restaurants, cuisines, or dishes..."
                className="w-full pl-12 pr-20 py-4 bg-gray-800/50 border-gray-700 rounded-full text-white placeholder-gray-400 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {["Pizza", "Burger", "Chinese", "South Indian", "Desserts", "Beverages"].map((category, index) => (
              <Button
                key={index}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
