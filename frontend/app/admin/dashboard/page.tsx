"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Clock, Store, Mail, Phone, MapPin, FileText, Users, TrendingUp } from "lucide-react"
import { Line, Pie, Bar } from "react-chartjs-2"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement, // <-- add this
  ArcElement, // <-- add this for Pie charts
  ChartOptions,
} from "chart.js"
// @ts-ignore
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ArcElement, ChartDataLabels)

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
  const [summary, setSummary] = useState<any>(null)
  const [usersMonthly, setUsersMonthly] = useState<any[]>([])
  const [ordersMonthly, setOrdersMonthly] = useState<any[]>([])
  const [revenueDaily, setRevenueDaily] = useState<any[]>([])
  const [revenueWeekly, setRevenueWeekly] = useState<any[]>([])
  const [revenueMonthly, setRevenueMonthly] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [orderStatus, setOrderStatus] = useState<any>(null)
  const [userRoles, setUserRoles] = useState<any>(null)
  const [topSpenders, setTopSpenders] = useState<any[]>([])
  const [topCanteens, setTopCanteens] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // Use only the correct endpoints as provided
        const [summaryRes, usersRes, userRolesRes, topSpendersRes, ordersRes, orderStatusRes, topCanteensRes, revenueTotalRes, revenueByCampusCanteenRes, revenueTopCanteensRes, revenueTopCampusesRes, revenuePaymentBreakdownRes, revenueDailyRes, revenueWeeklyRes, revenueMonthlyRes] = await Promise.all([
          fetch("/api/v1/admin/totals"),
          fetch("/api/v1/admin/users/monthly"),
          fetch("/api/v1/admin/users/count-by-role"),
          fetch("/api/v1/admin/users/top-spenders"),
          fetch("/api/v1/admin/orders/monthly"),
          fetch("/api/v1/admin/orders/status-wise"),
          fetch("/api/v1/admin/orders/top-tcanteens"),
          fetch("/api/v1/admin/revenue/total"),
          fetch("/api/v1/admin/revenue/by-campus-canteen"),
          fetch("/api/v1/admin/revenue/top-canteens"),
          fetch("/api/v1/admin/revenue/top-campuses"),
          fetch("/api/v1/admin/revenue/payment-breakdown"),
          fetch("/api/v1/admin/revenue/daily"),
          fetch("/api/v1/admin/revenue/weekly"),
          fetch("/api/v1/admin/revenue/monthly"),
        ])
        if (!summaryRes.ok || !usersRes.ok || !userRolesRes.ok || !topSpendersRes.ok || !ordersRes.ok || !orderStatusRes.ok || !topCanteensRes.ok || !revenueTotalRes.ok || !revenueByCampusCanteenRes.ok || !revenueTopCanteensRes.ok || !revenueTopCampusesRes.ok || !revenuePaymentBreakdownRes.ok || !revenueDailyRes.ok || !revenueWeeklyRes.ok || !revenueMonthlyRes.ok) {
          throw new Error("API error")
        }
        const [summaryData, usersData, userRolesData, topSpendersData, ordersData, orderStatusData, topCanteensData, revenueTotalData, revenueByCampusCanteenData, revenueTopCanteensData, revenueTopCampusesData, revenuePaymentBreakdownData, revenueDailyData, revenueWeeklyData, revenueMonthlyData] = await Promise.all([
          summaryRes.json(),
          usersRes.json(),
          userRolesRes.json(),
          topSpendersRes.json(),
          ordersRes.json(),
          orderStatusRes.json(),
          topCanteensRes.json(),
          revenueTotalRes.json(),
          revenueByCampusCanteenRes.json(),
          revenueTopCanteensRes.json(),
          revenueTopCampusesRes.json(),
          revenuePaymentBreakdownRes.json(),
          revenueDailyRes.json(),
          revenueWeeklyRes.json(),
          revenueMonthlyRes.json(),
        ])
        setSummary(summaryData)
        setUsersMonthly(usersData)
        // Transform userRolesData array to object: [{_id: 'student', count: 5}] => {student: 5}
        const userRolesObj: Record<string, number> = {}
        userRolesData.forEach((item: any) => { userRolesObj[item._id] = item.count })
        setUserRoles(userRolesObj)
        setTopSpenders(topSpendersData)
        setOrdersMonthly(ordersData)
        // Transform orderStatusData array to object: [{_id: 'completed', count: 10}] => {completed: 10}
        const orderStatusObj: Record<string, number> = {}
        orderStatusData.forEach((item: any) => { orderStatusObj[item._id] = item.count })
        setOrderStatus(orderStatusObj)
        setTopCanteens(topCanteensData)
        setRevenueDaily(revenueDailyData)
        setRevenueWeekly(revenueWeeklyData)
        setRevenueMonthly(revenueMonthlyData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Remove handleApprove and handleReject
  // Remove formatDate if not used elsewhere

  // Remove pendingCount, approvedCount, rejectedCount, and pendingRequests.length usages
  // Instead, use summary data for the cards

  // Chart data helpers (fix field names)
  const usersChartData = {
    labels: usersMonthly.map((u) => u._id),
    datasets: [
      {
        label: "New Users",
        data: usersMonthly.map((u) => u.count),
        borderColor: "#f87171",
        backgroundColor: "#f87171",
      },
    ],
  }
  const ordersChartData = {
    labels: ordersMonthly.map((o) => o._id),
    datasets: [
      {
        label: "Orders",
        data: ordersMonthly.map((o) => o.count),
        borderColor: "#60a5fa",
        backgroundColor: "#60a5fa",
      },
    ],
  }
  const revenueChartData = {
    labels: revenueMonthly.map((r) => r._id),
    datasets: [
      {
        label: "Revenue",
        data: revenueMonthly.map((r) => r.revenue || r.total || r.totalAmount),
        borderColor: "#34d399",
        backgroundColor: "#34d399",
      },
    ],
  }

  // New chart data helpers
  const orderStatusChartData = orderStatus
    ? {
        labels: Object.keys(orderStatus),
        datasets: [
          {
            label: "Order Status",
            data: Object.values(orderStatus),
            backgroundColor: ["#fbbf24", "#34d399", "#f87171", "#a78bfa"],
            borderColor: ["#f59e42", "#059669", "#ef4444", "#7c3aed"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] }


  const userRolesChartData = userRoles
    ? {
        labels: Object.keys(userRoles),
        datasets: [
          {
            label: "User Roles",
            data: Object.values(userRoles),
            backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"],
            borderColor: ["#ef4444", "#2563eb", "#059669", "#f59e42", "#7c3aed"],
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] }

  const revenueDailyChartData = {
    labels: revenueDaily.map((r) => r._id || r.date),
    datasets: [
      {
        label: "Daily Revenue",
        data: revenueDaily.map((r) => r.revenue || r.total || r.totalAmount),
        borderColor: "#fbbf24",
        backgroundColor: "#fde68a",
      },
    ],
  }
  const revenueWeeklyChartData = {
    labels: revenueWeekly.map((r) => r._id || r.week),
    datasets: [
      {
        label: "Weekly Revenue",
        data: revenueWeekly.map((r) => r.revenue || r.total || r.totalAmount),
        borderColor: "#60a5fa",
        backgroundColor: "#bae6fd",
      },
    ],
  }
  const revenueMonthlyChartData = {
    labels: revenueMonthly.map((r) => r._id || r.month),
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueMonthly.map((r) => r.revenue || r.total || r.totalAmount),
        borderColor: "#34d399",
        backgroundColor: "#bbf7d0",
      },
    ],
  }
  const topSpendersChartData = {
    labels: topSpenders.map((u) => u.name || u.username || u.email),
    datasets: [
      {
        label: "Amount Spent",
        data: topSpenders.map((u) => u.amount || u.totalSpent),
        backgroundColor: "#a78bfa",
        borderColor: "#7c3aed",
        borderWidth: 1,
      },
    ],
  }
  // Top Canteens by Order Volume chart data with red and white colors and percentage display
  const totalCanteenOrders = topCanteens.reduce((sum: number, c: any) => sum + (c.totalOrders || c.count || c.orderCount || 0), 0);
  const topCanteensChartData = {
    labels: topCanteens.map((c) => c.name || c.canteenName),
    datasets: [
      {
        label: "Order Volume (%)",
        data: topCanteens.map((c) => {
          const value = c.totalOrders || c.count || c.orderCount || 0;
          return totalCanteenOrders > 0 ? (value / totalCanteenOrders) * 100 : 0;
        }),
        backgroundColor: "#ef4444", // red
        borderColor: "#fff", // white border
        borderWidth: 2,
      },
    ],
  }

  const topCanteensChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: '#fff',
        anchor: 'end',
        align: 'center', // changed from 'end' to 'center' for compatibility
        font: { weight: 'bold', size: 14 },
        formatter: (value: number) => value ? value.toFixed(1) + '%' : '',
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.parsed.y.toFixed(1) + '%';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#fff', font: { weight: 'bold' as const } },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#fff',
          callback: function(tickValue: string | number) { return tickValue + '%'; },
        },
        grid: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  }

  return (
    <div className="min-h-screen bg-black p-6">
      {/* Background Elements */}
      {/* No gradients or floating backgrounds for a clean look */}

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#ef4444] rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-lg text-white">Manage campus restaurant applications</p>
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
  );
};

export default AdminDashboard;
