"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import Image from "next/image"
import { Order } from "@/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Inbox, AlertCircle } from "lucide-react"

export default function OrdersPage() {
  const { isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          setLoading(true)
          setError(null)
          const res = await fetch("/api/v1/orders")
          if (!res.ok) {
            throw new Error("Failed to fetch orders")
          }
          const data = await res.json()
          setOrders(data.data)
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      }
      fetchOrders()
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Please sign in</h2>
            <p className="text-gray-600 mb-8">You need to be logged in to view your order history.</p>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-xl">
              <Link href="/login">Sign In</Link>
            </Button>
        </div>
      </div>
    )
  }
  
  const filteredOrders = activeTab === "all" ? orders : orders.filter((order) => order.status === activeTab)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-semibold"
    switch (status) {
      case "placed":
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Placed</span>
      case "preparing":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Preparing</span>
      case "ready":
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Ready for Pickup</span>
      case "completed":
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>
      case "cancelled":
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Cancelled</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>
    }
  }

  const getPaymentBadge = (payment: any) => {
    if (!payment || !payment.method) return null
    
    const getPaymentIcon = (method: string) => {
      switch (method) {
        case "cod":
          return (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          )
        case "upi":
          return (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          )
        case "card":
          return (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          )
        default:
          return null
      }
    }

    const getPaymentText = (method: string) => {
      if (!method) return "Unknown Payment"
      
      switch (method.toLowerCase()) {
        case "cod": return "Cash on Delivery"
        case "upi": return "UPI Payment"
        case "card": return "Card Payment"
        default: return method.charAt(0).toUpperCase() + method.slice(1).toLowerCase()
      }
    }

    return (
      <span className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
        {getPaymentIcon(payment.method)}
        {getPaymentText(payment.method)}
      </span>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    if (!status) return null
    
    const baseClasses = "px-2 py-1 rounded-md text-xs font-medium"
    switch (status) {
      case "pending":
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Payment Pending</span>
      case "completed":
        return <span className={`${baseClasses} bg-green-100 text-green-700`}>Paid</span>
      case "failed":
        return <span className={`${baseClasses} bg-red-100 text-red-700`}>Payment Failed</span>
      case "refunded":
        return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Refunded</span>
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-700`}>{status}</span>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-red-600" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          </div>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="pb-2">
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 rounded-xl p-1">
              {["all", "placed", "preparing", "ready", "completed"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab}
                  className="capitalize data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-lg font-medium transition-all"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="container mx-auto px-4 py-8">
              {["all", "placed", "preparing", "ready", "completed"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-6">
                  {renderOrdersList(filteredOrders, formatDate, getStatusBadge, getPaymentBadge, getPaymentStatusBadge)}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function renderOrdersList(orders: any[], formatDate: Function, getStatusBadge: Function, getPaymentBadge: Function, getPaymentStatusBadge: Function) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Inbox className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No orders found</h3>
        <p className="text-gray-500">Your past orders will appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order._id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="p-5 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">Order #{order._id.slice(-6)}</h3>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  {formatDate(order.placedAt)}
                </p>
                                 <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                   {order.canteen?.name || 'Unknown Restaurant'}
                 </p>
                 {/* Payment Information */}
                 <div className="flex items-center gap-2 mt-2">
                   {order.payment ? getPaymentBadge(order.payment) : (
                     <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                       </svg>
                       Legacy Order
                     </span>
                   )}
                 </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-2xl text-red-600">₹{order.total.toFixed(2)}</p>
                                 {/* Payment Status */}
                 <div className="mt-1">
                   {order.payment?.status ? getPaymentStatusBadge(order.payment.status) : null}
                 </div>
              </div>
            </div>
          </div>
          
          <div className="p-5">
            <div className="space-y-4">
              {order.items.map((item: any) => (
                                 <div key={item._id} className="flex items-center gap-4">
                   <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 relative bg-gray-100">
                     <Image
                       src={item.item?.image || "/placeholder.svg"}
                       alt={item.item?.name || 'Unknown Item'}
                       fill
                       className="object-cover"
                     />
                   </div>
                   <div className="flex-1">
                     <h4 className="font-semibold text-gray-800">{item.item?.name || 'Unknown Item'}</h4>
                     <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                   </div>
                   <div className="text-right">
                     <p className="font-semibold text-gray-800">₹{(item.quantity * (item.item?.price || 0)).toFixed(2)}</p>
                   </div>
                 </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end gap-3">
              <Button 
                variant="outline" 
                asChild
                className="border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-semibold"
              >
                <Link href={`/orders/${order._id}`}>View Details</Link>
              </Button>
              {order.status === "completed" && (
                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
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
