"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { toast } from "sonner"

interface QuoteItem {
  id: number
  name: string
  description: string
  price: number
  quantity: number
  category: string
  brand: string
  specifications: Record<string, string>
}

interface QuoteContextType {
  items: QuoteItem[]
  addToQuote: (product: any) => void
  removeFromQuote: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearQuote: () => void
  getTotalItems: () => number
  getTotalValue: () => number
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export const useQuote = () => {
  const context = useContext(QuoteContext)
  if (!context) {
    throw new Error("useQuote must be used within a QuoteProvider")
  }
  return context
}

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<QuoteItem[]>([])

  // Load from localStorage on mount
  useEffect(() => {
    const savedItems = localStorage.getItem("quoteItems")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("quoteItems", JSON.stringify(items))
  }, [items])

  const addToQuote = (product: any) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        toast.success(`Updated quantity for ${product.name}`)
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        toast.success(`Added ${product.name} to quote`)
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: 1,
            category: product.category,
            brand: product.brand,
            specifications: product.specifications,
          },
        ]
      }
    })
  }

  const removeFromQuote = (productId: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId)
      if (item) {
        toast.success(`Removed ${item.name} from quote`)
      }
      return prevItems.filter((item) => item.id !== productId)
    })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearQuote = () => {
    setItems([])
    toast.success("Quote cleared")
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalValue = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  return (
    <QuoteContext.Provider
      value={{
        items,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        getTotalItems,
        getTotalValue,
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}
