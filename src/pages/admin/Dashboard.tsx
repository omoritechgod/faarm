"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, FileText, TrendingUp, Plus, Eye, AlertCircle } from "lucide-react"

interface DashboardStats {
  totalProducts: number
  totalQuotes: number
  pendingQuotes: number
  recentQuotes: Array<{
    id: number
    customerName: string
    company: string
    status: string
    totalItems: number
    createdAt: string
  }>
}

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalQuotes: 0,
    pendingQuotes: 0,
    recentQuotes: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      navigate("/admin-portal/login")
      return
    }

    fetchDashboardStats()
  }, [navigate])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/dashboard-stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const dashboardCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      href: "/admin-portal/products",
    },
    {
      title: "Quote Requests",
      value: stats.totalQuotes,
      icon: FileText,
      color: "text-green-600",
      bgColor: "bg-green-100",
      href: "/admin-portal/quotes",
    },
    {
      title: "Pending Quotes",
      value: stats.pendingQuotes,
      icon: AlertCircle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      href: "/admin-portal/quotes?status=pending",
    },
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
          </div>
          <Button onClick={() => navigate("/admin-portal/products/new")} className="bg-gradient-primary">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => {
            const IconComponent = card.icon
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary"
                onClick={() => navigate(card.href)}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    <IconComponent className={`h-4 w-4 ${card.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Quote Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Recent Quote Requests</span>
                </span>
                <Button variant="outline" size="sm" onClick={() => navigate("/admin-portal/quotes")}>
                  <Eye className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.recentQuotes.length > 0 ? (
                  stats.recentQuotes.map((quote) => (
                    <div
                      key={quote.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{quote.customerName}</p>
                        <p className="text-sm text-muted-foreground">{quote.company}</p>
                        <p className="text-xs text-muted-foreground">{quote.totalItems} items requested</p>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge variant={quote.status === "pending" ? "destructive" : "default"}>{quote.status}</Badge>
                        <p className="text-xs text-muted-foreground">{quote.createdAt}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No recent quote requests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className="h-20 flex flex-col space-y-2 bg-gradient-primary hover:opacity-90"
                  onClick={() => navigate("/admin-portal/products/new")}
                >
                  <Package className="h-6 w-6" />
                  <span>Add Product</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => navigate("/admin-portal/quotes")}
                >
                  <FileText className="h-6 w-6" />
                  <span>View Quotes</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => navigate("/admin-portal/products")}
                >
                  <Eye className="h-6 w-6" />
                  <span>Manage Products</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex flex-col space-y-2 bg-transparent"
                  onClick={() => navigate("/admin-portal/quotes?status=pending")}
                >
                  <AlertCircle className="h-6 w-6" />
                  <span>Pending Quotes</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
