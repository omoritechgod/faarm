export interface Product {
  id: number
  name: string
  description: string
  price: number
  images: string[]
  category: string
  availability: boolean
  features: string[]
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export interface ProductFilters {
  page?: number
  per_page?: number
  category?: string
  search?: string
  sort_by?: "price" | "rating" | "created_at"
  sort_order?: "asc" | "desc"
}

export interface Service {
  id: number
  title: string
  description: string
  features: string[]
  image?: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  image: string
  bio?: string
}

export interface Testimonial {
  id: number
  name: string
  company: string
  content: string
  rating: number
  image?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface QuoteRequest {
  customer_name: string
  email: string
  phone: string
  company_name?: string
  products: Array<{
    code?: string
    description: string
    quantity: number
    currentPrice?: string
  }>
  additionalRequirements?: string
   urgency: string
}