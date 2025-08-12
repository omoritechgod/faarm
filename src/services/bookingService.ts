import { apiService } from "./api"
import type { ContactForm, QuoteRequest } from "@/types"

export const bookingService = {
  async submitContactForm(data: ContactForm): Promise<{ success: boolean; message: string }> {
    return apiService.post<{ success: boolean; message: string }>("/api/contact-us", data)
  },

  async submitQuoteRequest(data: QuoteRequest): Promise<{ success: boolean; message: string }> {
    return apiService.post<{ success: boolean; message: string }>("/api/quote-requests", data)
  },

  async requestCallback(data: {
    name: string
    email: string
    phone: string
    preferredTime?: string
    message: string
  }): Promise<{ success: boolean; message: string }> {
    return apiService.post<{ success: boolean; message: string }>("/callback-request", data)
  },
}
