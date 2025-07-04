"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-1234",
    date: "2023-07-01T12:30:00",
    status: "delivered",
    total: 299,
    items: [
      { id: 1, name: "Classic Burger", quantity: 2, price: 249, image: "/placeholder.svg?height=80&width=80" },
      { id: 3, name: "Chocolate Milkshake", quantity: 1, price: 89, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "ORD-5678",
    date: "2023-06-28T18:45:00",
    status: "delivered",
    total: 399,
    items: [
      { id: 2, name: "Cheese Pizza", quantity: 1, price: 199, image: "/placeholder.svg?height=80&width=80" },
      { id: 4, name: "Cheesecake", quantity: 2, price: 129, image: "/placeholder.svg?height=80&width=80" },
      { id: 5, name: "French Fries", quantity: 2, price: 79, image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "ORD-9012",
    date: "2023-07-02T14:15:00",
    status: "processing",
    total: 249,
    items: [{ id: 6, name: "Veggie Burger", quantity: 2, price: 179, image: "/placeholder.svg?height=80&width=80" }],
  },
]

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("all")

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Please sign in to view your orders</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to access your order history.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-xl w-full">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const filteredOrders = activeTab === "all" ? mockOrders : mockOrders.filter((order) => order.status === activeTab)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "processing":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Processing</span>
      case "delivered":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Delivered</span>
      case "cancelled":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelled</span>
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white mt-20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Order History</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">📍 Pots campus 2, LDH</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg font-medium transition-all"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger 
              value="processing" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg font-medium transition-all"
            >
              Processing
            </TabsTrigger>
            <TabsTrigger 
              value="delivered" 
              className="data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg font-medium transition-all"
            >
              Delivered
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {renderOrdersList(filteredOrders, formatDate, getStatusBadge)}
          </TabsContent>
          <TabsContent value="processing" className="mt-6">
            {renderOrdersList(filteredOrders, formatDate, getStatusBadge)}
          </TabsContent>
          <TabsContent value="delivered" className="mt-6">
            {renderOrdersList(filteredOrders, formatDate, getStatusBadge)}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function renderOrdersList(orders: any[], formatDate: Function, getStatusBadge: Function) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">No orders found</p>
        <p className="text-gray-400 text-sm mt-2">Your orders will appear here once you place them</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Order Header */}
          <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{order.id}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {formatDate(order.date)}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-red-600">₹{order.total}</p>
                <p className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="p-4">
            <div className="space-y-4">
              {order.items.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 border-gray-200 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{(item.quantity * item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3">
              <Button 
                variant="outline" 
                asChild 
                className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl font-medium"
              >
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button>
              {order.status === "delivered" && (
                <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium">
                  Reorder
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
