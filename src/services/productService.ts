import { apiService } from "./api"
import type { Product, ProductFilters } from "@/types"

interface ProductsResponse {
  data: Product[]
  total: number
  page: number
  per_page: number
  last_page: number
}

export const productService = {
  async getProducts(filters: ProductFilters = {}): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return apiService.get<ProductsResponse>(endpoint)
  },

  async getProduct(id: number): Promise<Product> {
    return apiService.get<Product>(`/products/${id}`)
  },

  async searchProducts(query: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/products/search?q=${encodeURIComponent(query)}`)
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    return apiService.get<Product[]>(`/products/category/${encodeURIComponent(category)}`)
  },

  async getFeaturedProducts(): Promise<Product[]> {
    return apiService.get<Product[]>("/products/featured")
  },
}
