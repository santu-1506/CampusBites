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
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in to view your orders</h2>
        <p className="text-gray-600 mb-8">You need to be logged in to access your order history.</p>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href="/login">Sign In</Link>
        </Button>
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
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Processing</span>
      case "delivered":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Delivered</span>
      case "cancelled":
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Cancelled</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
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
  )
}

function renderOrdersList(orders: any[], formatDate: Function, getStatusBadge: Function) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{order.id}</h3>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">₹{order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{order.items.length} items</p>
            </div>
          </div>
          <div className="p-4">
            <ul className="divide-y divide-gray-200">
              {order.items.map((item: any) => (
                <li key={item.id} className="py-4 flex items-center">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} x ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/orders/${order.id}`}>View Details</Link>
              </Button>
              {order.status === "delivered" && <Button variant="outline">Reorder</Button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
