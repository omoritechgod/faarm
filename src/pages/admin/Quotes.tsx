"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Eye, Mail, Phone, Calendar } from "lucide-react"
import { toast } from "sonner"

interface QuoteRequest {
  id: number
  customerName: string
  email: string
  phone: string
  company: string
  products: Array<{
    code: string
    description: string
    quantity: number
    currentPrice: string
  }>
  additionalRequirements: string
  urgency: string
  status: "pending" | "processing" | "quoted" | "completed"
  createdAt: string
  updatedAt: string
}

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/quotes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setQuotes(data.quotes || [])
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuoteStatus = async (quoteId: number, status: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/quotes/${quoteId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ status }),
        },
      )

      if (response.ok) {
        toast.success("Quote status updated successfully")
        fetchQuotes()
      } else {
        toast.error("Failed to update quote status")
      }
    } catch (error) {
      toast.error("Failed to update quote status")
    }
  }

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    const matchesUrgency = urgencyFilter === "all" || quote.urgency === urgencyFilter

    return matchesSearch && matchesStatus && matchesUrgency
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "destructive"
      case "processing":
        return "default"
      case "quoted":
        return "secondary"
      case "completed":
        return "default"
      default:
        return "secondary"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "emergency":
        return "destructive"
      case "urgent":
        return "default"
      case "standard":
        return "secondary"
      default:
        return "secondary"
    }
  }

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
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Quote Requests</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="outline">{filteredQuotes.length} total</Badge>
            <Badge variant="destructive">{quotes.filter((q) => q.status === "pending").length} pending</Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Quotes List */}
        <div className="space-y-4">
          {filteredQuotes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No quote requests found</h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all" || urgencyFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Quote requests will appear here when customers submit them"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{quote.customerName}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {quote.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {quote.phone}
                        </span>
                        {quote.company && <span>Company: {quote.company}</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(quote.status)}>{quote.status}</Badge>
                      <Badge variant={getUrgencyColor(quote.urgency)}>{quote.urgency}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Products */}
                    <div>
                      <h4 className="font-medium mb-2">Requested Products ({quote.products.length})</h4>
                      <div className="space-y-2">
                        {quote.products.map((product, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                {product.code && (
                                  <p className="text-sm font-medium text-gray-600">Code: {product.code}</p>
                                )}
                                <p className="font-medium">{product.description}</p>
                                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                              </div>
                              {product.currentPrice && (
                                <div className="text-sm text-gray-600">Current Price: {product.currentPrice}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Requirements */}
                    {quote.additionalRequirements && (
                      <div>
                        <h4 className="font-medium mb-2">Additional Requirements</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {quote.additionalRequirements}
                        </p>
                      </div>
                    )}

                    {/* Timestamps */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Submitted: {new Date(quote.createdAt).toLocaleDateString()}
                      </span>
                      <span>Updated: {new Date(quote.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>

                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${quote.email}?subject=Quote Request Response`)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                    </div>

                    <Select value={quote.status} onValueChange={(value) => updateQuoteStatus(quote.id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminQuotes
