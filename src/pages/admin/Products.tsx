"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Edit, Trash2, Eye, Star, StarOff, Upload, X, Package, DollarSign, Tag, ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from "sonner"
import { uploadToCloudinary } from "@/utils/cloudinary"

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

const AdminProducts = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    model: "",
    specifications: [] as string[],
    features: [] as string[],
    images: [] as string[],
    availability: true,
    featured: false,
  })

  const categories = [
    "Computing",
    "Networking", 
    "Storage",
    "Software",
    "Sound and Vision",
    "Printing",
    "Communication",
    "Peripherals",
    "Accessories",
  ]

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      navigate("/admin-portal/login")
      return
    }
    fetchProducts()
  }, [navigate])

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      } else {
        toast.error("Failed to fetch products")
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const imageUrl = await uploadToCloudinary(file)
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }))
      toast.success("Image uploaded successfully")
    } catch (error) {
      console.error("Upload failed:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addFeature = (feature: string) => {
    if (feature.trim() && !formData.features.includes(feature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, feature.trim()]
      }))
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const addSpecification = (spec: string) => {
    if (spec.trim() && !formData.specifications.includes(spec.trim())) {
      setFormData(prev => ({
        ...prev,
        specifications: [...prev.specifications, spec.trim()]
      }))
    }
  }

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
          }),
        },
      )

      if (response.ok) {
        toast.success("Product added successfully")
        setShowAddDialog(false)
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          model: "",
          specifications: [],
          features: [],
          images: [],
          availability: true,
          featured: false,
        })
        fetchProducts()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to add product")
      }
    } catch (error) {
      console.error("Failed to add product:", error)
      toast.error("Failed to add product")
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!editingProduct) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/products/${editingProduct.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
          }),
        },
      )

      if (response.ok) {
        toast.success("Product updated successfully")
        setShowEditDialog(false)
        setEditingProduct(null)
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          model: "",
          specifications: [],
          features: [],
          images: [],
          availability: true,
          featured: false,
        })
        fetchProducts()
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to update product")
      }
    } catch (error) {
      console.error("Failed to update product:", error)
      toast.error("Failed to update product")
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      model: product.model,
      specifications: product.specifications,
      features: product.features,
      images: product.images,
      availability: product.availability,
      featured: product.featured,
    })
    setShowEditDialog(true)
  }

  const toggleFeatured = async (productId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/products/${productId}/feature`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        toast.success(`Product ${currentStatus ? 'removed from' : 'added to'} featured`)
        fetchProducts()
      } else {
        toast.error("Failed to update featured status")
      }
    } catch (error) {
      console.error("Failed to toggle featured:", error)
      toast.error("Failed to update featured status")
    }
  }

  const deleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "https://mdoilandgas.com/mcdee/backendfamos/public/api"}/admin/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "application/json",
          },
        },
      )

      if (response.ok) {
        toast.success("Product deleted successfully")
        fetchProducts()
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      console.error("Failed to delete product:", error)
      toast.error("Failed to delete product")
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Products Management</h1>
            <p className="text-muted-foreground">Manage your product catalog and featured items</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="availability"
                        checked={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="availability">Available for purchase</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="featured">Featured product</Label>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Product Images</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              {uploading ? "Uploading..." : "Click to upload images"}
                            </span>
                            <input
                              id="image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files || [])
                                files.forEach(file => handleImageUpload(file))
                              }}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features and Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a feature"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addFeature(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addFeature(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a specification"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSpecification(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addSpecification(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{spec}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(index)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary" disabled={uploading}>
                    Create Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          {/* Edit Product Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="edit-name">Product Name</Label>
                      <Input
                        id="edit-name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-brand">Brand</Label>
                        <Input
                          id="edit-brand"
                          value={formData.brand}
                          onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-model">Model</Label>
                        <Input
                          id="edit-model"
                          value={formData.model}
                          onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-availability"
                        checked={formData.availability}
                        onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="edit-availability">Available for purchase</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="edit-featured"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="rounded"
                      />
                      <Label htmlFor="edit-featured">Featured product</Label>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Product Images</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <div className="text-center">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <label htmlFor="edit-image-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              {uploading ? "Uploading..." : "Click to upload images"}
                            </span>
                            <input
                              id="edit-image-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                const files = Array.from(e.target.files || [])
                                files.forEach(file => handleImageUpload(file))
                              }}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features and Specifications */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a feature"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addFeature(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addFeature(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeFeature(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Specifications */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a specification"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addSpecification(e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addSpecification(input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {formData.specifications.map((spec, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{spec}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeSpecification(index)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => setShowEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary" disabled={uploading}>
                    Update Product
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={product.images[0] || "/placeholder.svg?height=200&width=300"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 flex space-x-1">
                  {product.featured && (
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge variant={product.availability ? "default" : "secondary"}>
                    {product.availability ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">₦{parseFloat(product.price).toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">{product.brand} {product.model}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditDialog(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedProduct(product)
                        setCurrentImageIndex(0)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleFeatured(product.id, product.featured)}
                      className={product.featured ? "text-yellow-600" : ""}
                    >
                      {product.featured ? (
                        <StarOff className="h-4 w-4" />
                      ) : (
                        <Star className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || selectedCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first product"}
              </p>
              {!searchTerm && selectedCategory === "all" && (
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* View Product Dialog */}
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
                        <Label className="text-sm font-medium text-gray-500">Category</Label>
                        <Badge variant="outline" className="mt-1">{selectedProduct.category}</Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Price</Label>
                        <p className="text-2xl font-bold text-primary">₦{parseFloat(selectedProduct.price).toLocaleString()}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Brand</Label>
                        <p className="text-lg">{selectedProduct.brand}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Model</Label>
                        <p className="text-lg">{selectedProduct.model}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-500">Available:</Label>
                        <Badge variant={selectedProduct.availability ? "default" : "secondary"}>
                          {selectedProduct.availability ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Label className="text-sm font-medium text-gray-500">Featured:</Label>
                        {selectedProduct.featured ? (
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Features */}
                    {selectedProduct.features.length > 0 && (
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Features</Label>
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
                        <Label className="text-sm font-medium text-gray-500">Specifications</Label>
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
    </AdminLayout>
  )
}

export default AdminProducts
