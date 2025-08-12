"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useQuote } from "@/contexts/QuoteContext"
import { Link } from "react-router-dom"

const QuoteButton = () => {
  const { getTotalItems } = useQuote()
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <Link to="/quote-request">
      <Button className="fixed bottom-6 right-6 z-50 bg-gradient-primary hover:opacity-90 shadow-lg">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Quote Request
        <Badge variant="secondary" className="ml-2 bg-white text-primary">
          {totalItems}
        </Badge>
      </Button>
    </Link>
  )
}

export default QuoteButton
