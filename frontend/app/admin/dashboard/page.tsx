"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Clock, Store, Mail, Phone, MapPin, FileText, Users, TrendingUp } from "lucide-react"

interface PendingRequest {
  id: string
  restaurantName: string
  ownerName: string
  email: string
  phone: string
  address: string
  description: string
  operatingHours: string
  cuisineType: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
}

export default function AdminDashboard() {
  const { toast } = useToast()
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([
    {
      id: "1",
      restaurantName: "Spice Garden",
      ownerName: "Rajesh Kumar",
      email: "rajesh@spicegarden.com",
      phone: "+91 9876543210",
      address: "Block A, Campus Food Court, University Campus",
      description:
        "Authentic Indian cuisine with a modern twist. We specialize in North Indian dishes, biryanis, and fresh naan bread. Our kitchen maintains the highest hygiene standards.",
      operatingHours: "9:00 AM - 11:00 PM",
      cuisineType: "Indian",
      submittedAt: "2024-01-15T10:30:00Z",
      status: "pending",
    },
    {
      id: "2",
      restaurantName: "Pizza Corner",
      ownerName: "Maria Rodriguez",
      email: "maria@pizzacorner.com",
      phone: "+91 9876543211",
      address: "Block B, Campus Food Court, University Campus",
      description:
        "Wood-fired pizzas made with fresh ingredients. We offer both vegetarian and non-vegetarian options with a variety of toppings and crusts.",
      operatingHours: "11:00 AM - 12:00 AM",
      cuisineType: "Italian",
      submittedAt: "2024-01-14T14:20:00Z",
      status: "pending",
    },
    {
      id: "3",
      restaurantName: "Healthy Bites",
      ownerName: "Dr. Sarah Johnson",
      email: "sarah@healthybites.com",
      phone: "+91 9876543212",
      address: "Block C, Campus Food Court, University Campus",
      description:
        "Nutritious and delicious meals focused on health-conscious students. We offer salads, smoothie bowls, protein-rich meals, and vegan options.",
      operatingHours: "7:00 AM - 10:00 PM",
      cuisineType: "Healthy/Continental",
      submittedAt: "2024-01-13T09:15:00Z",
      status: "pending",
    },
  ])

  const handleApprove = (id: string) => {
    setPendingRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "approved" as const } : req)))
    toast({
      title: "Application Approved! ✅",
      description: "The restaurant has been notified and can now access their dashboard.",
    })
  }

  const handleReject = (id: string) => {
    setPendingRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status: "rejected" as const } : req)))
    toast({
      title: "Application Rejected ❌",
      description: "The restaurant has been notified about the decision.",
      variant: "destructive",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const pendingCount = pendingRequests.filter((req) => req.status === "pending").length
  const approvedCount = pendingRequests.filter((req) => req.status === "approved").length
  const rejectedCount = pendingRequests.filter((req) => req.status === "rejected").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-red-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-lg">Manage campus restaurant applications</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Pending</p>
                    <p className="text-2xl font-bold text-white">{pendingCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Approved</p>
                    <p className="text-2xl font-bold text-white">{approvedCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Rejected</p>
                    <p className="text-2xl font-bold text-white">{rejectedCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total</p>
                    <p className="text-2xl font-bold text-white">{pendingRequests.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Restaurant Applications</h2>

          {pendingRequests.map((request) => (
            <Card key={request.id} className="bg-gray-800/30 border-gray-700/30 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white flex items-center gap-3">
                      <Store className="w-6 h-6 text-orange-400" />
                      {request.restaurantName}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg mt-2">
                      Submitted by {request.ownerName} on {formatDate(request.submittedAt)}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      request.status === "pending"
                        ? "secondary"
                        : request.status === "approved"
                          ? "default"
                          : "destructive"
                    }
                    className={`text-sm px-3 py-1 ${
                      request.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : request.status === "approved"
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{request.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">{request.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-red-400 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm">Address</p>
                        <p className="text-white">{request.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Cuisine Type</p>
                      <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                        {request.cuisineType}
                      </Badge>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm">Operating Hours</p>
                      <p className="text-white">{request.operatingHours}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-purple-400 mt-1" />
                  <div className="flex-1">
                    <p className="text-gray-400 text-sm mb-2">Description</p>
                    <p className="text-white leading-relaxed">{request.description}</p>
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-4 pt-4 border-t border-gray-700/50">
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(request.id)}
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
