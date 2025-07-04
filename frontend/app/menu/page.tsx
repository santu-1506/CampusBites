"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Search, Star, Clock, Plus, Filter, Heart, Minus } from "lucide-react"
import Image from "next/image"

// Indian food categories and items with real food images
const foodCategories = [
  { id: "biryani", name: "Biryani", icon: "🍛", color: "from-orange-400 to-red-500" },
  { id: "curries", name: "Curries", icon: "🍛", color: "from-green-400 to-emerald-500" },
  { id: "breads", name: "Breads", icon: "🫓", color: "from-yellow-400 to-orange-500" },
  { id: "snacks", name: "Snacks", icon: "🥟", color: "from-purple-400 to-pink-500" },
  { id: "desserts", name: "Desserts", icon: "🍰", color: "from-pink-400 to-red-500" },
  { id: "beverages", name: "Beverages", icon: "☕", color: "from-blue-400 to-purple-500" },
]

const foodItems = [
  {
    id: 1,
    name: "Hyderabadi Biryani",
    description:
      "Aromatic basmati rice with tender mutton pieces, cooked in traditional dum style with saffron and mint",
    price: 299,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=center",
    category: "biryani",
    rating: 4.8,
    time: "25-30 min",
    isVeg: false,
    spiceLevel: 3,
    badge: "Bestseller",
    discount: 15,
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces and aromatic Indian spices, served with rice",
    price: 249,
    originalPrice: 279,
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop&crop=center",
    category: "curries",
    rating: 4.7,
    time: "20-25 min",
    isVeg: false,
    spiceLevel: 2,
    badge: "Chef's Special",
    discount: 10,
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    description: "Rich and creamy curry with soft paneer cubes in a tomato-cashew gravy, perfect with naan",
    price: 199,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&h=300&fit=crop&crop=center",
    category: "curries",
    rating: 4.6,
    time: "15-20 min",
    isVeg: true,
    spiceLevel: 2,
    badge: "Popular",
    discount: 13,
  },
  {
    id: 4,
    name: "Garlic Naan",
    description: "Soft and fluffy bread topped with fresh garlic and herbs, baked in traditional tandoor",
    price: 79,
    originalPrice: 89,
    image: "https://images.unsplash.com/photo-1619881589875-d8e6b5b6b1b5?w=400&h=300&fit=crop&crop=center",
    category: "breads",
    rating: 4.5,
    time: "10-15 min",
    isVeg: true,
    spiceLevel: 1,
    badge: "Fresh",
    discount: 11,
  },
  {
    id: 5,
    name: "Samosa (2 pcs)",
    description:
      "Crispy triangular pastries filled with spiced potatoes and peas, served with mint and tamarind chutney",
    price: 49,
    originalPrice: 59,
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center",
    category: "snacks",
    rating: 4.4,
    time: "5-10 min",
    isVeg: true,
    spiceLevel: 2,
    badge: "Quick Bite",
    discount: 17,
  },
  {
    id: 6,
    name: "Gulab Jamun (4 pcs)",
    description: "Soft and spongy milk dumplings soaked in rose-flavored sugar syrup, served warm",
    price: 89,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1571167530149-c72f2dbf7d28?w=400&h=300&fit=crop&crop=center",
    category: "desserts",
    rating: 4.9,
    time: "5 min",
    isVeg: true,
    spiceLevel: 0,
    badge: "Sweet Treat",
    discount: 10,
  },
  {
    id: 7,
    name: "Masala Chai",
    description: "Traditional Indian tea brewed with aromatic spices, cardamom, ginger and milk",
    price: 29,
    originalPrice: 35,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center",
    category: "beverages",
    rating: 4.3,
    time: "5 min",
    isVeg: true,
    spiceLevel: 1,
    badge: "Classic",
    discount: 17,
  },
  {
    id: 8,
    name: "Chicken Biryani",
    description: "Fragrant basmati rice layered with marinated chicken and cooked with traditional spices and saffron",
    price: 249,
    originalPrice: 289,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=center",
    category: "biryani",
    rating: 4.7,
    time: "25-30 min",
    isVeg: false,
    spiceLevel: 3,
    badge: "Popular",
    discount: 14,
  },
  {
    id: 9,
    name: "Dal Makhani",
    description: "Creamy black lentils slow-cooked with butter, cream and aromatic spices",
    price: 179,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&crop=center",
    category: "curries",
    rating: 4.5,
    time: "15-20 min",
    isVeg: true,
    spiceLevel: 2,
    badge: "Comfort Food",
    discount: 10,
  },
  {
    id: 10,
    name: "Tandoori Roti",
    description: "Whole wheat flatbread cooked in tandoor, perfect accompaniment to curries",
    price: 39,
    originalPrice: 45,
    image: "https://images.unsplash.com/photo-1619881589875-d8e6b5b6b1b5?w=400&h=300&fit=crop&crop=center",
    category: "breads",
    rating: 4.2,
    time: "8-12 min",
    isVeg: true,
    spiceLevel: 0,
    badge: "Healthy",
    discount: 13,
  },
  {
    id: 11,
    name: "Pani Puri (6 pcs)",
    description: "Crispy hollow puris filled with spicy tangy water, chutneys and boiled potatoes",
    price: 69,
    originalPrice: 79,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center",
    category: "snacks",
    rating: 4.6,
    time: "5-8 min",
    isVeg: true,
    spiceLevel: 3,
    badge: "Street Food",
    discount: 13,
  },
  {
    id: 12,
    name: "Kulfi (2 pcs)",
    description: "Traditional Indian ice cream made with condensed milk, cardamom and pistachios",
    price: 99,
    originalPrice: 119,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    category: "desserts",
    rating: 4.4,
    time: "2 min",
    isVeg: true,
    spiceLevel: 0,
    badge: "Frozen Delight",
    discount: 17,
  },
  {
    id: 13,
    name: "Lassi (Sweet)",
    description: "Refreshing yogurt-based drink blended with sugar and cardamom, served chilled",
    price: 59,
    originalPrice: 69,
    image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=300&fit=crop&crop=center",
    category: "beverages",
    rating: 4.3,
    time: "3 min",
    isVeg: true,
    spiceLevel: 0,
    badge: "Refreshing",
    discount: 14,
  },
  {
    id: 14,
    name: "Veg Biryani",
    description: "Aromatic basmati rice cooked with mixed vegetables, saffron and traditional spices",
    price: 199,
    originalPrice: 229,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop&crop=center",
    category: "biryani",
    rating: 4.4,
    time: "20-25 min",
    isVeg: true,
    spiceLevel: 2,
    badge: "Veg Special",
    discount: 13,
  },
  {
    id: 15,
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with fluffy deep-fried bread and pickled onions",
    price: 149,
    originalPrice: 169,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop&crop=center",
    category: "snacks",
    rating: 4.5,
    time: "15-20 min",
    isVeg: true,
    spiceLevel: 3,
    badge: "North Indian",
    discount: 12,
  },
]

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [favorites, setFavorites] = useState<number[]>([])
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart()
  const { toast } = useToast()

  const filteredItems = foodItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const getCartItemQuantity = (itemId: number) => {
    const cartItem = cart.find((item) => item.id === itemId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleAddToCart = (item: (typeof foodItems)[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })

    toast({
      title: "Added to cart! 🛒",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleIncrement = (item: (typeof foodItems)[0]) => {
    const currentQuantity = getCartItemQuantity(item.id)
    if (currentQuantity === 0) {
      handleAddToCart(item)
    } else {
      updateQuantity(item.id, currentQuantity + 1)
    }
  }

  const handleDecrement = (item: (typeof foodItems)[0]) => {
    const currentQuantity = getCartItemQuantity(item.id)
    if (currentQuantity > 1) {
      updateQuantity(item.id, currentQuantity - 1)
    } else if (currentQuantity === 1) {
      removeFromCart(item.id)
      toast({
        title: "Removed from cart",
        description: `${item.name} has been removed from your cart.`,
      })
    }
  }

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const getSpiceIndicator = (level: number) => {
    return "🌶️".repeat(level) + "⚪".repeat(3 - level)
  }

  const renderFoodCard = (item: (typeof foodItems)[0], index: number) => {
    const cartQuantity = getCartItemQuantity(item.id)

    return (
      <div
        key={item.id}
        className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {item.badge}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex gap-2">
            {item.discount > 0 && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {item.discount}% OFF
              </span>
            )}
            <button
              onClick={() => toggleFavorite(item.id)}
              className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-4 h-4 ${favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
              />
            </button>
          </div>

          {/* Veg/Non-veg indicator */}
          <div className="absolute bottom-3 left-3">
            <div
              className={`w-6 h-6 border-2 flex items-center justify-center ${
                item.isVeg ? "border-green-500" : "border-red-500"
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-500" : "bg-red-500"}`}></div>
            </div>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-semibold text-gray-800">{item.rating}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

          {/* Spice Level */}
          {item.spiceLevel > 0 && (
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400">Spice Level:</span>
              <span className="text-sm">{getSpiceIndicator(item.spiceLevel)}</span>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-orange-400">₹{item.price}</span>
              {item.originalPrice > item.price && (
                <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{item.time}</span>
            </div>
          </div>

          {/* Cart Controls */}
          {cartQuantity === 0 ? (
            <Button
              onClick={() => handleAddToCart(item)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 bg-gray-700/50 rounded-full p-1">
                <Button
                  onClick={() => handleDecrement(item)}
                  className="bg-red-500/80 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  size="sm"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg text-white min-w-[2rem] text-center">
                  {cartQuantity}
                </span>
                <Button
                  onClick={() => handleIncrement(item)}
                  className="bg-green-500/80 hover:bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">In Cart</p>
                <p className="text-sm font-semibold text-orange-400">
                  ₹{(item.price * cartQuantity).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center animate-float">
            <span className="text-2xl">🍛</span>
          </div>
          <div className="absolute top-40 right-32 w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center animate-float-delayed">
            <span className="text-xl">🍜</span>
          </div>
          <div className="absolute bottom-32 left-16 w-14 h-14 bg-yellow-500/10 rounded-full flex items-center justify-center animate-bounce-slow">
            <span className="text-xl">🥘</span>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Authentic
              </span>{" "}
              <span className="text-white">Indian Cuisine</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Discover the rich flavors of India with our carefully curated menu of traditional dishes
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for dishes, restaurants, or cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-20 py-4 bg-gray-800/50 border-gray-700 rounded-full text-white placeholder-gray-400 text-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Menu Statistics */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400">{filteredItems.length}</div>
                  <div className="text-sm text-gray-400">
                    {searchQuery || activeCategory !== "all" ? "Filtered Items" : "Total Items"}
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-400">{cart.reduce((sum, item) => sum + item.quantity, 0)}</div>
                  <div className="text-sm text-gray-400">Items in Cart</div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">₹{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Cart Total</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center items-center mb-8 gap-4">
              <TabsList className="mx-auto bg-gray-800/80 backdrop-blur-sm border border-gray-700/60 rounded-full p-2 gap-2">
                <TabsTrigger
                  value="all"
                  className="group relative px-4 py-2 text-sm font-medium text-gray-300 rounded-full hover:bg-orange-600/20 hover:text-white transition-all duration-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    All Items
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full group-data-[state=active]:bg-white group-data-[state=active]:text-orange-500">
                      {foodItems.length}
                    </span>
                  </span>
                </TabsTrigger>
                {foodCategories.map((category) => {
                  const categoryItemCount = foodItems.filter(item => item.category === category.id).length;
                  return (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="group relative px-4 py-2 text-sm font-medium text-gray-300 rounded-full hover:bg-orange-600/20 hover:text-white transition-all duration-300 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {category.icon}
                        {category.name}
                        <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full group-data-[state=active]:bg-white group-data-[state=active]:text-orange-500">
                          {categoryItemCount}
                        </span>
                      </span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredItems.map((item, index) => renderFoodCard(item, index))}
              </div>
            </TabsContent>

            {foodCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredItems
                    .filter((item) => item.category === category.id)
                    .map((item, index) => renderFoodCard(item, index))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  )
}
