"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
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
  created_at: string
}

const FeaturedProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToQuote } = useQuote()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/products/featured`
      )

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || data.data || [])
      } else {
        console.error("Failed to fetch featured products")
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error)
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

  const handleViewAllProducts = () => {
    navigate('/products')
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated IT solutions and hardware
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our top-rated IT solutions and hardware
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-500">No featured products available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our top-rated IT solutions and hardware
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.images[0] || "/placeholder.svg?height=250&width=400"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={product.availability ? "default" : "secondary"}>
                    {product.availability ? "Available" : "Out of Stock"}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {product.brand} {product.model}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(parseFloat(product.price))}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    onClick={() => handleAddToQuote(product)}
                    disabled={!product.availability}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.availability ? "Request Quote" : "Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="bg-transparent hover:bg-primary hover:text-white transition-colors"
            onClick={handleViewAllProducts}
          >
            View All Products
          </Button>
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
    </section>
  )
}

export default FeaturedProducts
