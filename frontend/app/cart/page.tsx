"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Trash2, Plus, Minus, ArrowLeft, MapPin, Clock, Gift } from "lucide-react"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })
  }

  const handleApplyPromo = () => {
    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "welcome10") {
        const discountAmount = totalPrice * 0.1
        setDiscount(discountAmount)
        toast({
          title: "Promo code applied",
          description: "10% discount has been applied to your order.",
        })
      } else {
        toast({
          variant: "destructive",
          title: "Invalid promo code",
          description: "The promo code you entered is invalid or expired.",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const handleCheckout = () => {
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully!",
    })
    clearCart()
    router.push("/orders")
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold">Your Cart</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Pots campus 2, LDH V</span>
              </div>
            </div>
          </div>
        </div>

        {/* Empty Cart Content */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
   

      <div className="container mx-auto px-4 py-6 my-20">
        {/* Delivery Info */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Delivery in 25-30 mins</p>
                <p className="text-sm text-gray-500">To Pots campus 2, LDH V</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-gray-900">Your Items ({cart.length})</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 relative">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">₹{item.price}</p>
                          </div>
                          <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow-sm border mt-4 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Gift className="h-5 w-5 text-red-500" />
                <span className="font-medium text-gray-900">Apply Promo Code</span>
              </div>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyPromo} 
                  disabled={isApplyingPromo || !promoCode}
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  {isApplyingPromo ? "Applying..." : "Apply"}
                </Button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-40">
              <h2 className="font-semibold text-gray-900 mb-4">Bill Details</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Item Total</span>
                  <span className="text-gray-900">₹{totalPrice.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">₹25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Charges</span>
                  <span className="text-gray-900">₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between font-semibold text-lg">
                  <span>To Pay</span>
                  <span>₹{(totalPrice - discount + 25 + totalPrice * 0.05).toFixed(2)}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium" 
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
              
              <div className="mt-3 text-center">
                <Link href="/menu" className="text-sm text-red-500 hover:text-red-600">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
