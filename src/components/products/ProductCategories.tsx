"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Laptop, Server, Wifi, Printer, HardDrive, Headphones, Camera, Smartphone } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: any
  subcategories: string[]
  count: number
}

interface ProductCategoriesProps {
  onCategorySelect: (category: string) => void
  selectedCategory?: string
}

const ProductCategories = ({ onCategorySelect, selectedCategory }: ProductCategoriesProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const categories: Category[] = [
    {
      id: "computing",
      name: "Computing",
      icon: Laptop,
      count: 245,
      subcategories: [
        "Notebooks",
        "Desktop Workstations",
        "Servers",
        "Embedded Computers",
        "POS Terminals",
        "Tablets",
        "Accessories",
      ],
    },
    {
      id: "communication",
      name: "Communication",
      icon: Smartphone,
      count: 156,
      subcategories: [
        "IP Phones",
        "Conference Equipment",
        "Telecommunication Equipment",
        "Personal Communication",
        "Navigational Equipment",
        "Radio Communication",
      ],
    },
    {
      id: "networking",
      name: "Networking",
      icon: Wifi,
      count: 189,
      subcategories: [
        "Firewalls",
        "Network Connectivity",
        "Routers",
        "Switches",
        "Access Points",
        "Gateways Controllers",
        "PoE Adapters",
        "Bridges and Repeaters",
      ],
    },
    {
      id: "printing",
      name: "Printing",
      icon: Printer,
      count: 98,
      subcategories: [
        "Laserjet Printers",
        "Handheld Printer Accessories",
        "Inkjet Printers",
        "Printing Equipment",
        "3D Printers",
        "Scanners",
        "Photo Printers",
        "Label Printers",
      ],
    },
    {
      id: "software",
      name: "Software",
      icon: Server,
      count: 312,
      subcategories: [
        "Office",
        "Antivirus Security",
        "Backup Recovery",
        "Multimedia Software",
        "Networking Software",
        "Operating Systems",
        "Software Licenses",
        "Video Surveillance",
      ],
    },
    {
      id: "sound-vision",
      name: "Sound and Vision",
      icon: Camera,
      count: 87,
      subcategories: [
        "Interactive Whiteboards",
        "LCD & LED Monitors",
        "Projectors",
        "Cameras",
        "Headsets",
        "Electronics",
        "Game Consoles",
      ],
    },
    {
      id: "storage",
      name: "Storage",
      icon: HardDrive,
      count: 134,
      subcategories: [
        "NAS & Storage Servers",
        "External Hard Drives",
        "Internal Hard Drives",
        "Solid State Drives",
        "Storage Devices",
        "Tape Drives",
      ],
    },
    {
      id: "peripherals",
      name: "Peripherals",
      icon: Headphones,
      count: 203,
      subcategories: [
        "Magnetic Card Readers",
        "Batteries and Accessories",
        "Smart Card Readers",
        "Telephone Splitters",
        "Mobile Device Keyboards",
        "Paper Shredders",
        "Smart Wearables",
      ],
    },
  ]

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
    }
    onCategorySelect(categoryId)
  }

  const handleSubcategoryClick = (subcategory: string) => {
    onCategorySelect(subcategory)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Product Categories</h3>

      {categories.map((category) => {
        const IconComponent = category.icon
        const isExpanded = expandedCategory === category.id
        const isSelected = selectedCategory === category.id

        return (
          <Card key={category.id} className={`transition-all duration-200 ${isSelected ? "ring-2 ring-primary" : ""}`}>
            <CardHeader
              className="pb-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{category.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {category.count} products
                    </Badge>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </div>
            </CardHeader>

            {isExpanded && (
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {category.subcategories.map((subcategory, index) => (
                    <button
                      key={index}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors hover:bg-primary/10 ${
                        selectedCategory === subcategory
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default ProductCategories
