"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Layout from "@/components/layout/Layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, ShoppingCart, Star, SortAsc, SortDesc, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCategories from "@/components/products/ProductCategories"
import { useQuote } from "@/contexts/QuoteContext"
import { toast } from "sonner"
import { formatCurrency } from "@/utils/formatters"

interface Product {
  id: number
  name: string
  description: string
  price: string
  category: string
  brand: string
  model: string
  specifications: string[]
  features: string[]
  images: string[]
  availability: boolean
  featured: boolean
}

const Products = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToQuote } = useQuote()

  useEffect(() => {
    fetchProducts()
  }, [searchTerm, selectedCategory, sortBy, sortOrder, currentPage])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: "12",
        sort_by: sortBy,
        sort_order: sortOrder,
      })

      if (searchTerm) params.append("search", searchTerm)
      if (selectedCategory) params.append("category", selectedCategory)

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/products?${params}`
      )

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || data.data || [])
        setTotalPages(data.last_page || Math.ceil((data.total || data.length) / 12))
      } else {
        console.error("Failed to fetch products")
        toast.error("Failed to fetch products")
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToQuote = (product: Product) => {
    // Add to quote context for the floating button
    addToQuote({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      category: product.category,
      brand: product.brand,
      model: product.model,
      image: product.images[0] || "/placeholder.svg",
      quantity: 1,
    })

    // Navigate to quote request page with product data
    navigate('/quote-request', {
      state: {
        selectedProduct: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          brand: product.brand,
          model: product.model,
          code: `${product.brand}-${product.model}`.toUpperCase()
        }
      }
    })

    toast.success(`Redirecting to quote request for ${product.name}`)
  }

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setShowViewDialog(true)
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    setCurrentPage(1)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1)
  }

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    setCurrentPage(1)
  }

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length)
    }
  }

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length)
    }
  }

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = []
    }
    acc[product.category].push(product)
    return acc
  }, {} as Record<string, Product[]>)

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Explore our comprehensive range of IT solutions and hardware products
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <ProductCategories 
                  onCategorySelect={handleCategoryChange} 
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filters Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>

                  {/* Sort */}
                  <div className="flex gap-2">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full lg:w-40 h-12">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                        <SelectItem value="created_at">Date Added</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12"
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(9)].map((_, i) => (
                    <Card key={i} className="overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-300"></div>
                      <CardContent className="p-4">
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : products.length > 0 ? (
                <>
                  {/* Display products by category if no specific category is selected */}
                  {!selectedCategory ? (
                    <div className="space-y-12">
                      {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                        <div key={category}>
                          <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                            <Badge variant="outline" className="text-sm">
                              {categoryProducts.length} products
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryProducts.slice(0, 6).map((product, index) => (
                              <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                onAddToQuote={handleAddToQuote}
                                onViewProduct={handleViewProduct}
                              />
                            ))}
                          </div>
                          {categoryProducts.length > 6 && (
                            <div className="text-center mt-6">
                              <Button
                                variant="outline"
                                onClick={() => handleCategoryChange(category)}
                              >
                                View All {category} Products ({categoryProducts.length})
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Display filtered products */
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product, index) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                            onAddToQuote={handleAddToQuote}
                            onViewProduct={handleViewProduct}
                          />
                        ))}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-12">
                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </Button>
                          
                          <div className="flex space-x-1">
                            {[...Array(Math.min(5, totalPages))].map((_, i) => {
                              const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i))
                              return (
                                <Button
                                  key={pageNum}
                                  variant={currentPage === pageNum ? "default" : "outline"}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className="w-10"
                                >
                                  {pageNum}
                                </Button>
                              )
                            })}
                          </div>

                          <Button
                            variant="outline"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <div className="text-gray-400 mb-4">
                      <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your search criteria or browse all categories
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategory("")
                        setCurrentPage(1)
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Modal */}
        <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Product Details</DialogTitle>
            </DialogHeader>
            {selectedProduct && (
              <div className="space-y-6">
                {/* Image Gallery */}
                <div className="relative">
                  <img
                    src={selectedProduct.images[currentImageIndex] || "/placeholder.svg?height=400&width=600"}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                  {selectedProduct.images.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={prevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                        onClick={nextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {selectedProduct.images.map((_, index) => (
                          <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Product Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                      <p className="text-gray-600 mt-2">{selectedProduct.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Category</span>
                        <Badge variant="outline" className="mt-1 block w-fit">{selectedProduct.category}</Badge>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Price</span>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(parseFloat(selectedProduct.price))}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Brand</span>
                        <p className="text-lg">{selectedProduct.brand}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Model</span>
                        <p className="text-lg">{selectedProduct.model}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-500">Available:</span>
                        <Badge variant={selectedProduct.availability ? "default" : "secondary"}>
                          {selectedProduct.availability ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {selectedProduct.featured && (
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                      onClick={() => {
                        handleAddToQuote(selectedProduct)
                        setShowViewDialog(false)
                      }}
                      disabled={!selectedProduct.availability}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {selectedProduct.availability ? "Request Quote" : "Unavailable"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {/* Features */}
                    {selectedProduct.features.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Features</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedProduct.features.map((feature, index) => (
                            <Badge key={index} variant="secondary">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Specifications */}
                    {selectedProduct.specifications.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Specifications</span>
                        <div className="space-y-1 mt-2">
                          {selectedProduct.specifications.map((spec, index) => (
                            <p key={index} className="text-sm bg-gray-50 p-2 rounded">{spec}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}

// Product Card Component
interface ProductCardProps {
  product: Product
  index: number
  onAddToQuote: (product: Product) => void
  onViewProduct: (product: Product) => void
}

const ProductCard = ({ product, index, onAddToQuote, onViewProduct }: ProductCardProps) => {
  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0] || "/placeholder.svg?height=200&width=300"}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {product.featured && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Badge variant="outline" className="bg-white/90">
            {product.category}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge variant={product.availability ? "default" : "secondary"}>
            {product.availability ? "Available" : "Out of Stock"}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            onClick={() => onViewProduct(product)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              {formatCurrency(parseFloat(product.price))}
            </span>
            <span className="text-xs text-gray-500">
              {product.brand}
            </span>
          </div>
          <Button
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            onClick={() => onAddToQuote(product)}
            disabled={!product.availability}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.availability ? "Request Quote" : "Unavailable"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Products
