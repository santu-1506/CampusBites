"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"

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
    // In a real app, you would redirect to a checkout page or process
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully!",
    })
    clearCart()
    router.push("/orders")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
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
            className="mx-auto text-gray-400"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/menu">Browse Menu</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flow-root">
              <ul className="-my-6 divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>{item.name}</h3>
                          <p className="ml-4">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-2">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span>Delivery Fee</span>
              <span>₹25</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax</span>
              <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between mb-6">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">₹{(totalPrice - discount + 25 + totalPrice * 0.05).toFixed(2)}</span>
            </div>

            <div className="flex gap-2 mb-6">
              <Input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button variant="outline" onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode}>
                {isApplyingPromo ? "Applying..." : "Apply"}
              </Button>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleCheckout}>
              Checkout
            </Button>
            <div className="mt-4 text-center">
              <Link href="/menu" className="text-sm text-red-600 hover:text-red-800">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
